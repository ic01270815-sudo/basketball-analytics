import { Team } from '@/types/basketball';
import { processIndependenceData } from '@/utils/processIndependenceData';

// Try to import the Independence data
// If the file doesn't exist, create an empty team as fallback
let independenceDataRaw: any[] = [];

try {
  // Dynamic import to handle missing file gracefully
  const data = require('./independence_data.json');
  independenceDataRaw = Array.isArray(data) ? data : [];
} catch (error) {
  console.warn('independence_data.json not found. Please copy your file to my-next-app/data/independence_data.json');
  independenceDataRaw = [];
}

// Process the Independence data automatically
// If no data, return a placeholder team
export const independenceTeam: Team = independenceDataRaw.length > 0 
  ? processIndependenceData(independenceDataRaw)
  : {
      id: 'independence',
      name: 'Independence Varsity Girls Basketball',
      location: 'Frisco, Texas',
      season: '2024-2025',
      players: [],
      teamStats: {
        wins: 0,
        losses: 0,
        pointsPerGame: 0,
        pointsAllowedPerGame: 0,
        reboundsPerGame: 0,
        assistsPerGame: 0,
        stealsPerGame: 0,
        blocksPerGame: 0,
        fieldGoalPercentage: 0,
        threePointPercentage: 0,
        freeThrowPercentage: 0,
        turnoversPerGame: 0,
        fieldGoalAttemptsPerGame: 0,
        twoPointAttemptsPerGame: 0,
        twoPointPercentage: 0,
        threePointAttemptsPerGame: 0,
        freeThrowAttemptsPerGame: 0,
        offensiveReboundsPerGame: 0,
        defensiveReboundsPerGame: 0,
      },
    };

