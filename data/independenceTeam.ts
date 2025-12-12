import { Team } from '@/types/basketball';
import { processIndependenceData } from '@/utils/processIndependenceData';

// Raw game-by-game data for Independence High School
const rawIndependenceData = [
  {
    "Opponent": "Bryan Adams",
    "Player": "Player 1",
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
    "REB": "=SUM(L2+M2)",
    "AST": 0.0,
    "TO": 1.0,
    "STL": 0.0,
    "BLK": 0.0
  },
  // Note: Full data would be imported from JSON file
  // For now, we'll process it dynamically
];

// Export processed team data
// This will be loaded dynamically from the JSON file
export function loadIndependenceTeam(rawData: any[]): Team {
  return processIndependenceData(rawData);
}

