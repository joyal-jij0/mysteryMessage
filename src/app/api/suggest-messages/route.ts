import { google } from '@ai-sdk/google';
import { generateText } from 'ai';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const timestamp = new Date().toISOString();
    const prompt = `Create a list of three unique, open-ended and engaging questions as of ${timestamp}. Format as a single string with '||' separators...`; // Rest of your prompt

    const model = google('models/gemini-1.5-pro-latest', {
      topK: 400,
    });

    const { text } = await generateText({
      model: model,
      prompt: prompt
    });
    
    console.log("Generated new messages:", text);
    
    return NextResponse.json(
      {
        success: true,
        message: text
      },
      { status: 200 }
    );

  } catch (error) {
    console.error('An unexpected error occurred:', error);
    return NextResponse.json({ error: 'An unexpected error occurred' }, { status: 500 });
  }
}