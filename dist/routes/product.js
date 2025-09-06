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
exports.productRouter = void 0;
const express_1 = require("express");
const __1 = require("..");
const lib_1 = require("../lib");
exports.productRouter = (0, express_1.Router)();
exports.productRouter.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { search, category, minPrice, maxPrice, sortBy, order } = req.query;
    try {
        const where = {};
        if (search) {
            where.OR = [
                { title: { contains: search, mode: "insensitive" } },
                { description: { contains: search, mode: "insensitive" } },
            ];
        }
        if (category) {
            where.category = { contains: category, mode: "insensitive" };
        }
        if (minPrice || maxPrice) {
            where.price = {
                gte: minPrice ? parseFloat(minPrice) : undefined,
                lte: maxPrice ? parseFloat(maxPrice) : undefined,
            };
        }
        const allowedSortByFields = ["price", "title"];
        const orderBy = {};
        if (sortBy && allowedSortByFields.includes(sortBy)) {
            orderBy[sortBy] = order === "desc" ? "desc" : "asc";
        }
        else {
            orderBy.title = "asc";
        }
        const products = yield __1.prisma.product.findMany({
            where: where,
            orderBy: orderBy,
        });
        res.status(lib_1.Status.success).json({ products });
    }
    catch (error) {
        console.error(error);
        res
            .status(lib_1.Status.internal_server_error)
            .json({ message: "Internal server error" });
    }
}));
exports.productRouter.get("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const idInt = parseInt(id);
    try {
        if (isNaN(idInt)) {
            return res.status(400).json({ message: "Invalid product ID format." });
        }
        const product = yield __1.prisma.product.findUnique({
            where: {
                id: idInt,
            },
        });
        if (!product) {
            return res
                .status(lib_1.Status.not_found)
                .json({ message: "Product not found" });
        }
        res.status(lib_1.Status.success).json({ product });
    }
    catch (error) {
        console.error(error);
        res
            .status(lib_1.Status.internal_server_error)
            .json({ message: "Internal server error" });
    }
}));
