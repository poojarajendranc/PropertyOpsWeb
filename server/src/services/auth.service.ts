import pool from "../db/connection.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import type { RegisterRequest, LoginRequest } from "../schemas/auth.schema.js";

export const registerUser = async (user: RegisterRequest) => {
    const [existingUsers] = await pool.execute(`SELECT id FROM users
        WHERE email = ?`, [user.email])
    if (Array.isArray(existingUsers) && existingUsers.length > 0) {
        throw new Error("Email already registered");
    }

    const hashedPassword = await bcrypt.hash(user.password, 10);
    await pool.execute(`INSERT INTO users (name,email,password,role) VALUES (?,?,?,?)`, [user.name, user.email, hashedPassword, user.role ?? ""])
}

export const loginUser = async (credentials: LoginRequest) => {
    const [rows] = await pool.execute(`SELECT id,name,email,password,role FROM users WHERE email = ?`, [credentials.email])

    if (!Array.isArray(rows) || rows.length === 0) {
        throw new Error("Invalid email or password")
    }
    const user = rows[0] as {
        id: number;
        name: string;
        email: string;
        password: string;
        role: string;
    }
    const isPasswordValid = await bcrypt.compare(credentials.password,
        user.password);
    if (!isPasswordValid) {
        throw new Error("Invalid email or password")
    }

    const jwtSecret = process.env.JWT_SECRET;
    if (!jwtSecret) {
        throw new Error("JWT SECRET is not configured")
    }

    const accessToken = jwt.sign({
        userId: user.id,
        role: user.role
    },
        jwtSecret, {
        expiresIn: '15m'
    })

    const refreshToken = jwt.sign({
        userId: user.id,
        role: user.role
    },
        jwtSecret, {
        expiresIn: '7d'
    })

    return {
        accessToken,
        refreshToken,
        user: {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role
        }
    }

}
