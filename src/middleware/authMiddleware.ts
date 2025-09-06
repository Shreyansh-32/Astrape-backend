import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { Status } from "../lib";

export function authMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
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
        .status(Status.internal_server_error)
        .json({ message: "Internal server error" });
    }
      const decoded = jwt.verify(token, jwtSecret) as JwtPayload;
      req.userId = decoded.id;
      next();
  } catch (err) {
    console.error("Authentication Error:", err);
    res.status(Status.unauthorized).json({"message" : "Forbidden: Invalid or expired token"});
  }
}
