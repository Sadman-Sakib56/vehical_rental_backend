import { pool } from "../../config/db";

const getAllUsers = async () => {
    const result = await pool.query(
        `SELECT id, name, email, phone, role, created_at FROM users`
    );
    return result.rows;
};

const getSingleUser = async (id: string) => {
    const result = await pool.query(
        `SELECT id, name, email, phone, role, created_at 
         FROM users WHERE id=$1`,
        [id]
    );
    return result.rows[0];
};

const updateUser = async (userId: string, payload: any = {}, isAdmin: boolean) => {

    const { name, phone, role } = payload;

    const result = await pool.query(
        `UPDATE users
         SET
            name = COALESCE($1, name),
            phone = COALESCE($2, phone),
            role = CASE 
                WHEN $3 = true THEN COALESCE($4, role)
                ELSE role
            END
         WHERE id = $5
         RETURNING id, name, email, phone, role`, [name, phone, isAdmin, role, userId,]);

    return result.rows[0];
};


const deleteUser = async (id: string) => {
    await pool.query(`DELETE FROM users WHERE id=$1`, [id]);
};

export const userServices = {
    getAllUsers,
    getSingleUser,
    deleteUser,
    updateUser,
};
