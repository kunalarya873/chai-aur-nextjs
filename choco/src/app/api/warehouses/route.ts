import { db } from '@/lib/db/db';
import { warehouses } from '@/lib/db/schemas';
import { warehouseSchema } from '@/lib/validators/warehouseSchema';
import { desc } from 'drizzle-orm';
export async function POST(request: Request){
    const requestData = await request.json();

    let validatedData;

    try {
        validatedData = warehouseSchema.parse(requestData);
    } catch (error) {
        return new Response(JSON.stringify({message: error}), {status: 400});
    }
    try {
        await db.insert(warehouses).values({ ...validatedData, pincode: validatedData.pincode.toString() }).execute();
        return new Response(JSON.stringify({message: 'Warehouse stored successfully'}), {status: 201});
    } catch (error) {
        return new Response(JSON.stringify({message: `Failed to store warehouse: ${error}`}), {status: 500});
    }
}

export async function GET(){
    try {
    const allwarehouses = await db.select().from(warehouses).orderBy(desc(warehouses.id)).execute();
    return new Response(JSON.stringify(allwarehouses), {status: 200});
    } catch (error) {
        return new Response(JSON.stringify({message: `Failed to fetch all warehouses: ${error}`}), {status: 500});
    }
}   

