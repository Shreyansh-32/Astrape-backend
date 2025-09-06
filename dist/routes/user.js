"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRouter = void 0;
const express_1 = require("express");
const __1 = require("..");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const lib_1 = require("../lib");
const authMiddleware_1 = require("../middleware/authMiddleware");
exports.userRouter = (0, express_1.Router)();
exports.userRouter.post("/register", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password, firstname, lastname } = req.body;
    try {
        const response = lib_1.signUpSchema.safeParse({ email, password, firstname, lastname });
        if (response.success) {
            const user = yield __1.prisma.user.findFirst({
                where: {
                    email
                }
            });
            if (!user) {
                const hashedPassword = yield bcrypt_1.default.hash(password, 12);
                yield __1.prisma.user.create({
                    data: {
                        email,
                        password: hashedPassword,
                        firstname,
                        lastname
                    }
                });
                res.status(lib_1.Status.success).json({ "message": "Signed up successfully" });
            }
            else {
                res.status(lib_1.Status.unauthorized).json({ "message": "User with given email already exist" });
            }
        }
        else {
            res.status(lib_1.Status.invalid_input_types).json({ "message": "Invalid input type", error: response.error.issues });
        }
    }
    catch (err) {
        res.status(lib_1.Status.internal_server_error).json({ "message": "Internal server error" });
    }
}));
exports.userRouter.post("/signin", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        const response = lib_1.signInSchema.safeParse({ email, password });
        if (response.success) {
            const user = yield __1.prisma.user.findFirst({
                where: {
                    email
                }
            });
            if (!user) {
                res.status(lib_1.Status.not_found).json({ "message": "User with given email doesn't exist" });
            }
            else {
                const comparePassword = yield bcrypt_1.default.compare(password, user.password);
                if (comparePassword) {
                    const jwtSecret = process.env.JWT_SECRET;
                    if (!jwtSecret) {
                        return res.status(lib_1.Status.internal_server_error).json({ "message": "Internal server error" });
                    }
                    const token = jsonwebtoken_1.default.sign({ id: user.id }, jwtSecret, { expiresIn: "30d" });
                    res.status(lib_1.Status.success).json({ "message": "Signed in successfully", token });
                }
                else {
                    res.status(lib_1.Status.unauthorized).json({ "message": "Incorrect credentials" });
                }
            }
        }
        else {
            res.status(lib_1.Status.invalid_input_types).json({ "message": "Invalid input type", error: response.error.issues });
        }
    }
    catch (error) {
        res.status(lib_1.Status.internal_server_error).json({ "message": "Internal server error" });
    }
}));
exports.userRouter.get("/check", authMiddleware_1.authMiddleware, (req, res) => {
    res.status(lib_1.Status.success).json({ "message": "User signed in" });
});
