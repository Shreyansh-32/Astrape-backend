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
Object.defineProperty(exports, "__esModule", { value: true });
exports.cartRouter = void 0;
const express_1 = require("express");
const authMiddleware_1 = require("../middleware/authMiddleware");
const lib_1 = require("../lib");
const __1 = require("..");
exports.cartRouter = (0, express_1.Router)();
exports.cartRouter.get("/", authMiddleware_1.authMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.userId;
    try {
        if (!userId) {
            res.status(lib_1.Status.unauthorized).json({ "message": "Unauthorized" });
        }
        const cart = yield __1.prisma.cart.findMany({
            where: {
                userId
            },
            include: {
                product: true
            }
        });
        res.status(lib_1.Status.success).json({ cart });
    }
    catch (err) {
        console.error(err);
        res.status(lib_1.Status.internal_server_error).json({ "message": "Internal server error" });
    }
}));
exports.cartRouter.post("/", authMiddleware_1.authMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.userId;
    const { quantity, productId } = req.body;
    try {
        if (!userId) {
            return res.status(lib_1.Status.unauthorized).json({ "message": "Unauthorized" });
        }
        const cart = yield __1.prisma.cart.findFirst({
            where: {
                productId,
                userId
            }
        });
        if (!cart) {
            if (quantity <= 0)
                return res.status(lib_1.Status.invalid_input_types).json({ "message": "Invalid quantity" });
            ;
            yield __1.prisma.cart.create({
                data: {
                    userId,
                    productId,
                    quantity: quantity
                }
            });
            res.status(lib_1.Status.success).json({ "message": "Item added to cart successfully" });
        }
        else {
            if (quantity + cart.quantity <= 0) {
                yield __1.prisma.cart.delete({
                    where: {
                        id: cart.id
                    }
                });
                return res.status(lib_1.Status.success).json({ "message": "Item deleted from cart successfully" });
            }
            yield __1.prisma.cart.update({
                where: {
                    id: cart.id
                },
                data: {
                    quantity: { increment: quantity }
                }
            });
            res.status(lib_1.Status.success).json({ "message": "Cart updated successfully" });
        }
    }
    catch (err) {
        console.error(err);
        res.status(lib_1.Status.internal_server_error).json({ "message": "Internal server error" });
    }
}));
