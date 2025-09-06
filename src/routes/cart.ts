import { Router } from "express";
import { authMiddleware } from "../middleware/authMiddleware";
import { Status } from "../lib";
import { prisma } from "..";

export const cartRouter = Router();

cartRouter.get("/" , authMiddleware , async(req , res) => {
    const userId = req.userId;

    try{
        if(!userId){
            res.status(Status.unauthorized).json({"message" : "Unauthorized"});
        }
        const cart = await prisma.cart.findMany({
            where:{
                userId
            },
            include:{
                product: true
            }
        });
        res.status(Status.success).json({cart});
    }
    catch(err){
        console.error(err);
        res.status(Status.internal_server_error).json({"message" : "Internal server error"});
    }
});

cartRouter.post("/" , authMiddleware , async(req , res) => {
    const userId = req.userId;
    const {quantity , productId} = req.body;

    try{
        if(!userId){
            return res.status(Status.unauthorized).json({"message" : "Unauthorized"});
        }
        const cart = await prisma.cart.findFirst({
            where:{
                productId,
                userId
            }
        });
        if(!cart){
            if(quantity <= 0)return res.status(Status.invalid_input_types).json({"message" : "Invalid quantity"});;
            await prisma.cart.create({
                data:{
                    userId,
                    productId,
                    quantity : quantity
                }
            });
            res.status(Status.success).json({"message" : "Item added to cart successfully"});
        }
        else{
            if(quantity + cart.quantity <= 0){
                await prisma.cart.delete({
                    where:{
                        id : cart.id
                    }
                });
                return res.status(Status.success).json({"message" : "Item deleted from cart successfully"});
            }
            await prisma.cart.update({
                where:{
                    id : cart.id
                },
                data:{
                    quantity: {increment:quantity}
                }
            });
            res.status(Status.success).json({"message" : "Cart updated successfully"});
        }
    }
    catch(err){
        console.error(err);
        res.status(Status.internal_server_error).json({"message" : "Internal server error"});
    }
});