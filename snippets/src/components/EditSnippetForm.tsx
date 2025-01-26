/* eslint-disable react-hooks/rules-of-hooks */
"use client"
import { Editor } from  '@monaco-editor/react'
import type { Snippet } from '@prisma/client';
import { useState } from 'react';
import { Button } from './ui/button';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const EditSnippetForm = ({snippet}: {snippet: Snippet}) => {
    const [code, setCode] = useState(snippet.code);
  return (
    <div>
        <form className='flex items-center justify-between'>
            <h1 className='font-bold text-3xl'>{snippet.title}</h1>
            <Button type="submit">Update</Button>
        </form>
      <Editor
      height="40vh"
      theme='vs-dark'
      defaultLanguage="javascript"
      defaultValue={code}
      />
    </div>
  )
}

export default EditSnippetForm;