import bcrypt from "bcryptjs";
import { pool } from "../../config/db";
import config from "../../config";
import jwt from "jsonwebtoken"

const createUser = async (payload: Record<string, unknown>) => {
    const { name, email, password, phone, role } = payload;

    // password hash
    const hashedPass = await bcrypt.hash(password as string, 10);

    // insert into DB
    const result = await pool.query(
        `INSERT INTO users (name, email, password, phone, role)
         VALUES ($1, $2, $3, $4, $5)
         RETURNING id, name, email, phone, role`,
        [name, email, hashedPass, phone, role]
    );

    return result.rows[0];
};

const findUserByEmail = async (email: string) => {
    const result = await pool.query(
        `SELECT * FROM users WHERE email=$1`,
        [email]
    );

    return result.rows[0];
};

const loginUser = async (email: string, password: string) => {
    const user = await findUserByEmail(email);

    if (!user) {
        throw new Error("User not found");
    }

    const isPasswordMatched = await bcrypt.compare(
        password,
        user.password
    );

    if (!isPasswordMatched) {
        throw new Error("Password does not match");
    }

    const token = jwt.sign({ id: user.id, name: user.name, email: user.email, role: user.role }, config.jwtSecret as string, {
        expiresIn: "7d",
    });

    return {
        token,
        user: {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role,
        },
    };
};

export const authServices = {
    createUser,
    findUserByEmail,
    loginUser,
};
