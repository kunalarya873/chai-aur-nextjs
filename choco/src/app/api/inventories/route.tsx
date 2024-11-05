import { inventorySchema } from "@/lib/validators/inventorySchema";
import { db } from "@/lib/db/db";
import { inventories } from "@/lib/db/schemas";
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