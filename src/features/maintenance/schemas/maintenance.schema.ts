import {z} from 'zod';

export const createMaintenanceSchema = z.object({
    title:z.string().min(1,"Title is required"),
    priority:z.enum(['Low','Medium','High']),
    status:z.enum(["Open",
    "Assigned",
    "In Progress",
    "Completed",]),
    description:z.string().optional()
})

export type CreateMaintenanceFormData = z.infer<typeof createMaintenanceSchema>;