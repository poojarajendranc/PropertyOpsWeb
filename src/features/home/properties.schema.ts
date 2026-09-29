import { z } from 'zod';

export const createPropertySchema = z.object({
    name: z.string().min(1, "Name is required"),
    location: z.string().min(1, "Location is required"),
    latitude: z.string().min(1, "Location is required"),
    longitude: z.string().min(1, "Location is required"),
    countryCode: z.string().min(1, "Country code is required"),
    contactNumber: z.string().min(1, "Contact number is required"),
})

export type AddPropertyFormData = z.infer<typeof createPropertySchema>