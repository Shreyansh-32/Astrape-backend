import { Router } from "express";
import { prisma } from "..";
import { Status } from "../lib";
import { Prisma } from "@prisma/client";

export const productRouter = Router();
type ProductSortKey = "price" | "title";

productRouter.get("/", async (req, res) => {
  const { search, category, minPrice, maxPrice, sortBy, order } = req.query;
  try {
    const where: Prisma.ProductWhereInput = {};
    if (search) {
      where.OR = [
        { title: { contains: search as string, mode: "insensitive" } },
        { description: { contains: search as string, mode: "insensitive" } },
      ];
    }

    if (category) {
      where.category = { contains: category as string, mode: "insensitive" };
    }

    if (minPrice || maxPrice) {
      where.price = {
        gte: minPrice ? parseFloat(minPrice as string) : undefined,
        lte: maxPrice ? parseFloat(maxPrice as string) : undefined,
      };
    }

    const allowedSortByFields = ["price", "title"];

    const orderBy: Prisma.ProductOrderByWithRelationInput = {};
    if (sortBy && allowedSortByFields.includes(sortBy as string)) {
      orderBy[sortBy as ProductSortKey] = order === "desc" ? "desc" : "asc";
    } else {
      orderBy.title = "asc";
    }

    const products = await prisma.product.findMany({
      where: where,
      orderBy: orderBy,
    });
    res.status(Status.success).json({ products });
  } catch (error) {
    console.error(error);
    res
      .status(Status.internal_server_error)
      .json({ message: "Internal server error" });
  }
});

productRouter.get("/:id", async (req, res) => {
  const id = req.params.id;
  const idInt = parseInt(id);
  try {
    if (isNaN(idInt)) {
      return res.status(400).json({ message: "Invalid product ID format." });
    }
    const product = await prisma.product.findUnique({
      where: {
        id: idInt,
      },
    });
    if (!product) {
      return res
        .status(Status.not_found)
        .json({ message: "Product not found" });
    }
    res.status(Status.success).json({ product });
  } catch (error) {
    console.error(error);
    res
      .status(Status.internal_server_error)
      .json({ message: "Internal server error" });
  }
});
