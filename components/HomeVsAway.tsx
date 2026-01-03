'use client';

import { Team } from '@/types/basketball';
import { GameRecord } from '@/utils/processIndependenceData';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface HomeVsAwayProps {
  yourTeam: Team;
  rawGameData?: GameRecord[];
}

interface LocationStats {
  games: number;
  wins: number;
  losses: number;
  pointsPerGame: number;
  reboundsPerGame: number;
  assistsPerGame: number;
  stealsPerGame: number;
  blocksPerGame: number;
  turnoversPerGame: number;
  fieldGoalPercentage: number;
  threePointPercentage: number;
  freeThrowPercentage: number;
  fieldGoalAttemptsPerGame: number;
  twoPointAttemptsPerGame: number;
  threePointAttemptsPerGame: number;
  freeThrowAttemptsPerGame: number;
  offensiveReboundsPerGame: number;
  defensiveReboundsPerGame: number;
}

export default function HomeVsAway({ yourTeam, rawGameData }: HomeVsAwayProps) {
  // Helper to normalize percentage
  const normalizePercent = (val: number | null | undefined): number => {
    if (val === null || val === undefined) return 0;
    return val > 1 ? val / 100 : val;
  };

  // Process home vs away stats from raw game data
  const processLocationStats = (): { home: LocationStats; away: LocationStats } | null => {
    if (!rawGameData || rawGameData.length === 0) return null;

    // Check if data has Location field
    const hasLocation = rawGameData.some((record: any) => 'Location' in record || 'Home' in record || 'Away' in record);
    
    if (!hasLocation) {
      // Try to infer from opponent name patterns (e.g., "@ Opponent" means away)
      const homeGames = new Set<string>();
      const awayGames = new Set<string>();
      
      rawGameData.forEach((record: any) => {
        const opponent = record.Opponent || '';
        // Check if opponent name starts with "@" or contains "at" or "vs"
        if (opponent.startsWith('@') || opponent.toLowerCase().includes(' at ')) {
          awayGames.add(opponent);
        } else if (opponent.toLowerCase().includes(' vs ') || opponent.toLowerCase().includes('v.')) {
          homeGames.add(opponent);
        } else {
          // Default: alternate or assume home (you may need to adjust this logic)
          homeGames.add(opponent);
        }
      });

      // If we couldn't determine, return null
      if (homeGames.size === 0 && awayGames.size === 0) {
        return null;
      }

      // Process home games
      const homeRecords = rawGameData.filter((r: any) => {
        const opp = r.Opponent || '';
        return homeGames.has(opp) || (!awayGames.has(opp) && !opp.startsWith('@'));
      });

      // Process away games  
      const awayRecords = rawGameData.filter((r: any) => {
        const opp = r.Opponent || '';
        return awayGames.has(opp) || opp.startsWith('@');
      });

      return {
        home: calculateLocationStats(homeRecords),
        away: calculateLocationStats(awayRecords),
      };
    }

    // Process with explicit Location field
    const homeRecords = rawGameData.filter((r: any) => 
      r.Location === 'Home' || r.Home === true || r.Location === 'H'
    );
    const awayRecords = rawGameData.filter((r: any) => 
      r.Location === 'Away' || r.Away === true || r.Location === 'A'
    );

    return {
      home: calculateLocationStats(homeRecords),
      away: calculateLocationStats(awayRecords),
    };
  };

  const calculateLocationStats = (records: GameRecord[]): LocationStats => {
    const playedRecords = records.filter(r => r.MINS > 0);
    const uniqueGames = new Set(playedRecords.map(r => r.Opponent)).size;
    
    if (uniqueGames === 0) {
      return createEmptyStats();
    }

    const totalPoints = playedRecords.reduce((sum, g) => {
      const pct2 = normalizePercent(g['2FG%']);
      const pct3 = normalizePercent(g['3FG%']);
      const pctFT = normalizePercent(g['FT%']);
      const made2 = (g['2FGA'] ?? 0) * pct2;
      const made3 = (g['3FGA'] ?? 0) * pct3;
      const madeFT = (g.FTA ?? 0) * pctFT;
      return sum + (made2 * 2) + (made3 * 3) + madeFT;
    }, 0);

    const totalRebounds = playedRecords.reduce((sum, g) => 
      sum + (g.OREB ?? 0) + (g.DREB ?? 0), 0
    );
    const totalAssists = playedRecords.reduce((sum, g) => sum + (g.AST ?? 0), 0);
    const totalSteals = playedRecords.reduce((sum, g) => sum + (g.STL ?? 0), 0);
    const totalBlocks = playedRecords.reduce((sum, g) => sum + (g.BLK ?? 0), 0);
    const totalTurnovers = playedRecords.reduce((sum, g) => sum + (g.TO ?? 0), 0);
    const totalFGA = playedRecords.reduce((sum, g) => sum + g.FGA, 0);
    const total2FGA = playedRecords.reduce((sum, g) => sum + (g['2FGA'] ?? 0), 0);
    const total3FGA = playedRecords.reduce((sum, g) => sum + (g['3FGA'] ?? 0), 0);
    const totalFTA = playedRecords.reduce((sum, g) => sum + (g.FTA ?? 0), 0);
    const totalOREB = playedRecords.reduce((sum, g) => sum + (g.OREB ?? 0), 0);
    const totalDREB = playedRecords.reduce((sum, g) => sum + (g.DREB ?? 0), 0);

    const totalFGM = playedRecords.reduce((sum, g) => {
      const pct = normalizePercent(g['FG%']);
      return sum + (g.FGA * pct);
    }, 0);

    const total3FGM = playedRecords.reduce((sum, g) => {
      const pct = normalizePercent(g['3FG%']);
      return sum + ((g['3FGA'] ?? 0) * pct);
    }, 0);

    const totalFTM = playedRecords.reduce((sum, g) => {
      const pct = normalizePercent(g['FT%']);
      return sum + ((g.FTA ?? 0) * pct);
    }, 0);

    return {
      games: uniqueGames,
      wins: Math.round(uniqueGames * 0.5), // Placeholder - would need actual results
      losses: uniqueGames - Math.round(uniqueGames * 0.5),
      pointsPerGame: totalPoints / uniqueGames,
      reboundsPerGame: totalRebounds / uniqueGames,
      assistsPerGame: totalAssists / uniqueGames,
      stealsPerGame: totalSteals / uniqueGames,
      blocksPerGame: totalBlocks / uniqueGames,
      turnoversPerGame: totalTurnovers / uniqueGames,
      fieldGoalPercentage: totalFGA > 0 ? (totalFGM / totalFGA) * 100 : 0,
      threePointPercentage: total3FGA > 0 ? (total3FGM / total3FGA) * 100 : 0,
      freeThrowPercentage: totalFTA > 0 ? (totalFTM / totalFTA) * 100 : 0,
      fieldGoalAttemptsPerGame: totalFGA / uniqueGames,
      twoPointAttemptsPerGame: total2FGA / uniqueGames,
      threePointAttemptsPerGame: total3FGA / uniqueGames,
      freeThrowAttemptsPerGame: totalFTA / uniqueGames,
      offensiveReboundsPerGame: totalOREB / uniqueGames,
      defensiveReboundsPerGame: totalDREB / uniqueGames,
    };
  };

  const createEmptyStats = (): LocationStats => ({
    games: 0,
    wins: 0,
    losses: 0,
    pointsPerGame: 0,
    reboundsPerGame: 0,
    assistsPerGame: 0,
    stealsPerGame: 0,
    blocksPerGame: 0,
    turnoversPerGame: 0,
    fieldGoalPercentage: 0,
    threePointPercentage: 0,
    freeThrowPercentage: 0,
    fieldGoalAttemptsPerGame: 0,
    twoPointAttemptsPerGame: 0,
    threePointAttemptsPerGame: 0,
    freeThrowAttemptsPerGame: 0,
    offensiveReboundsPerGame: 0,
    defensiveReboundsPerGame: 0,
  });

  const locationStats = processLocationStats();

  if (!locationStats || (locationStats.home.games === 0 && locationStats.away.games === 0)) {
    return (
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-yellow-800 mb-2">⚠️ Home/Away Data Not Available</h3>
        <p className="text-yellow-700 mb-4">
          To see home vs away comparisons, please add a <code className="bg-yellow-100 px-2 py-1 rounded">Location</code> field to your game data with values "Home" or "Away".
        </p>
        <p className="text-yellow-700 text-sm">
          Alternatively, mark away games in opponent names with "@" prefix (e.g., "@ Opponent Name").
        </p>
      </div>
    );
  }

  const { home, away } = locationStats;

  // Tooltip formatter
  const tooltipFormatter = (value: number | string) => {
    if (typeof value === 'number') {
      return value.toFixed(1);
    }
    return value;
  };

  // Chart data
  const comparisonData = [
    {
      stat: 'Points/Game',
      Home: home.pointsPerGame,
      Away: away.pointsPerGame,
    },
    {
      stat: 'Rebounds/Game',
      Home: home.reboundsPerGame,
      Away: away.reboundsPerGame,
    },
    {
      stat: 'Assists/Game',
      Home: home.assistsPerGame,
      Away: away.assistsPerGame,
    },
    {
      stat: 'Steals/Game',
      Home: home.stealsPerGame,
      Away: away.stealsPerGame,
    },
    {
      stat: 'Blocks/Game',
      Home: home.blocksPerGame,
      Away: away.blocksPerGame,
    },
  ];

  const shootingData = [
    {
      stat: 'FG%',
      Home: home.fieldGoalPercentage,
      Away: away.fieldGoalPercentage,
    },
    {
      stat: '3PT%',
      Home: home.threePointPercentage,
      Away: away.threePointPercentage,
    },
    {
      stat: 'FT%',
      Home: home.freeThrowPercentage,
      Away: away.freeThrowPercentage,
    },
  ];

  return (
    <div className="space-y-6">
      {/* Description */}
      <div className="bg-white rounded-lg shadow p-6">
        <p className="text-gray-700 text-base">
          Compares Independence's Girls Varsity Team performance in home games versus away games
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold mb-4 text-gray-800">Home Games</h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600">Games:</span>
              <span className="font-semibold text-gray-800">{home.games}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Record:</span>
              <span className="font-semibold text-gray-800">
                {home.wins}-{home.losses}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Win %:</span>
              <span className="font-semibold text-gray-800">
                {home.games > 0 ? ((home.wins / home.games) * 100).toFixed(1) : '0.0'}%
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">PPG:</span>
              <span className="font-semibold text-gray-800">{home.pointsPerGame.toFixed(1)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">RPG:</span>
              <span className="font-semibold text-gray-800">{home.reboundsPerGame.toFixed(1)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">FG%:</span>
              <span className="font-semibold text-gray-800">{home.fieldGoalPercentage.toFixed(1)}%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">3PT%:</span>
              <span className="font-semibold text-gray-800">{home.threePointPercentage.toFixed(1)}%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">FT%:</span>
              <span className="font-semibold text-gray-800">{home.freeThrowPercentage.toFixed(1)}%</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold mb-4 text-gray-800">Away Games</h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600">Games:</span>
              <span className="font-semibold text-gray-800">{away.games}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Record:</span>
              <span className="font-semibold text-gray-800">
                {away.wins}-{away.losses}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Win %:</span>
              <span className="font-semibold text-gray-800">
                {away.games > 0 ? ((away.wins / away.games) * 100).toFixed(1) : '0.0'}%
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">PPG:</span>
              <span className="font-semibold text-gray-800">{away.pointsPerGame.toFixed(1)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">RPG:</span>
              <span className="font-semibold text-gray-800">{away.reboundsPerGame.toFixed(1)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">FG%:</span>
              <span className="font-semibold text-gray-800">{away.fieldGoalPercentage.toFixed(1)}%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">3PT%:</span>
              <span className="font-semibold text-gray-800">{away.threePointPercentage.toFixed(1)}%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">FT%:</span>
              <span className="font-semibold text-gray-800">{away.freeThrowPercentage.toFixed(1)}%</span>
            </div>
          </div>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold mb-4 text-gray-800">Team Statistics Comparison</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={comparisonData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="stat" />
              <YAxis />
              <Tooltip formatter={tooltipFormatter} />
              <Legend />
              <Bar dataKey="Home" fill="#9333ea" />
              <Bar dataKey="Away" fill="#1f2937" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold mb-4 text-gray-800">Shooting Percentages Comparison</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={shootingData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="stat" />
              <YAxis tickFormatter={(value) => `${value.toFixed(1)}%`} />
              <Tooltip formatter={tooltipFormatter} />
              <Legend />
              <Bar dataKey="Home" fill="#9333ea" />
              <Bar dataKey="Away" fill="#1f2937" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Detailed Comparison Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-800">Complete Statistical Comparison</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                  Statistic
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                  Home
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                  Away
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                  Difference
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {[
                { label: 'Points Per Game', home: home.pointsPerGame, away: away.pointsPerGame },
                { label: 'Rebounds Per Game', home: home.reboundsPerGame, away: away.reboundsPerGame },
                { label: 'Assists Per Game', home: home.assistsPerGame, away: away.assistsPerGame },
                { label: 'Steals Per Game', home: home.stealsPerGame, away: away.stealsPerGame },
                { label: 'Blocks Per Game', home: home.blocksPerGame, away: away.blocksPerGame },
                { label: 'Turnovers Per Game', home: home.turnoversPerGame, away: away.turnoversPerGame },
                { label: 'Field Goal %', home: home.fieldGoalPercentage, away: away.fieldGoalPercentage, isPercentage: true },
                { label: '3-Point %', home: home.threePointPercentage, away: away.threePointPercentage, isPercentage: true },
                { label: 'Free Throw %', home: home.freeThrowPercentage, away: away.freeThrowPercentage, isPercentage: true },
                { label: 'FGA Per Game', home: home.fieldGoalAttemptsPerGame, away: away.fieldGoalAttemptsPerGame },
                { label: '2PTA Per Game', home: home.twoPointAttemptsPerGame, away: away.twoPointAttemptsPerGame },
                { label: '3PTA Per Game', home: home.threePointAttemptsPerGame, away: away.threePointAttemptsPerGame },
                { label: 'FTA Per Game', home: home.freeThrowAttemptsPerGame, away: away.freeThrowAttemptsPerGame },
                { label: 'OREB Per Game', home: home.offensiveReboundsPerGame, away: away.offensiveReboundsPerGame },
                { label: 'DREB Per Game', home: home.defensiveReboundsPerGame, away: away.defensiveReboundsPerGame },
              ].map((item, index) => {
                const difference = item.home - item.away;
                const isPercentage = item.isPercentage ?? false;
                return (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {item.label}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                      {isPercentage ? `${item.home.toFixed(1)}%` : item.home.toFixed(1)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                      {isPercentage ? `${item.away.toFixed(1)}%` : item.away.toFixed(1)}
                    </td>
                    <td className={`px-6 py-4 whitespace-nowrap text-sm font-semibold ${
                      difference > 0 ? 'text-green-600' : difference < 0 ? 'text-red-600' : 'text-gray-600'
                    }`}>
                      {difference > 0 ? '+' : ''}
                      {isPercentage ? `${difference.toFixed(1)}%` : difference.toFixed(1)}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

