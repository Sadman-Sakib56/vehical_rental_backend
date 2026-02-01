import { Request, Response } from "express";
import { vehicleServices } from "./vehicle.service";

const createVehicle = async (req: Request, res: Response) => {
    const result = await vehicleServices.createVehicle(req.body);

    res.status(201).json({
        success: true,
        message: "Vehicle created successfully",
        data: result,
    });
};
//get all vehicles
const getVehicles = async (req: Request, res: Response) => {
    const result = await vehicleServices.getAllVehicles();

    res.status(200).json({
        success: true,
        message: "Vehicle retrived successfully",
        data: result,
    });
};

//get single vehicle
const getVehicle = async (req: Request, res: Response) => {
    const { vehicleId } = req.params;

    const vehicle = await vehicleServices.getVehicleById(vehicleId as string);

    if (!vehicle) {
        return res.status(404).json({
            success: false,
            message: "Vehicle not found",
        });
    }

    res.status(200).json({
        success: true,
        message: "Vehicle retrieved successfully",
        data: vehicle,
    });
};

//update vehicle

const updateVehicle = async (req: Request, res: Response) => {
    const vehicleId = req.params.vehicleId;
    const { vehicle_name, type, registration_number, daily_rent_price, availability_status } = req.body;

    const updated = await vehicleServices.updateVehicle(
        vehicleId as string,
        vehicle_name,
        type,
        registration_number,
        daily_rent_price,
        availability_status
    );

    res.status(200).json({
        success: true,
        message: "Vehicle updated successfully",
        data: updated,
    });
};

// delete vehicle

const deleteVehicle = async (req: Request, res: Response) => {
    const vehicleId = req.params.vehicleId;

    try {
        const deleted = await vehicleServices.deleteVehicle(vehicleId as string);

        res.status(200).json({
            success: true,
            message: "Vehicle deleted successfully",
            data: deleted,
        });
    } catch (error: any) {
        res.status(400).json({
            success: false,
            message: error.message,
        });
    }
};



export const vehicleController = {
    createVehicle,
    getVehicles,
    getVehicle,
    updateVehicle,
    deleteVehicle
};
