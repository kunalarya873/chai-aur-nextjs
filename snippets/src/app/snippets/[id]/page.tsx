import React from 'react'
import { prisma } from '@/lib/prisma';
import { Button } from '@/components/ui/button';
type SnippetDetailsProps = {
    params: Promise<{ id: string }>
}
const SnippetDetailPage: React.FC<SnippetDetailsProps> = async ({params}) => {
    const id = (await params).id;

    const snippet = await prisma.snippet.findUnique({
        where: {
            id: Number(id)
        }
    })

  return (
    <div>
        <div className="flex items-center justify-between">
          <h1 className='font-bold text-3xl'>{snippet?.title}</h1>
          <div className="flex items-center gap-2">
            <Button>Edit</Button>
            <Button variant="destructive">Delete</Button>
          </div>
        </div>
    <pre className='p-3 bg-gray-200 rounded border-gray-200'>
        <code className='language-javascript'>{snippet?.code}</code>
    </pre>

    </div>
  ) 
}

export default SnippetDetailPage;