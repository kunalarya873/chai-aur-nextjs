import { Button } from "@/components/ui/button";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
export default async function Home() {
  const snippets = await prisma.snippet.findMany();
  return (
    <div>
        <h1 className="text-3xl font-bold">Home</h1>
        <div className="flex items-center justify-between">
          <h1>Snippets</h1>
          <Link href="/snippets/new">          <Button>New</Button></Link>
        </div>
      {
        snippets.map((snippet) => (
          <div key={snippet.id} className="flex justify-between bg-gray-200 p-2 rounded-md my-2">
            <h2>{snippet.title}</h2>
            <Link href={`/snippets/${snippet.id}`}>
              <Button>View</Button>
            </Link>
          </div>
        ))
      }
    </div>
  );
}