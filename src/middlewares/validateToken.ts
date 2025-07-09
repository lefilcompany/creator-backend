import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const jwtSecret = process.env.JWT_SECRET;

export function validateToken(req: Request, res: Response, next: NextFunction): void {
    const tokenHeader = req.headers['authorization'];
    const token = tokenHeader && tokenHeader.split(' ')[1];

    if (!token) {
        res.status(401).json({
            statusCode: 401,
            message: "Não autorizado! Token não fornecido.",
        });
        return;
    }

    try {
        jwt.verify(token, jwtSecret!);
        next();
    } catch (error: any) {
        console.log(error);
        res.status(401).json({
            statusCode: 401,
            message: "Não autorizado! Token inválido.",
        });
    }
}
