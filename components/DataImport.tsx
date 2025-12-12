'use client';

import { useState } from 'react';
import { Team } from '@/types/basketball';
import { processIndependenceData } from '@/utils/processIndependenceData';

interface DataImportProps {
  onTeamImported: (team: Team) => void;
}

interface GameRecord {
  Opponent?: string;
  Player?: string;
  MINS?: number;
  FGA?: number;
  'FG%'?: number;
  [key: string]: any;
}

export default function DataImport({ onTeamImported }: DataImportProps) {
  const [importMethod, setImportMethod] = useState<'file' | 'manual'>('file');
  const [jsonInput, setJsonInput] = useState('');
  const [error, setError] = useState<string | null>(null);


  const isIndependenceFormat = (data: any): data is GameRecord[] => {
    return Array.isArray(data) && 
           data.length > 0 && 
           data[0].Opponent !== undefined && 
           data[0].Player !== undefined &&
           data[0].MINS !== undefined;
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Check file extension
    if (!file.name.toLowerCase().endsWith('.json')) {
      setError('Please upload a JSON file (.json extension required)');
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const content = e.target?.result as string;
        const parsedData = JSON.parse(content);
        
        // Check if it's Independence format (game-by-game records)
        if (isIndependenceFormat(parsedData)) {
          const team = processIndependenceData(parsedData);
          onTeamImported(team);
          setError(null);
        } else {
          // Try standard Team format
          const teamData = parsedData as Team;
          validateTeamData(teamData);
          onTeamImported(teamData);
          setError(null);
        }
      } catch (err: any) {
        if (err instanceof SyntaxError) {
          setError('Invalid JSON format. The file is not valid JSON. Please check your file.');
        } else {
          setError(`Error processing file: ${err.message || 'Unknown error'}`);
        }
        console.error(err);
      }
    };
    reader.onerror = () => {
      setError('Error reading file. Please try again.');
    };
    reader.readAsText(file);
  };

  const handleJsonSubmit = () => {
    try {
      const parsedData = JSON.parse(jsonInput);
      
      // Check if it's Independence format
      if (isIndependenceFormat(parsedData)) {
        const team = processIndependenceData(parsedData);
        onTeamImported(team);
        setError(null);
        setJsonInput('');
      } else {
        // Try standard Team format
        const teamData = parsedData as Team;
        validateTeamData(teamData);
        onTeamImported(teamData);
        setError(null);
        setJsonInput('');
      }
    } catch (err) {
      setError('Invalid JSON format. Please check your input.');
      console.error(err);
    }
  };

  const validateTeamData = (team: any): team is Team => {
    if (!team.name || !team.players || !Array.isArray(team.players)) {
      throw new Error('Invalid team data structure. Expected: { name: string, players: array, teamStats: object }');
    }
    if (team.players.length === 0) {
      throw new Error('Team data must include at least one player');
    }
    return true;
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-xl font-semibold mb-2">Import Your Independence Team Data</h2>
      <p className="text-gray-600 text-sm mb-4">
        Upload your <code className="bg-gray-100 px-2 py-1 rounded">independence_data.json</code> file to see your team's statistics compared to the Texas average team.
      </p>
      
      <div className="flex space-x-4 mb-4">
        <button
          onClick={() => setImportMethod('file')}
          className={`px-4 py-2 rounded ${
            importMethod === 'file'
              ? 'bg-blue-500 text-white'
              : 'bg-gray-200 text-gray-700'
          }`}
        >
          Upload JSON File
        </button>
        <button
          onClick={() => setImportMethod('manual')}
          className={`px-4 py-2 rounded ${
            importMethod === 'manual'
              ? 'bg-blue-500 text-white'
              : 'bg-gray-200 text-gray-700'
          }`}
        >
          Paste JSON
        </button>
      </div>

      {importMethod === 'file' ? (
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-700">
            Select JSON file (.json only)
          </label>
          <input
            type="file"
            accept=".json,application/json"
            onChange={handleFileUpload}
            className="block w-full text-sm text-gray-700 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
          />
          <p className="mt-2 text-xs text-gray-700">
            Only JSON files are accepted. Your file must be named with a .json extension.
          </p>
        </div>
      ) : (
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-700">
            Paste your team JSON data
          </label>
          <textarea
            value={jsonInput}
            onChange={(e) => setJsonInput(e.target.value)}
            placeholder='{"name": "Your Team", "players": [...], "teamStats": {...}}'
            className="w-full h-32 p-3 border border-gray-300 rounded-md font-mono text-sm"
          />
          <button
            onClick={handleJsonSubmit}
            className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Import Team
          </button>
        </div>
      )}

      {error && (
        <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded text-red-700 text-sm">
          <div className="flex items-start">
            <svg className="w-5 h-5 mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
            </svg>
            <div>
              <p className="font-semibold">Upload Error</p>
              <p>{error}</p>
            </div>
          </div>
        </div>
      )}

      <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded text-sm text-blue-700">
        <p className="font-semibold mb-2">📋 Accepted Formats:</p>
        <div className="space-y-2 text-xs">
          <p><strong>1. Independence Game-by-Game Data (Recommended):</strong></p>
          <pre className="bg-white p-2 rounded overflow-x-auto">
{`[
  {
    "Opponent": "Bryan Adams",
    "Player": "Player Name",
    "MINS": 4.0,
    "FGA": 2.0,
    "FG%": 0.5,
    "2FGA": 2.0,
    "2FG%": 0.5,
    "3FGA": 0.0,
    "3FG%": 0.0,
    "FTA": 0.0,
    "FT%": 0.0,
    "OREB": 0.0,
    "DREB": 0.0,
    "AST": 0.0,
    "TO": 1.0,
    "STL": 0.0,
    "BLK": 0.0
  },
  ...
]`}
          </pre>
          <p className="mt-2"><strong>2. Processed Team Data:</strong></p>
          <pre className="bg-white p-2 rounded overflow-x-auto">
{`{
  "name": "Team Name",
  "location": "City, State",
  "season": "2024-2025",
  "players": [...],
  "teamStats": {...}
}`}
          </pre>
        </div>
      </div>
    </div>
  );
}

