import { productSchema } from "@/lib/validators/productSchema";
import { writeFile } from "node:fs/promises";
import path from "node:path";
import { db } from "@/lib/db/db";
import { products } from "@/lib/db/schemas";

export async function POST(request: Request) {
  const data = await request.formData();
  let validatedData;

  // Validate data with productSchema
  try {
    validatedData = productSchema.parse({
      name: data.get("name"),
      price: Number(data.get("price")),
      description: data.get("description"),
      image: data.get("image"),
    });
  } catch (err) {
    return new Response(JSON.stringify({ message: "Validation error", details: err }), { status: 400 });
  }

  // Define filename and path for image
  const fileName = `${Date.now()}.${validatedData.image.name.split(".").pop()}`;
  const filePath = path.join(process.cwd(), "public/assets", fileName);

  // Save image file
  try {
    const buffer = Buffer.from(await validatedData.image.arrayBuffer());
    await writeFile(filePath, buffer);
  } catch (err) {
    return new Response(JSON.stringify({ message: "File write error", details: err }), { status: 500 });
  }

  // Insert data into database
  try {
    await db.insert(products).values({ ...validatedData, image: fileName }).execute();
    return new Response(JSON.stringify({ message: "success" }), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ message: "Database insertion error", details: error }), { status: 500 });
  }
}