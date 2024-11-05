import { z } from 'zod';

export const inventorySchema = z.object({
    sku: z.string({message: 'SKU should be a string'}).length(8, {message: 'SKU should be 8 characters long'}),
    warehouseId: z.number({message: 'Warehouse ID should be a number'}),
    productId: z.number({message: 'Product ID should be a number'})
});
