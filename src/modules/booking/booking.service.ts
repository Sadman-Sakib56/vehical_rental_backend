import { pool } from "../../config/db";

const createBooking = async (payload: any, user: any) => {
    const {
        vehicle_id,
        rent_start_date,
        rent_end_date,
    } = payload;

    // check vehicle exists & availability
    const vehicleResult = await pool.query(
        `SELECT * FROM vehicles WHERE id=$1`,
        [vehicle_id]
    );

    if (vehicleResult.rowCount === 0) {
        throw new Error("Vehicle not found");
    }

    const vehicle = vehicleResult.rows[0];

    if (vehicle.availability_status !== "available") {
        throw new Error("Vehicle is not available");
    }

    // check date overlap
    const overlapCheck = await pool.query(
        `SELECT * FROM bookings
         WHERE vehicle_id=$1
         AND status='active'
         AND NOT (
            rent_end_date < $2 OR rent_start_date > $3
         )`,
        [vehicle_id, rent_start_date, rent_end_date]
    );

    if ((overlapCheck.rowCount ?? 0) > 0) {
        throw new Error("Vehicle already booked for this date");
    }

    // calculate total days
    const start = new Date(rent_start_date);
    const end = new Date(rent_end_date);

    const days =
        (end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24);

    if (days <= 0) {
        throw new Error("Invalid rental date");
    }

    const total_price = days * Number(vehicle.daily_rent_price);

    // create booking
    const bookingResult = await pool.query(
        `INSERT INTO bookings
        (customer_id, vehicle_id, rent_start_date, rent_end_date, total_price)
        VALUES ($1, $2, $3, $4, $5)
        RETURNING *`,
        [user.id, vehicle_id, rent_start_date, rent_end_date, total_price]
    );

    // update vehicle status
    await pool.query(
        `UPDATE vehicles SET availability_status='booked' WHERE id=$1`,
        [vehicle_id]
    );

    return bookingResult.rows[0];
};

//return vehicle

const returnBooking = async (bookingId: string) => {

    //  Is there any boooking check

    const bookingResult = await pool.query(
        `SELECT * FROM bookings WHERE id = $1`,
        [bookingId]
    );

    if (bookingResult.rowCount === 0) {
        throw new Error("Booking not found");
    }

    const booking = bookingResult.rows[0];

    if (booking.status !== "active") {
        throw new Error("Only active bookings can be returned");
    }

    // booking status update
    await pool.query(
        `UPDATE bookings SET status = 'returned' WHERE id = $1`,
        [bookingId]
    );

    // vehicle availability reset
    await pool.query(
        `UPDATE vehicles 
         SET availability_status = 'available' 
         WHERE id = $1`,
        [booking.vehicle_id]
    );

    return { message: "Vehicle returned successfully" };
};

const cancelBooking = async (bookingId: string, userId: number) => {
    const bookingResult = await pool.query(
        `SELECT * FROM bookings WHERE id = $1`,
        [bookingId]
    );

    if (bookingResult.rowCount === 0) {
        throw new Error("Booking not found");
    }

    const booking = bookingResult.rows[0];

    if (booking.customer_id !== userId) {
        throw new Error("You can only cancel your own booking");
    }

    const today = new Date();
    const startDate = new Date(booking.rent_start_date);
    if (today >= startDate) {
        throw new Error("Cannot cancel booking after start date");
    }

    await pool.query(
        `UPDATE bookings SET status='cancelled' WHERE id=$1`,
        [bookingId]
    );

    await pool.query(
        `UPDATE vehicles SET availability_status='available' WHERE id=$1`,
        [booking.vehicle_id]
    );

    return { message: "Booking cancelled successfully" };
};


export const bookingServices = {
    createBooking,
    returnBooking,
    cancelBooking
};
