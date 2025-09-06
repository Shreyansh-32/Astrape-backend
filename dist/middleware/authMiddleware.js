"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMiddleware = authMiddleware;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const lib_1 = require("../lib");
function authMiddleware(req, res, next) {
    const authHeader = req.headers.authorization;
    console.log(authHeader);
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ message: "Unauthorized: No token provided or invalid format" });
    }
    const token = authHeader.split(" ")[1];
    try {
        const jwtSecret = process.env.JWT_SECRET;
        if (!jwtSecret) {
            return res
                .status(lib_1.Status.internal_server_error)
                .json({ message: "Internal server error" });
        }
        const decoded = jsonwebtoken_1.default.verify(token, jwtSecret);
        req.userId = decoded.id;
        next();
    }
    catch (err) {
        console.error("Authentication Error:", err);
        res.status(lib_1.Status.unauthorized).json({ "message": "Forbidden: Invalid or expired token" });
    }
}
