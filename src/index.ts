import express from "express";
import { PrismaClient } from "@prisma/client";
import { userRouter } from "./routes/user";
import { productRouter } from "./routes/product";
import { cartRouter } from "./routes/cart";
import cors from "cors";

const app = express();
app.use(cors())
app.use(express.json());
app.use("/user" , userRouter);
app.use("/product" , productRouter);
app.use("/cart" , cartRouter);

app.listen(8000 , () => {
    console.log("Server listening on port 8000");
});

export const prisma = new PrismaClient();