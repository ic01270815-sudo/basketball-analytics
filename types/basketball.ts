export interface Player {
  id: string;
  name: string;
  number: number;
  position: string;
  height: string; // e.g., "5'8\""
  grade: number; // 9-12
  stats: PlayerStats;
}

export interface PlayerStats {
  gamesPlayed: number;
  pointsPerGame: number;
  reboundsPerGame: number;
  assistsPerGame: number;
  stealsPerGame: number;
  blocksPerGame: number;
  fieldGoalPercentage: number;
  threePointPercentage: number;
  freeThrowPercentage: number;
  turnoversPerGame: number;
  minutesPerGame: number;
  // Detailed shooting stats
  fieldGoalAttemptsPerGame: number;
  twoPointAttemptsPerGame: number;
  twoPointPercentage: number;
  threePointAttemptsPerGame: number;
  freeThrowAttemptsPerGame: number;
  offensiveReboundsPerGame: number;
  defensiveReboundsPerGame: number;
}

export interface Team {
  id: string;
  name: string;
  location: string;
  season: string;
  players: Player[];
  teamStats: TeamStats;
}

export interface TeamStats {
  wins: number;
  losses: number;
  pointsPerGame: number;
  reboundsPerGame: number;
  assistsPerGame: number;
  stealsPerGame: number;
  blocksPerGame: number;
  fieldGoalPercentage: number;
  threePointPercentage: number;
  freeThrowPercentage: number;
  turnoversPerGame: number;
  // Detailed shooting stats
  fieldGoalAttemptsPerGame: number;
  twoPointAttemptsPerGame: number;
  twoPointPercentage: number;
  threePointAttemptsPerGame: number;
  freeThrowAttemptsPerGame: number;
  offensiveReboundsPerGame: number;
  defensiveReboundsPerGame: number;
}

