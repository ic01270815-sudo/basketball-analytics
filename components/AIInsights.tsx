'use client';

import { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { Team } from '@/types/basketball';

interface AIInsightsProps {
  yourTeam: Team;
  texasTeam: Team;
}

export default function AIInsights({ yourTeam, texasTeam }: AIInsightsProps) {
  const [question, setQuestion] = useState('');
  const [completion, setCompletion] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [showDebug, setShowDebug] = useState(false);
  const [prompts, setPrompts] = useState<Array<{ timestamp: string; systemPrompt: string; userPrompt: string }>>([]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!question.trim() || isLoading) return;

    setIsLoading(true);
    setError(null);
    setCompletion('');

    const teamDataPayload = {
      question,
      teamData: {
        yourTeam: {
          name: yourTeam.name,
          stats: yourTeam.teamStats,
          players: yourTeam.players.map(p => ({
            name: p.name,
            position: p.position,
            stats: p.stats,
          })),
        },
        texasTeam: {
          name: texasTeam.name,
          stats: texasTeam.teamStats,
        },
      },
    };

    // Construct the prompts that will be sent to AI
    const systemPrompt = `You are a basketball analytics assistant. Answer questions concisely using markdown.`;

    const userPrompt = `Team Data:
${JSON.stringify(teamDataPayload.teamData, null, 2)}

Question: ${question}`;

    // Store the prompts for the debug log
    const timestamp = new Date().toISOString();
    setPrompts(prev => [...prev, {
      timestamp,
      systemPrompt,
      userPrompt,
    }]);

    try {
      const response = await fetch('/api/ai', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(teamDataPayload),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setCompletion(data.completion || '');
    } catch (err) {
      const errorObj = err instanceof Error ? err : new Error('Unknown error');
      setError(errorObj);
    } finally {
      setIsLoading(false);
    }
  };

  const clearPrompts = () => {
    setPrompts([]);
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-2xl font-bold mb-4 text-gray-900">AI Insights</h2>
      <p className="text-gray-600 mb-6">
        Ask questions about your team's performance, player statistics, and get AI-powered insights.
      </p>

      {/* Question Input */}
      <form onSubmit={handleSubmit} className="mb-6">
        <div className="flex gap-4">
          <textarea
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="Enter your analysis question (e.g., 'What are our team's strengths and weaknesses?', 'Which players should get more playing time?')"
            className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none placeholder:text-gray-500 text-gray-900"
            rows={3}
            disabled={isLoading}
          />
          <button
            type="submit"
            disabled={!question.trim() || isLoading}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed font-medium"
          >
            {isLoading ? 'Analyzing...' : 'Ask AI'}
          </button>
        </div>
      </form>

      {/* Error Display */}
      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
          <h3 className="text-red-800 font-semibold mb-2">Error</h3>
          <p className="text-red-700 text-sm">{error.message}</p>
        </div>
      )}

      {/* AI Response */}
      {completion && (
        <div className="mb-6 p-6 bg-gray-50 rounded-lg border border-gray-200">
          <h3 className="text-lg font-semibold mb-4 text-gray-900">AI Analysis</h3>
          <div className="markdown-content text-gray-800 space-y-3">
            <ReactMarkdown
              components={{
                h1: ({node, ...props}) => <h1 className="text-2xl font-bold mt-4 mb-2" {...props} />,
                h2: ({node, ...props}) => <h2 className="text-xl font-bold mt-3 mb-2" {...props} />,
                h3: ({node, ...props}) => <h3 className="text-lg font-semibold mt-3 mb-2" {...props} />,
                p: ({node, ...props}) => <p className="mb-2 leading-relaxed" {...props} />,
                ul: ({node, ...props}) => <ul className="list-disc list-inside mb-2 space-y-1 ml-4" {...props} />,
                ol: ({node, ...props}) => <ol className="list-decimal list-inside mb-2 space-y-1 ml-4" {...props} />,
                li: ({node, ...props}) => <li className="mb-1" {...props} />,
                strong: ({node, ...props}) => <strong className="font-semibold" {...props} />,
                em: ({node, ...props}) => <em className="italic" {...props} />,
                code: ({node, ...props}) => <code className="bg-gray-200 px-1.5 py-0.5 rounded text-sm font-mono" {...props} />,
                pre: ({node, ...props}) => <pre className="bg-gray-800 text-gray-100 p-3 rounded overflow-x-auto mb-2" {...props} />,
                blockquote: ({node, ...props}) => <blockquote className="border-l-4 border-blue-500 pl-4 italic my-2" {...props} />,
              }}
            >
              {completion}
            </ReactMarkdown>
          </div>
        </div>
      )}

      {/* Debugging & Logging Accordion */}
      <div className="border border-gray-200 rounded-lg">
        <button
          onClick={() => setShowDebug(!showDebug)}
          className="w-full px-4 py-3 flex items-center justify-between bg-gray-50 hover:bg-gray-100 transition-colors"
        >
          <span className="font-semibold text-gray-900">Debugging & Logging</span>
          <span className="text-gray-500">
            {showDebug ? '▼' : '▶'} {prompts.length > 0 && `(${prompts.length} prompt${prompts.length > 1 ? 's' : ''})`}
          </span>
        </button>
        
        {showDebug && (
          <div className="p-4 bg-white border-t border-gray-200">
            <div className="flex justify-between items-center mb-3">
              <h4 className="font-semibold text-gray-900">Raw Prompts (Current Session)</h4>
              {prompts.length > 0 && (
                <button
                  onClick={clearPrompts}
                  className="text-sm text-red-600 hover:text-red-800"
                >
                  Clear Prompts
                </button>
              )}
            </div>
            
            {prompts.length === 0 ? (
              <p className="text-gray-500 text-sm">No prompts yet. Submit a question to see the raw prompts sent to AI.</p>
            ) : (
              <div className="space-y-4 max-h-96 overflow-y-auto">
                {prompts.map((prompt, index) => (
                  <div key={index} className="border border-gray-200 rounded p-3 bg-gray-50">
                    <div className="flex items-center justify-between mb-2">
                      <span className="px-2 py-1 rounded text-xs font-semibold bg-blue-100 text-blue-800">
                        PROMPT {index + 1}
                      </span>
                      <span className="text-xs text-gray-500">{new Date(prompt.timestamp).toLocaleTimeString()}</span>
                    </div>
                    <div className="space-y-3">
                      <div>
                        <h5 className="text-xs font-semibold text-gray-700 mb-1">System Prompt:</h5>
                        <pre className="text-xs bg-white p-2 rounded border border-gray-200 overflow-x-auto text-gray-800 whitespace-pre-wrap">
                          {prompt.systemPrompt}
                        </pre>
                      </div>
                      <div>
                        <h5 className="text-xs font-semibold text-gray-700 mb-1">User Prompt:</h5>
                        <pre className="text-xs bg-white p-2 rounded border border-gray-200 overflow-x-auto text-gray-800 whitespace-pre-wrap">
                          {prompt.userPrompt}
                        </pre>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
