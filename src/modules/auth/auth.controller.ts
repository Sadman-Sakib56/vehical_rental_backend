import { Request, Response } from "express";
import { authServices } from "./auth.service";


const signup = async (req: Request, res: Response) => {
    try {
        const userData = req.body;

        // email already exists check
        const isExist = await authServices.findUserByEmail(userData.email);

        if (isExist) {
            return res.status(400).json({
                success: false,
                message: "User already exists",
            });
        }

        // create user
        const result = await authServices.createUser(userData);

        res.status(201).json({
            success: true,
            message: "User registered successfully",
            data: result,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Something went wrong",
            errors: error,
        });
    }
};

//signIn user

const signin = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;

        const result = await authServices.loginUser(email, password);

        res.status(200).json({
            success: true,
            message: "User logged in successfully",
            data: result,
        });
    } catch (error: any) {
        res.status(401).json({
            success: false,
            message: error.message,
        });
    }
};

export const authController = {
    signup,
    signin,
};
