import { z } from 'zod';
export const deliveryPersonSchema = z.object({
    name: z.string({message: 'Delivery person name should be a string'}).min(3, {message: 'Delivery person name should be at least 3 characters long'}),
    phone: z.string({message: 'Phone number should be a string'}).length(13, {message: 'Phone number should be 13 characters long'}),
    warehouseId: z.number({message: 'Warehouse ID should be a number'}),
    
})