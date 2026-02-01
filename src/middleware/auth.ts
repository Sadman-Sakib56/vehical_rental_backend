import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import config from "../config";

const auth = (...roles: string[]) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            const authHeader = req.headers.authorization;

            if (!authHeader || !authHeader.startsWith("Bearer ")) {
                return res.status(401).json({
                    success: false,
                    message: "You are not authorized",
                });
            }

            const token = authHeader.split(" ")[1];

            const decoded = jwt.verify(
                token as string,
                config.jwtSecret as string
            ) as JwtPayload;

            req.user = decoded;

            if (roles.length > 0 && !roles.includes(decoded.role as string)) {
                return res.status(403).json({
                    success: false,
                    message: "Forbidden access",
                });
            }

            next();
        } catch (error: any) {
            return res.status(401).json({
                success: false,
                message: "Invalid or expired token",
            });
        }
    };
};

export default auth;
