import express from "express";
import initDB from "./config/db";
import { authRoutes } from "./modules/auth/auth.route";
import vehicleRoutes from "./modules/vehicle/vehicle.route";
import bookingRoutes from "./modules/booking/booking.route";
import userRoutes from "./modules/user/user.route";

const app = express();

// middleware
app.use(express.json());

// routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/vehicles", vehicleRoutes);
app.use("/api/v1/bookings", bookingRoutes);
app.use("/api/v1/users", userRoutes);

// db init
initDB();

app.get("/", (req, res) => {
    res.send("Server is running");
});

export default app;
