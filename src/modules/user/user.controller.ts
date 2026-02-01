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
    const { id } = req.params;

    const result = await userServices.getSingleUser(id as string);

    res.status(200).json({
        success: true,
        message: "User retrieved successfully",
        data: result,
    });
};

const updateUser = async (req: Request, res: Response) => {
    const { id } = req.params;
    const loggedInUser = req.user as JwtPayload;

    if (
        loggedInUser.role === "customer" &&
        loggedInUser.id !== Number(id)
    ) {
        return res.status(403).json({
            success: false,
            message: "You can only update your own profile",
        });
    }

    const updatedUser = await userServices.updateUser(
        id as string,
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
    const { id } = req.params;

    await userServices.deleteUser(id as string);

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
