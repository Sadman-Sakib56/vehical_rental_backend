import { Request, Response } from "express";
import { userServices } from "./user.service";
import { JwtPayload } from "jsonwebtoken";

const getAllUsers = async (req: Request, res: Response) => {
    const result = await userServices.getAllUsers();

    res.status(200).json({
        success: true,
        message: "Users retrieved successfully",
        data: result,
    });
};

const getSingleUser = async (req: Request, res: Response) => {
    const { userId } = req.params;

    const result = await userServices.getSingleUser(userId as string);

    res.status(200).json({
        success: true,
        message: "User retrieved successfully",
        data: result,
    });
};

const updateUser = async (req: Request, res: Response) => {
    const { userId } = req.params;
    const loggedInUser = req.user as JwtPayload;

    if (
        loggedInUser.role === "customer" &&
        loggedInUser.id !== Number(userId)
    ) {
        return res.status(403).json({
            success: false,
            message: "You can only update your own profile",
        });
    }

    const updatedUser = await userServices.updateUser(
        userId as string,
        req.body,
        loggedInUser.role === "admin"
    );

    res.status(200).json({
        success: true,
        message: "User updated successfully",
        data: updatedUser,
    });
};


const deleteUser = async (req: Request, res: Response) => {
    const { userId } = req.params;

    await userServices.deleteUser(userId as string);

    res.status(200).json({
        success: true,
        message: "User deleted successfully",
    });
};

export const userController = {
    getAllUsers,
    getSingleUser,
    updateUser,
    deleteUser,

};
