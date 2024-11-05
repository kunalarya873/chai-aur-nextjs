import { inventorySchema } from "@/lib/validators/inventorySchema";
import { db } from "@/lib/db/db";
import { inventories, products, warehouses } from "@/lib/db/schemas";
import { desc, eq } from "drizzle-orm";

export async function POST(request: Request) {
    const requestData = await request.json();
    
    let validatedData;

    try {
        validatedData = await inventorySchema.parse(requestData);
    } catch (error) {
        return new Response(JSON.stringify({message: error}), {status: 400});
    }
    try {
        await db.insert(inventories).values(validatedData);
        return new Response(JSON.stringify({message: "Inventory stored successfully"}), {status: 201});
    } catch (error) {
        return new Response(JSON.stringify({message: "Failed to store inventory " + error}), {status: 500});
        
    }
}

export async function GET() {
    try {
        const allinventories = await db.select({
            id: inventories.id,
            sku: inventories.sku,
            warehouse: warehouses.name,
            product: products.name
        })
        .from(inventories)
        .leftJoin(warehouses, eq(inventories.warehouseId, warehouses.id))
        .leftJoin(products, eq(inventories.productId, products.id))
        .orderBy(desc(inventories.id))
        .execute();
        return new Response(JSON.stringify(allinventories), {status: 200});
    } catch (error) {
        return new Response(JSON.stringify({message: `Failed to fetch all inventories: ${error}`}), {status: 500});
    }
}