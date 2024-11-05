import { db } from '@/lib/db/db';
import { products } from '@/lib/db/schemas';
import { eq } from 'drizzle-orm';

export async function GET(request: Request) {
    try {
        // Extract the id from the request URL
        const url = new URL(request.url);
        const id = url.pathname.split('/').pop(); // Assuming the ID is the last part of the URL path
        
        if (!id) {
            return new Response('Product ID is missing', { status: 400 });
        }

        const product = await db
            .select()
            .from(products)
            .where(eq(products.id, Number(id)))
            .limit(1)
            .execute();

        if (product.length === 0) {
            return new Response('Product not found', { status: 404 });
        }

        return new Response(JSON.stringify(product[0]), { status: 200 });
    } catch (error) {
        if (error instanceof Error) {
            return new Response(
                JSON.stringify({ message: 'Failed to fetch product.', error: error.message }),
                { status: 500 }
            );
        } else {
            return new Response(
                JSON.stringify({ message: 'Failed to fetch product.', error: String(error) }),
                { status: 500 }
            );
        }
    }
}


/* Another way to extract the ID from the URL path is to use the params object in the function signature. This is a more modern approach and is recommended for new projects. Here's how you can do it:
import { db } from '@/lib/db/db';
import { products } from '@/lib/db/schemas';
import { eq } from 'drizzle-orm';
export async function GET(request: Request, {params }: {params: {id: string}}) {
    const id = params.id;
    try {
        const product = await db.select().from(products).where(eq(products.id, Number(id))).limit(1).execute();
        if (!product.length) {
            return new Response('Product not found', { status: 404 });
        } else {
            return new Response(JSON.stringify(product[0]), { status: 200 });
        }
    } catch (error) {
        return new Response(JSON.stringify({ message: "Failed to fetch product.", details: error }), { status: 500 }); 
        
    }
    
} */