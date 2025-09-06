import { PrismaClient } from "@prisma/client/extension";
import express from "express";

const app = express();

app.use(express.json());

app.listen(8000 , () => {
    console.log("Server listening on port 8000");
});

export const prisma = new PrismaClient();