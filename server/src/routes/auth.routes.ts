import { Router } from "express";
import validate from "../middleware/validate.js";
import { loginSchema, refreshTokenSchema, registerSchema } from "../schemas/auth.schema.js";
import { register,login, refresh } from "../controllers/auth.controller.js";

const authRoutes = Router()
authRoutes.post("/login",validate(loginSchema),login)
authRoutes.post("/register", validate(registerSchema), register);
authRoutes.post("/refresh",validate(refreshTokenSchema),refresh)

export default authRoutes;