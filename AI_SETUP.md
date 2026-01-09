# AI Insights Setup

This app includes AI-powered insights using Vercel AI SDK with OpenAI GPT-5.2 model.

## Environment Variables

To use the AI Insights feature, you need to set up the following environment variable:

### For Direct OpenAI API:
Create a `.env.local` file in the root directory with:
```
OPENAI_API_KEY=your_openai_api_key_here
```

### For Vercel AI Gateway:
If you're using Vercel AI Gateway, set:
```
VERCEL_AI_GATEWAY_URL=your_gateway_url_here
OPENAI_API_KEY=your_api_key_here
```

The API route will automatically use `openai/gpt-5.2-chat` model when `VERCEL_AI_GATEWAY_URL` is set, otherwise it falls back to `gpt-4o` for direct OpenAI API.

## Features

- **Text Input**: Enter analysis questions about your team's performance
- **Non-Streaming Responses**: AI responses are returned as complete text
- **Markdown Rendering**: Responses are rendered as formatted markdown
- **Debugging Panel**: Expandable accordion showing:
  - Request payloads
  - Response headers
  - Completion status
  - Error logs

## Usage

1. Navigate to the "AI Insights" tab
2. Enter your question in the text box
3. Click "Ask AI" to get insights
4. Expand the "Debugging & Logging" accordion to see request/response details
