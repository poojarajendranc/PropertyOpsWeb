import { Router } from "express";
import validate from "../middleware/validate.js";
import { loginSchema, registerSchema } from "../schemas/auth.schema.js";
import { register,login } from "../controllers/auth.controller.js";

const authRoutes = Router()
authRoutes.post("/login",validate(loginSchema),login)
authRoutes.post("/register", validate(registerSchema), register);

export default authRoutes;