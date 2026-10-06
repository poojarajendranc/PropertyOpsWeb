import { z } from 'zod';

export const createPropertySchema = z.object({
    name: z.string().min(1, "Name is required"),
    location: z.string(),
    latitude: z.string().nullable().optional(),
    longitude: z.string().nullable().optional() ,
    contact_number: z.string().min(1, "Contact number is required"),
}).refine((data) => {
    const hasLocation = data.location.trim().length > 0;
    return hasLocation;
},
    {
        message: "Enter a location or select a location from the map",
        path: ["location"]
    })

export type AddPropertyFormData = z.infer<typeof createPropertySchema>