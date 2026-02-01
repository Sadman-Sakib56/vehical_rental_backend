import { pool } from "../../config/db";


const createVehicle = async (payload: any) => {
    const {
        vehicle_name,
        type,
        registration_number,
        daily_rent_price,
    } = payload;

    const result = await pool.query(
        `INSERT INTO vehicles
        (vehicle_name, type, registration_number, daily_rent_price)
        VALUES ($1, $2, $3, $4)
        RETURNING *`,
        [vehicle_name, type, registration_number, daily_rent_price]
    );

    return result.rows[0];
};

//getAll vehicle

const getAllVehicles = async () => {
    const result = await pool.query(`SELECT * FROM vehicles`);
    return result.rows;
};
//getSingle vehicle

const getVehicleById = async (id: string) => {
    const result = await pool.query(`SELECT * FROM vehicles WHERE id=$1`, [id]);
    return result.rows[0];
};

//update vehicle

const updateVehicle = async (
    id: string,
    vehicle_name?: string,
    type?: string,
    registration_number?: string,
    daily_rent_price?: number,
    availability_status?: string
) => {
    const result = await pool.query(
        `UPDATE vehicles
     SET
       vehicle_name = COALESCE($1, vehicle_name),
       type = COALESCE($2, type),
       registration_number = COALESCE($3, registration_number),
       daily_rent_price = COALESCE($4, daily_rent_price),
       availability_status = COALESCE($5, availability_status)
     WHERE id = $6
     RETURNING *`,
        [vehicle_name, type, registration_number, daily_rent_price, availability_status, id]
    );

    return result.rows[0];
};

//delete vehicle

const deleteVehicle = async (id: string) => {
    const bookingCheck = await pool.query(
        `SELECT * FROM bookings WHERE vehicle_id = $1 AND status = 'active'`,
        [id]
    );

    if ((bookingCheck.rowCount ?? 0) > 0) {
        throw new Error("Cannot delete vehicle with active bookings");
    }

    const result = await pool.query(
        `DELETE FROM vehicles WHERE id = $1 RETURNING *`,
        [id]
    );

    return result.rows[0];
};



export const vehicleServices = {
    createVehicle,
    getAllVehicles,
    getVehicleById,
    updateVehicle,
    deleteVehicle,
};
