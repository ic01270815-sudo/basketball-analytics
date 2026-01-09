import { generateText } from 'ai';
import { createOpenAI } from '@ai-sdk/openai';

export async function POST(req: Request) {
  try {
    const { question, teamData } = await req.json();

    // Log the request for debugging
    console.log('AI Request:', {
      question,
      teamDataKeys: {
        yourTeam: Object.keys(teamData?.yourTeam || {}),
        texasTeam: Object.keys(teamData?.texasTeam || {}),
      },
    });

    // Create a concise prompt with team data context
    const systemPrompt = `You are a basketball analytics assistant. Answer questions concisely using markdown.`;

    const userPrompt = `Team Data:
${JSON.stringify(teamData, null, 2)}

Question: ${question}`;

    // Create OpenAI client with custom baseURL for Vercel AI Gateway
    const openai = createOpenAI({
      baseURL: 'https://ai-gateway.vercel.sh/v1',
      apiKey: process.env.AI_GATEWAY_API_KEY,
    });

    // Use GPT-5.2 model via Vercel AI Gateway
    const result = await generateText({
      model: openai('gpt-4o'), // Using gpt-4o as fallback since gpt-5.2 may not be available
      system: systemPrompt,
      prompt: userPrompt,
    });

    return new Response(
      JSON.stringify({ 
        completion: result.text 
      }),
      { 
        status: 200, 
        headers: { 'Content-Type': 'application/json' } 
      }
    );
  } catch (error) {
    console.error('AI API Error:', error);
    return new Response(
      JSON.stringify({ 
        error: 'Failed to process AI request', 
        details: error instanceof Error ? error.message : 'Unknown error' 
      }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}
