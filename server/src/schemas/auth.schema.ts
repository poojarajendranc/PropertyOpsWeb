import { z } from "zod";

export const registerSchema = z.object({
    name: z.string().min(1, "Name is required"),
    email: z
        .string()
        .email("Invalid email address"),
    password: z
        .string()
        .min(6, "Password must be at least 6 characters"),
    role: z.string().optional()
});

export const loginSchema = z.object({
    email: z.string().email("Invalid email address"),
    password: z.string().min(1, "Password is required"),
})

export const refreshTokenSchema = z.object({
    refreshToken:z.string().min(1,"REfresh token is required")
})

export type RegisterRequest = z.infer<typeof registerSchema>;
export type LoginRequest = z.infer<typeof loginSchema>;
