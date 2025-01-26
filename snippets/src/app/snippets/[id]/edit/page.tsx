import React from 'react';
import EditSnippetForm from '@/components/EditSnippetForm';

const EditPage = async ({ params }: { params: Promise<{ id: string }> }) => {
  return (
    <div>
      <h1 className='font-bold text-3xl'>Edit Snippet</h1>
      <EditSnippetForm snippet={params}/>
    </div>
  );
};

export default EditPage;
