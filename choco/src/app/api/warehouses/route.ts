import { db } from '@/lib/db/db';
import { warehouses } from '@/lib/db/schemas';
import { warehouseSchema } from '@/lib/validators/warehouseSchema';
export async function POST(request: Request){
    const requestData = await request.json();

    let validatedData;

    try {
        validatedData = warehouseSchema.parse(requestData);
    } catch (error) {
        return new Response(JSON.stringify({message: error}), {status: 400});
    }
    try {
        await db.insert(warehouses).values(validatedData).execute();
        return new Response(JSON.stringify({message: 'Warehouse stored successfully'}), {status: 201});
    } catch (error) {
        return new Response(JSON.stringify({message: `Failed to store warehouse: ${error}`}), {status: 500});
    }
    return new Response(JSON.stringify(validatedData), {status: 200});

}