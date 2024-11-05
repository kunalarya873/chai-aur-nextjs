import { z } from 'zod';
export const warehouseSchema = z.object({
    name: z.string({message: 'Warehouse name should be a string'}).min(3, {message: 'Warehouse name should be atleast 3 characters long'}),
    pincode: z.number({message: 'Pincode should be a number'}).refine((val) => val.toString().length === 6, {message: 'Pincode should be 6 characters long'})
})