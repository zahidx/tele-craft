// app/api/generateStory/route.js

import { OpenAI } from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, // Ensure this is correct
});

export async function POST(request) {
  try {
    const { prompt } = await request.json(); // Ensure that you are passing a prompt
    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo', // Ensure you're using a valid model
      messages: [{ role: 'user', content: prompt }],
      temperature: 0.7,
    });

    return new Response(
      JSON.stringify({ story: response.choices[0].message.content }),
      { status: 200 }
    );
  } catch (error) {
    console.error('Error generating story:', error);
    return new Response(
      JSON.stringify({ error: 'Error generating story.' }),
      { status: 500 }
    );
  }
}
