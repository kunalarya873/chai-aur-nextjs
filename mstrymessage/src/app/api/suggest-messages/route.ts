import { OpenAIStream, StreamingTextResponse } from 'ai';
import OpenAI from 'openai';

const anyscale = new OpenAI({
  apiKey: process.env.NEXT_PUBLIC_OPENAI_KEY as string,
  baseURL: 'https://api.endpoints.anyscale.com/v1',
});

export async function POST(req: Request) {
  // Extract the `messages` from the body of the request
  try {
    const prompt = "Create a list of three open-ended and engaging questions formatted as a single string. Each question should be separated by '||'. These questions are for an anonymous social messaging platform, like Qooh.me, and should be suitable for a diverse audience. Avoid personal or sensitive topics, focusing instead on universal themes that encourage friendly interaction. For example, your output should be structured like this: 'What’s a hobby you’ve recently started?||If you could have dinner with any historical figure, who would it be?||What’s a simple thing that makes you happy?'. Ensure the questions are intriguing, foster curiosity, and contribute to a positive and welcoming conversational environment."
    

  // Request the OpenAI-compatible API for the response based on the prompt
  const response = await anyscale.completions.create({
    model: 'gpt-3.5-turbo-instruct',
    max_tokens: 300,
    stream: true,
    prompt,
  });

  // Convert the response into a friendly text-stream
  const stream = OpenAIStream(response);

  // Respond with the stream
  return new StreamingTextResponse(stream);
  } catch (error) {
    if(error instanceof OpenAI.APIError){
        const {name, status, headers, message} = error;
        return new Response(JSON.stringify({name, status, headers, message}), {status: 500});
    }
    else{
        console.error(error);
        throw error
    }   
  }
}
