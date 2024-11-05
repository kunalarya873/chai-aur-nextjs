import { db } from "@/lib/db/db";
import { deliveryPersons, warehouses } from "@/lib/db/schemas";
import { deliveryPersonSchema } from "@/lib/validators/deliveryPersonSchema";
import { desc, eq } from "drizzle-orm";

export async function POST(request: Request) {
    const requestData = await request.json();

    let validatedData;

    try {
        validatedData = deliveryPersonSchema.parse(requestData);
    } catch (error) {
        return new Response(JSON.stringify({message: error}), {status: 400});
    }

    try {
        await db.insert(deliveryPersons).values(validatedData);
        return new Response(JSON.stringify({message: 'Delivery person stored successfully'}), {status: 201});
    } catch (error) {
        return new Response(JSON.stringify({message: `Failed to store delivery person: ${error}`}), {status: 500});
    }
}

export async function GET() {
    try {
        const alldeliveryPersons = await db.select({
            id: deliveryPersons.id,
            name: deliveryPersons.name,
            phone: deliveryPersons.phone,
            warehouse: warehouses.name
        })
        .from(deliveryPersons)
        .leftJoin(warehouses, eq(deliveryPersons.warehouseId, warehouses.id))
        .orderBy(desc(deliveryPersons.id))
        .execute();
        return new Response(JSON.stringify(alldeliveryPersons), {status: 200});
    }
    catch (error) {
        return new Response(JSON.stringify({message: `Failed to fetch delivery persons: ${error}`}), {status: 500});
    }
}