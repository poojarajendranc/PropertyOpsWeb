import z from 'zod';

export const createMaintenanceSchema = z.object({
    title:z.string().min(1,"Title is required"),
    priority:z.enum(["Low","Medium","High"],
    {
      message: "Priority must be Low, Medium or High",
    },),
    status:z.enum(["Open",
    "Assigned",
    "In Progress",
    "Completed",],
    {
      message: "Invalid maintenance status",
    },),
    description:z.string().optional(),
})

export const updateMaintenanceSchema = z.object({
    title:z.string().min(1,"Title cannot be empty").optional(),
    priority:z.enum(["Low","Medium","High"],
    {
      message: "Priority must be Low, Medium or High",
    },).optional(),
    status:z.enum(["Open",
    "Assigned",
    "In Progress",
    "Completed",],
    {
      message: "Invalid maintenance status",
    },).optional(),
    description:z.string().optional(),
})
