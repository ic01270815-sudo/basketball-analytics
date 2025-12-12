import { Team, Player } from '@/types/basketball';

// Helper function to add detailed stats to players that don't have them
export function addDetailedStatsToPlayer(player: Player): Player {
  // Calculate realistic values based on existing stats
  const fgAttempts = player.stats.pointsPerGame / (player.stats.fieldGoalPercentage / 100) * 1.2; // Rough estimate
  const twoPointAttempts = fgAttempts * 0.75; // Most shots are 2-pointers
  const threePointAttempts = fgAttempts * 0.25;
  const ftAttempts = player.stats.pointsPerGame * 0.25; // Rough estimate
  const twoPointPct = player.stats.fieldGoalPercentage * 1.1; // 2-pointers usually higher
  
  // Estimate rebounds split (60% defensive, 40% offensive is typical)
  const oreb = player.stats.reboundsPerGame * 0.4;
  const dreb = player.stats.reboundsPerGame * 0.6;

  return {
    ...player,
    stats: {
      ...player.stats,
      fieldGoalAttemptsPerGame: player.stats.fieldGoalAttemptsPerGame ?? fgAttempts,
      twoPointAttemptsPerGame: player.stats.twoPointAttemptsPerGame ?? twoPointAttempts,
      twoPointPercentage: player.stats.twoPointPercentage ?? twoPointPct,
      threePointAttemptsPerGame: player.stats.threePointAttemptsPerGame ?? threePointAttempts,
      freeThrowAttemptsPerGame: player.stats.freeThrowAttemptsPerGame ?? ftAttempts,
      offensiveReboundsPerGame: player.stats.offensiveReboundsPerGame ?? oreb,
      defensiveReboundsPerGame: player.stats.defensiveReboundsPerGame ?? dreb,
    },
  };
}

export function addDetailedStatsToTeam(team: Team): Team {
  return {
    ...team,
    players: team.players.map(addDetailedStatsToPlayer),
    teamStats: {
      ...team.teamStats,
      // If team stats don't have detailed stats, calculate from players
      fieldGoalAttemptsPerGame: team.teamStats.fieldGoalAttemptsPerGame ?? 
        team.players.reduce((sum, p) => sum + (p.stats.fieldGoalAttemptsPerGame ?? 0), 0) / team.players.length,
      twoPointAttemptsPerGame: team.teamStats.twoPointAttemptsPerGame ?? 
        team.players.reduce((sum, p) => sum + (p.stats.twoPointAttemptsPerGame ?? 0), 0) / team.players.length,
      twoPointPercentage: team.teamStats.twoPointPercentage ?? 
        team.players.reduce((sum, p) => sum + (p.stats.twoPointPercentage ?? 0), 0) / team.players.length,
      threePointAttemptsPerGame: team.teamStats.threePointAttemptsPerGame ?? 
        team.players.reduce((sum, p) => sum + (p.stats.threePointAttemptsPerGame ?? 0), 0) / team.players.length,
      freeThrowAttemptsPerGame: team.teamStats.freeThrowAttemptsPerGame ?? 
        team.players.reduce((sum, p) => sum + (p.stats.freeThrowAttemptsPerGame ?? 0), 0) / team.players.length,
      offensiveReboundsPerGame: team.teamStats.offensiveReboundsPerGame ?? 
        team.players.reduce((sum, p) => sum + (p.stats.offensiveReboundsPerGame ?? 0), 0) / team.players.length,
      defensiveReboundsPerGame: team.teamStats.defensiveReboundsPerGame ?? 
        team.players.reduce((sum, p) => sum + (p.stats.defensiveReboundsPerGame ?? 0), 0) / team.players.length,
    },
  };
}

