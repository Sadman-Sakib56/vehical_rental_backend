import { Request, Response } from "express";
import { bookingServices } from "./booking.service";

const createBooking = async (req: Request, res: Response) => {
    const result = await bookingServices.createBooking(
        req.body,
        req.user
    );

    res.status(201).json({
        success: true,
        message: "Vehicle booked successfully",
        data: result,
    });
};

const returnBooking = async (req: Request, res: Response) => {
    const { bookingId } = req.params;

    const result = await bookingServices.returnBooking(bookingId as string);

    res.status(200).json({
        success: true,
        message: result.message,
    });
};

const cancelBooking = async (req: Request, res: Response) => {
    const { bookingId } = req.params;
    const user = req.user!;
    const result = await bookingServices.cancelBooking(bookingId as string, user.id);

    res.status(200).json({
        success: true,
        message: result.message
    });
};

export const bookingController = {
    createBooking,
    returnBooking,
    cancelBooking
};
