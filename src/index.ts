import express from "express";
import { PrismaClient } from "@prisma/client";
import { userRouter } from "./routes/user";

const app = express();
app.use(express.json());
app.use("/user" , userRouter);

app.listen(8000 , () => {
    console.log("Server listening on port 8000");
});

export const prisma = new PrismaClient();