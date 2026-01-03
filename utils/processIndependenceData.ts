import { Team, Player } from '@/types/basketball';

export interface GameRecord {
  Location?: string; // "Home" or "Away"
  Opponent: string;
  Player: string;
  MINS: number;
  FGA: number;
  'FG%': number;
  '2FGA'?: number | null;
  '2FG%'?: number | null;
  '3FGA'?: number | null;
  '3FG%'?: number | null;
  FTA?: number | null;
  'FT%'?: number | null;
  OREB?: number | null;
  DREB?: number | null;
  REB?: string | number | null;
  AST?: number | null;
  TO?: number | null;
  STL?: number | null;
  BLK?: number | null;
}

export function processIndependenceData(rawData: GameRecord[]): Team {
  // Helper to normalize percentage (handle both 0-1 and 0-100 formats)
  const normalizePercent = (val: number | null | undefined): number => {
    if (val === null || val === undefined) return 0;
    return val > 1 ? val / 100 : val; // If > 1, assume it's 0-100 format
  };

  // Group data by player
  const playerMap = new Map<string, GameRecord[]>();
  
  rawData.forEach(record => {
    const playerName = record.Player;
    if (!playerMap.has(playerName)) {
      playerMap.set(playerName, []);
    }
    playerMap.get(playerName)!.push(record);
  });

  // Convert to Player objects
  const players: Player[] = [];
  let playerNumber = 1;

  playerMap.forEach((games, playerName) => {
    // Filter out games with 0 minutes (didn't play)
    const playedGames = games.filter(g => g.MINS > 0);
    
    if (playedGames.length === 0) return;

    // Calculate totals
    const totalMins = playedGames.reduce((sum, g) => sum + g.MINS, 0);
    const totalFGA = playedGames.reduce((sum, g) => sum + g.FGA, 0);
    const total2FGA = playedGames.reduce((sum, g) => sum + (g['2FGA'] ?? 0), 0);
    const total3FGA = playedGames.reduce((sum, g) => sum + (g['3FGA'] ?? 0), 0);
    const totalFTA = playedGames.reduce((sum, g) => sum + (g.FTA ?? 0), 0);
    const totalOREB = playedGames.reduce((sum, g) => sum + (g.OREB ?? 0), 0);
    const totalDREB = playedGames.reduce((sum, g) => sum + (g.DREB ?? 0), 0);
    const totalAST = playedGames.reduce((sum, g) => sum + (g.AST ?? 0), 0);
    const totalTO = playedGames.reduce((sum, g) => sum + (g.TO ?? 0), 0);
    const totalSTL = playedGames.reduce((sum, g) => sum + (g.STL ?? 0), 0);
    const totalBLK = playedGames.reduce((sum, g) => sum + (g.BLK ?? 0), 0);

    // Calculate points: 2-pointers made * 2 + 3-pointers made * 3 + free throws made
    const total2FGM = playedGames.reduce((sum, g) => {
      const pct = normalizePercent(g['2FG%']);
      const made = (g['2FGA'] ?? 0) * pct;
      return sum + made;
    }, 0);
    
    const total3FGM = playedGames.reduce((sum, g) => {
      const pct = normalizePercent(g['3FG%']);
      const made = (g['3FGA'] ?? 0) * pct;
      return sum + made;
    }, 0);
    
    const totalFTM = playedGames.reduce((sum, g) => {
      const pct = normalizePercent(g['FT%']);
      const made = (g.FTA ?? 0) * pct;
      return sum + made;
    }, 0);
    
    const totalPoints = (total2FGM * 2) + (total3FGM * 3) + totalFTM;

    // Calculate averages
    const gamesPlayed = playedGames.length;
    const pointsPerGame = totalPoints / gamesPlayed;
    const reboundsPerGame = (totalOREB + totalDREB) / gamesPlayed;
    const assistsPerGame = totalAST / gamesPlayed;
    const stealsPerGame = totalSTL / gamesPlayed;
    const blocksPerGame = totalBLK / gamesPlayed;
    const turnoversPerGame = totalTO / gamesPlayed;
    const minutesPerGame = totalMins / gamesPlayed;
    const fieldGoalAttemptsPerGame = totalFGA / gamesPlayed;
    const twoPointAttemptsPerGame = total2FGA / gamesPlayed;
    const threePointAttemptsPerGame = total3FGA / gamesPlayed;
    const freeThrowAttemptsPerGame = totalFTA / gamesPlayed;
    const offensiveReboundsPerGame = totalOREB / gamesPlayed;
    const defensiveReboundsPerGame = totalDREB / gamesPlayed;
    
    // Calculate 2-point percentage
    const twoPointPercentage = total2FGA > 0
      ? (playedGames.reduce((sum, g) => {
          const pct = normalizePercent(g['2FG%']);
          return sum + ((g['2FGA'] ?? 0) * pct);
        }, 0) / total2FGA) * 100
      : 0;

    // Calculate shooting percentages (weighted average)
    const fieldGoalPercentage = totalFGA > 0 
      ? (playedGames.reduce((sum, g) => {
          const pct = normalizePercent(g['FG%']);
          return sum + (g.FGA * pct);
        }, 0) / totalFGA) * 100
      : 0;
    
    const threePointPercentage = total3FGA > 0
      ? (playedGames.reduce((sum, g) => {
          const pct = normalizePercent(g['3FG%']);
          return sum + ((g['3FGA'] ?? 0) * pct);
        }, 0) / total3FGA) * 100
      : 0;
    
    const freeThrowPercentage = totalFTA > 0
      ? (playedGames.reduce((sum, g) => {
          const pct = normalizePercent(g['FT%']);
          return sum + ((g.FTA ?? 0) * pct);
        }, 0) / totalFTA) * 100
      : 0;

    // Determine position (simplified - would need actual position data)
    const position = determinePosition(playerNumber, pointsPerGame, reboundsPerGame, assistsPerGame);


    players.push({
      id: `p${playerNumber}`,
      name: playerName,
      number: playerNumber,
      position: position,
      height: "N/A", // Not in the data
      grade: 0, // Not in the data
      stats: {
        gamesPlayed: gamesPlayed,
        pointsPerGame: pointsPerGame,
        reboundsPerGame: reboundsPerGame,
        assistsPerGame: assistsPerGame,
        stealsPerGame: stealsPerGame,
        blocksPerGame: blocksPerGame,
        fieldGoalPercentage: fieldGoalPercentage,
        threePointPercentage: threePointPercentage,
        freeThrowPercentage: freeThrowPercentage,
        turnoversPerGame: turnoversPerGame,
        minutesPerGame: minutesPerGame,
        fieldGoalAttemptsPerGame: fieldGoalAttemptsPerGame,
        twoPointAttemptsPerGame: twoPointAttemptsPerGame,
        twoPointPercentage: twoPointPercentage,
        threePointAttemptsPerGame: threePointAttemptsPerGame,
        freeThrowAttemptsPerGame: freeThrowAttemptsPerGame,
        offensiveReboundsPerGame: offensiveReboundsPerGame,
        defensiveReboundsPerGame: defensiveReboundsPerGame,
      },
    });

    playerNumber++;
  });

  // Calculate team stats
  const totalGames = new Set(rawData.map(r => r.Opponent)).size;
  const totalTeamPoints = players.reduce((sum, p) => sum + (p.stats.pointsPerGame * p.stats.gamesPlayed), 0);
  const totalTeamRebounds = players.reduce((sum, p) => sum + (p.stats.reboundsPerGame * p.stats.gamesPlayed), 0);
  const totalTeamAssists = players.reduce((sum, p) => sum + (p.stats.assistsPerGame * p.stats.gamesPlayed), 0);
  const totalTeamSteals = players.reduce((sum, p) => sum + (p.stats.stealsPerGame * p.stats.gamesPlayed), 0);
  const totalTeamBlocks = players.reduce((sum, p) => sum + (p.stats.blocksPerGame * p.stats.gamesPlayed), 0);
  const totalTeamTurnovers = players.reduce((sum, p) => sum + (p.stats.turnoversPerGame * p.stats.gamesPlayed), 0);

  // Calculate team averages per game
  const pointsPerGame = totalTeamPoints / totalGames;
  const reboundsPerGame = totalTeamRebounds / totalGames;
  const assistsPerGame = totalTeamAssists / totalGames;
  const stealsPerGame = totalTeamSteals / totalGames;
  const blocksPerGame = totalTeamBlocks / totalGames;
  const turnoversPerGame = totalTeamTurnovers / totalGames;
  
  // Calculate detailed team stats
  const totalTeamFGA = rawData
    .filter(r => r.MINS > 0)
    .reduce((sum, g) => sum + g.FGA, 0) / totalGames;
  
  const totalTeam2FGA = rawData
    .filter(r => r.MINS > 0)
    .reduce((sum, g) => sum + (g['2FGA'] ?? 0), 0) / totalGames;
  
  const totalTeam3FGA = rawData
    .filter(r => r.MINS > 0)
    .reduce((sum, g) => sum + (g['3FGA'] ?? 0), 0) / totalGames;
  
  const totalTeamFTA = rawData
    .filter(r => r.MINS > 0)
    .reduce((sum, g) => sum + (g.FTA ?? 0), 0) / totalGames;
  
  const totalTeamOREB = rawData
    .filter(r => r.MINS > 0)
    .reduce((sum, g) => sum + (g.OREB ?? 0), 0) / totalGames;
  
  const totalTeamDREB = rawData
    .filter(r => r.MINS > 0)
    .reduce((sum, g) => sum + (g.DREB ?? 0), 0) / totalGames;
  
  // Calculate 2-point percentage for team
  const totalTeam2FGM = rawData
    .filter(r => r.MINS > 0)
    .reduce((sum, g) => {
      const pct = normalizePercent(g['2FG%']);
      return sum + ((g['2FGA'] ?? 0) * pct);
    }, 0) / totalGames;
  
  const twoPointPercentage = totalTeam2FGA > 0 ? (totalTeam2FGM / totalTeam2FGA) * 100 : 0;

  // Calculate team shooting percentages (weighted)
  const totalTeamFGM = rawData
    .filter(r => r.MINS > 0)
    .reduce((sum, g) => {
      const pct = normalizePercent(g['FG%']);
      return sum + (g.FGA * pct);
    }, 0) / totalGames;

  const fieldGoalPercentage = totalTeamFGA > 0 ? (totalTeamFGM / totalTeamFGA) * 100 : 0;

  const totalTeam3FGM = rawData
    .filter(r => r.MINS > 0)
    .reduce((sum, g) => {
      const pct = normalizePercent(g['3FG%']);
      return sum + ((g['3FGA'] ?? 0) * pct);
    }, 0) / totalGames;

  const threePointPercentage = totalTeam3FGA > 0 ? (totalTeam3FGM / totalTeam3FGA) * 100 : 0;

  const totalTeamFTM = rawData
    .filter(r => r.MINS > 0)
    .reduce((sum, g) => {
      const pct = normalizePercent(g['FT%']);
      return sum + ((g.FTA ?? 0) * pct);
    }, 0) / totalGames;

  const freeThrowPercentage = totalTeamFTA > 0 ? (totalTeamFTM / totalTeamFTA) * 100 : 0;

  // Estimate wins/losses (would need actual game results)
  // For now, estimate based on average performance
  const estimatedWins = Math.round(totalGames * 0.5); // Placeholder
  const estimatedLosses = totalGames - estimatedWins;

  const team: Team = {
    id: 'independence',
    name: 'Independence Varsity Girls Basketball',
    location: 'Frisco, Texas',
    season: '2024-2025',
    players: players,
    teamStats: {
      wins: estimatedWins,
      losses: estimatedLosses,
      pointsPerGame: pointsPerGame,
      reboundsPerGame: reboundsPerGame,
      assistsPerGame: assistsPerGame,
      stealsPerGame: stealsPerGame,
      blocksPerGame: blocksPerGame,
      fieldGoalPercentage: fieldGoalPercentage,
      threePointPercentage: threePointPercentage,
      freeThrowPercentage: freeThrowPercentage,
      turnoversPerGame: turnoversPerGame,
      fieldGoalAttemptsPerGame: totalTeamFGA,
      twoPointAttemptsPerGame: totalTeam2FGA,
      twoPointPercentage: twoPointPercentage,
      threePointAttemptsPerGame: totalTeam3FGA,
      freeThrowAttemptsPerGame: totalTeamFTA,
      offensiveReboundsPerGame: totalTeamOREB,
      defensiveReboundsPerGame: totalTeamDREB,
    },
  };

  return team;
}

function determinePosition(
  playerNumber: number,
  ppg: number,
  rpg: number,
  apg: number
): string {
  // Simple heuristic based on stats
  if (apg > 3) return 'PG';
  if (rpg > 6) return 'C';
  if (rpg > 4) return 'PF';
  if (ppg > 10 && apg > 2) return 'SG';
  return 'SF';
}

