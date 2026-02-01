import express from "express";
import { bookingController } from "./booking.controller";
import auth from "../../middleware/auth";

const router = express.Router();


router.post("/", auth("customer"), bookingController.createBooking);
router.put("/:bookingId", auth("admin"), bookingController.returnBooking);
router.put("/:bookingId/cancel", auth("customer", "admin"), bookingController.cancelBooking);


export default router;
