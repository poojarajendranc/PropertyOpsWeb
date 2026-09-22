import { z } from 'zod';

export const RegisterUserSchema = z.object({
    name: z.string().min(1, "Username is mandatory"),
    password: z.string().min(8, "Password should be of minimum 8 character"),
    role: z.enum(["Super Admin", "Admin", "Staff"]),
    email: z.string().min(1, "Email id is required")
})

export type RegisterUserFormData = z.infer<typeof RegisterUserSchema>;
