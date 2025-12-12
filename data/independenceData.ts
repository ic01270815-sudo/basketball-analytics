import { Team } from '@/types/basketball';
import { processIndependenceData } from '@/utils/processIndependenceData';
import independenceDataRaw from './independence_data.json';

// Process the Independence data automatically
// Ensure the data is an array
const dataArray = Array.isArray(independenceDataRaw) ? independenceDataRaw : [];

// Process the Independence data
export const independenceTeam: Team = dataArray.length > 0 
  ? processIndependenceData(dataArray)
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

