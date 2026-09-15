import mysql from "mysql2/promise";

const { DB_HOST,
    DB_PORT,
    DB_USER,
    DB_PASSWORD,
    DB_NAME,
} = process.env;

if (!DB_HOST || !DB_PORT || !DB_USER || !DB_NAME) {
    throw new Error("Database environment variables are missing");
}

const pool = mysql.createPool({
    host: DB_HOST,
    port: Number(DB_PORT),
    user: DB_USER,
    password: DB_PASSWORD ?? "",
    database: DB_NAME,
});

export default pool
