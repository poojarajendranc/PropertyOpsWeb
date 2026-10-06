import "dotenv/config";
import cors from "cors";
import express from "express";
import pool from './db/connection.js';
import maintenanceRoutes from './routes/maintenance.routes.js';
import responseHandler from './utils/responseHandler.js'
import authRoutes from "./routes/auth.routes.js";
import propertyRoutes from "./routes/property.routes.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/auth",authRoutes)
app.use("/api/maintenance",maintenanceRoutes)
app.use("/api/property",propertyRoutes)

app.get("/api/health",(_req,res) => {
   responseHandler.successResponse(res,200,"PropertyOps API is running")
})

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(` Server is running on http://localhost:${PORT}
 `)
})

pool.query("SELECT NOW()")
    .then(() => {
        console.log("Database connected successfully");
    })
    .catch((error) => {
        console.error("Database connection failed:", error);
    });