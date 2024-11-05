import { db } from "@/lib/db/db";
import { deliveryPersons } from "@/lib/db/schemas";
import { deliveryPersonSchema } from "@/lib/validators/deliveryPersonSchema";

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