import { Router } from "express";
import { prisma } from "..";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { signInSchema, signUpSchema, Status } from "../lib";
import { authMiddleware } from "../middleware/authMiddleware";

export const userRouter = Router();

userRouter.post("/register" , async(req, res) => {
    const {email , password , firstname , lastname} = req.body;

    try{
        const response = signUpSchema.safeParse({email,password,firstname,lastname});
        if(response.success){
            const user = await prisma.user.findFirst({
                where:{
                    email
                }
            });
            if(!user){
                const hashedPassword = await bcrypt.hash(password , 12);
                await prisma.user.create({
                    data:{
                        email,
                        password : hashedPassword,
                        firstname,
                        lastname
                    }
                });
                res.status(Status.success).json({"message" : "Signed up successfully"});
            }
            else{
                res.status(Status.unauthorized).json({"message" : "User with given email already exist"});
            }
        }
        else{
            res.status(Status.invalid_input_types).json({"message" : "Invalid input type" , error:response.error.issues});
        }
    }
    catch(err){
        res.status(Status.internal_server_error).json({"message" : "Internal server error"});
    }
});

userRouter.post("/signin" , async(req , res) => {
    const {email , password} = req.body;

    try {
        const response = signInSchema.safeParse({email , password});
        if(response.success){
            const user = await prisma.user.findFirst({
                where:{
                    email
                }
            });

            if(!user){
                res.status(Status.not_found).json({"message" : "User with given email doesn't exist"});
            }
            else{
                const comparePassword = await bcrypt.compare(password , user.password);
                if(comparePassword){
                    const jwtSecret = process.env.JWT_SECRET;
                    if(!jwtSecret){
                        return res.status(Status.internal_server_error).json({"message" : "Internal server error"});
                    }
                    const token = jwt.sign({id : user.id} , jwtSecret , {expiresIn:"30d"});
                    res.status(Status.success).json({"message" : "Signed in successfully" , token});
                }
                else{
                    res.status(Status.unauthorized).json({"message" : "Incorrect credentials"});
                }
            }
        }
        else{
            res.status(Status.invalid_input_types).json({"message" : "Invalid input type" , error:response.error.issues});
        }
    } catch (error) {
        res.status(Status.internal_server_error).json({"message" : "Internal server error"});
    }
})

userRouter.get("/check" , authMiddleware , (req , res) =>{
    res.status(Status.success).json({"message" : "User signed in"});
})