import { Team, PlayerStats } from '@/types/basketball';

export function calculateTeamAverages(team: Team) {
  const players = team.players;
  const totalGames = Math.max(...players.map(p => p.stats.gamesPlayed));
  
  return {
    avgPointsPerGame: players.reduce((sum, p) => sum + p.stats.pointsPerGame, 0) / players.length,
    avgReboundsPerGame: players.reduce((sum, p) => sum + p.stats.reboundsPerGame, 0) / players.length,
    avgAssistsPerGame: players.reduce((sum, p) => sum + p.stats.assistsPerGame, 0) / players.length,
    avgStealsPerGame: players.reduce((sum, p) => sum + p.stats.stealsPerGame, 0) / players.length,
    avgBlocksPerGame: players.reduce((sum, p) => sum + p.stats.blocksPerGame, 0) / players.length,
    avgFieldGoalPercentage: players.reduce((sum, p) => sum + p.stats.fieldGoalPercentage, 0) / players.length,
    avgThreePointPercentage: players.reduce((sum, p) => sum + p.stats.threePointPercentage, 0) / players.length,
    avgFreeThrowPercentage: players.reduce((sum, p) => sum + p.stats.freeThrowPercentage, 0) / players.length,
    avgTurnoversPerGame: players.reduce((sum, p) => sum + p.stats.turnoversPerGame, 0) / players.length,
    avgMinutesPerGame: players.reduce((sum, p) => sum + p.stats.minutesPerGame, 0) / players.length,
  };
}

export function getTopPerformers(team: Team, stat: keyof PlayerStats, count: number = 5) {
  return [...team.players]
    .sort((a, b) => b.stats[stat] - a.stats[stat])
    .slice(0, count)
    .map(p => ({
      name: p.name,
      value: p.stats[stat],
      position: p.position,
    }));
}

export function compareTeams(team1: Team, team2: Team) {
  const compareStat = (stat: keyof typeof team1.teamStats) => ({
    team1: team1.teamStats[stat] as number,
    team2: team2.teamStats[stat] as number,
    difference: (team1.teamStats[stat] as number) - (team2.teamStats[stat] as number),
  });

  return {
    pointsPerGame: compareStat('pointsPerGame'),
    reboundsPerGame: compareStat('reboundsPerGame'),
    assistsPerGame: compareStat('assistsPerGame'),
    stealsPerGame: compareStat('stealsPerGame'),
    blocksPerGame: compareStat('blocksPerGame'),
    turnoversPerGame: compareStat('turnoversPerGame'),
    fieldGoalPercentage: compareStat('fieldGoalPercentage'),
    threePointPercentage: compareStat('threePointPercentage'),
    freeThrowPercentage: compareStat('freeThrowPercentage'),
    fieldGoalAttemptsPerGame: compareStat('fieldGoalAttemptsPerGame'),
    twoPointAttemptsPerGame: compareStat('twoPointAttemptsPerGame'),
    twoPointPercentage: compareStat('twoPointPercentage'),
    threePointAttemptsPerGame: compareStat('threePointAttemptsPerGame'),
    freeThrowAttemptsPerGame: compareStat('freeThrowAttemptsPerGame'),
    offensiveReboundsPerGame: compareStat('offensiveReboundsPerGame'),
    defensiveReboundsPerGame: compareStat('defensiveReboundsPerGame'),
    wins: compareStat('wins'),
  };
}

