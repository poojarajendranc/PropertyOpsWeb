import z from 'zod';

export const createPropertySchema = z.object({
    name: z.string().min(1, "Name is required"),
    location: z.string(),
    latitude: z.string().nullable().optional(),
    longitude: z.string().nullable().optional(),
    contact_number: z.string().min(1, "Contact number is required"),
})

export const updatePropertySchema = z.object({
    name: z.string().optional(),
    location: z.string().optional(),
    latitude: z.string().optional(),
    longitude: z.string().optional(),
    contact_number: z.string().optional(),
})
