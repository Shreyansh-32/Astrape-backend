"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.prisma = void 0;
const express_1 = __importDefault(require("express"));
const client_1 = require("@prisma/client");
const user_1 = require("./routes/user");
const product_1 = require("./routes/product");
const cart_1 = require("./routes/cart");
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)({
    origin: process.env.FRONTEND_URL,
    credentials: true
}));
app.use(express_1.default.json());
app.use("/user", user_1.userRouter);
app.use("/product", product_1.productRouter);
app.use("/cart", cart_1.cartRouter);
app.listen(8000, () => {
    console.log("Server listening on port 8000");
});
exports.prisma = new client_1.PrismaClient();
