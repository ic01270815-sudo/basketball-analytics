'use client';

import { Team } from '@/types/basketball';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface TeamOverviewProps {
  yourTeam: Team | null;
  texasTeam: Team;
  showBoth?: boolean;
}

interface StatItem {
  label: string;
  yourTeam: number;
  texasTeam: number;
  isPercentage?: boolean;
}

export default function TeamOverview({ yourTeam, texasTeam, showBoth = true }: TeamOverviewProps) {
  const teams = showBoth && yourTeam ? [yourTeam, texasTeam] : [texasTeam];
  
  // Format stat helper
  const formatStat = (value: number | undefined, isPercentage: boolean = false): string => {
    if (value === undefined || value === null) return 'N/A';
    if (isPercentage) {
      return `${value.toFixed(1)}%`;
    }
    return value.toFixed(1);
  };

  // Stats sections for complete averages
  const statsSections: Array<{ title: string; stats: StatItem[] }> = yourTeam ? [
    {
      title: 'Scoring Averages',
      stats: [
        { label: 'Points Per Game', yourTeam: yourTeam.teamStats.pointsPerGame, texasTeam: texasTeam.teamStats.pointsPerGame },
      ],
    },
    {
      title: 'Rebounding Averages',
      stats: [
        { label: 'Total Rebounds Per Game', yourTeam: yourTeam.teamStats.reboundsPerGame, texasTeam: texasTeam.teamStats.reboundsPerGame },
        { label: 'Offensive Rebounds Per Game', yourTeam: yourTeam.teamStats.offensiveReboundsPerGame ?? 0, texasTeam: texasTeam.teamStats.offensiveReboundsPerGame ?? 0 },
        { label: 'Defensive Rebounds Per Game', yourTeam: yourTeam.teamStats.defensiveReboundsPerGame ?? 0, texasTeam: texasTeam.teamStats.defensiveReboundsPerGame ?? 0 },
      ],
    },
    {
      title: 'Playmaking Averages',
      stats: [
        { label: 'Assists Per Game', yourTeam: yourTeam.teamStats.assistsPerGame, texasTeam: texasTeam.teamStats.assistsPerGame },
        { label: 'Turnovers Per Game', yourTeam: yourTeam.teamStats.turnoversPerGame, texasTeam: texasTeam.teamStats.turnoversPerGame },
      ],
    },
    {
      title: 'Defense Averages',
      stats: [
        { label: 'Steals Per Game', yourTeam: yourTeam.teamStats.stealsPerGame, texasTeam: texasTeam.teamStats.stealsPerGame },
        { label: 'Blocks Per Game', yourTeam: yourTeam.teamStats.blocksPerGame, texasTeam: texasTeam.teamStats.blocksPerGame },
      ],
    },
    {
      title: 'Shooting Averages - Attempts',
      stats: [
        { label: 'Field Goal Attempts Per Game', yourTeam: yourTeam.teamStats.fieldGoalAttemptsPerGame ?? 0, texasTeam: texasTeam.teamStats.fieldGoalAttemptsPerGame ?? 0 },
        { label: '2-Point Attempts Per Game', yourTeam: yourTeam.teamStats.twoPointAttemptsPerGame ?? 0, texasTeam: texasTeam.teamStats.twoPointAttemptsPerGame ?? 0 },
        { label: '3-Point Attempts Per Game', yourTeam: yourTeam.teamStats.threePointAttemptsPerGame ?? 0, texasTeam: texasTeam.teamStats.threePointAttemptsPerGame ?? 0 },
        { label: 'Free Throw Attempts Per Game', yourTeam: yourTeam.teamStats.freeThrowAttemptsPerGame ?? 0, texasTeam: texasTeam.teamStats.freeThrowAttemptsPerGame ?? 0 },
      ],
    },
    {
      title: 'Shooting Averages - Percentages',
      stats: [
        { label: 'Field Goal %', yourTeam: yourTeam.teamStats.fieldGoalPercentage, texasTeam: texasTeam.teamStats.fieldGoalPercentage, isPercentage: true },
        { label: '2-Point %', yourTeam: yourTeam.teamStats.twoPointPercentage ?? 0, texasTeam: texasTeam.teamStats.twoPointPercentage ?? 0, isPercentage: true },
        { label: '3-Point %', yourTeam: yourTeam.teamStats.threePointPercentage, texasTeam: texasTeam.teamStats.threePointPercentage, isPercentage: true },
        { label: 'Free Throw %', yourTeam: yourTeam.teamStats.freeThrowPercentage, texasTeam: texasTeam.teamStats.freeThrowPercentage, isPercentage: true },
      ],
    },
  ] : [];
  
  // Helper function to get color based on team name and stat index
  // Uses purple, black, and gray shades for Independence
  const getTeamColor = (teamName: string, statIndex: number) => {
    if (teamName && teamName.includes('Independence')) {
      // Purple, black, and gray shades for Independence
      const independenceColors = [
        '#9333ea', // purple-600
        '#1f2937', // gray-800 (dark/black)
        '#7c3aed', // purple-500
        '#374151', // gray-700
        '#a855f7', // purple-500 (lighter)
        '#4b5563', // gray-600
        '#8b5cf6', // purple-400
        '#6b7280', // gray-500
        '#c084fc', // purple-300
        '#9ca3af', // gray-400
      ];
      return independenceColors[statIndex % independenceColors.length];
    }
    // Default colors for other teams
    const defaultShades = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6'];
    return defaultShades[statIndex % defaultShades.length];
  };
  
  // Check if Independence team is in the data
  const hasIndependence = teams.some(team => team.name.includes('Independence'));
  
  // Tooltip formatter to ensure all values show only 1 decimal place
  const tooltipFormatter = (value: number | string, name?: string | number) => {
    if (typeof value === 'number') {
      // Check if this is a percentage stat (FG%, 2PT%, 3PT%, FT%)
      const nameStr = typeof name === 'string' ? name : String(name || '');
      const isPercentage = nameStr && (nameStr.includes('%') || nameStr.includes('FG%') || nameStr.includes('PT%') || nameStr.includes('FT%'));
      if (isPercentage) {
        return `${value.toFixed(1)}%`;
      }
      return value.toFixed(1);
    }
    return value;
  };
  
  const chartData = teams.map(team => ({
    name: team.name,
    'Points/Game': team.teamStats.pointsPerGame,
    'Rebounds/Game': team.teamStats.reboundsPerGame,
    'Assists/Game': team.teamStats.assistsPerGame,
    'Steals/Game': team.teamStats.stealsPerGame,
    'Blocks/Game': team.teamStats.blocksPerGame,
  }));

  const shootingData = teams.map(team => ({
    name: team.name,
    'FG%': team.teamStats.fieldGoalPercentage,
    '2PT%': team.teamStats.twoPointPercentage ?? 0,
    '3PT%': team.teamStats.threePointPercentage,
    'FT%': team.teamStats.freeThrowPercentage,
  }));

  const attemptsData = teams.map(team => ({
    name: team.name,
    'FGA': team.teamStats.fieldGoalAttemptsPerGame ?? 0,
    '2PTA': team.teamStats.twoPointAttemptsPerGame ?? 0,
    '3PTA': team.teamStats.threePointAttemptsPerGame ?? 0,
    'FTA': team.teamStats.freeThrowAttemptsPerGame ?? 0,
  }));

  const reboundingData = teams.map(team => ({
    name: team.name,
    'Total REB': team.teamStats.reboundsPerGame,
    'OREB': team.teamStats.offensiveReboundsPerGame ?? 0,
    'DREB': team.teamStats.defensiveReboundsPerGame ?? 0,
  }));

  return (
    <div className="space-y-6">
      {/* Description */}
      <div className="bg-white rounded-lg shadow p-6">
        <p className="text-gray-700 text-base">
          Compares Independence Varsity Girls Basketball Team to an Average Texas Varsity Girls Basketball Team
        </p>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold mb-4 text-gray-800">Team Statistics</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip formatter={tooltipFormatter} />
              <Legend />
              <Bar dataKey="Points/Game" fill={hasIndependence ? getTeamColor('Independence', 0) : '#3b82f6'} />
              <Bar dataKey="Rebounds/Game" fill={hasIndependence ? getTeamColor('Independence', 1) : '#10b981'} />
              <Bar dataKey="Assists/Game" fill={hasIndependence ? getTeamColor('Independence', 2) : '#f59e0b'} />
              <Bar dataKey="Steals/Game" fill={hasIndependence ? getTeamColor('Independence', 3) : '#ef4444'} />
              <Bar dataKey="Blocks/Game" fill={hasIndependence ? getTeamColor('Independence', 4) : '#8b5cf6'} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold mb-4 text-gray-800">Shooting Percentages</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={shootingData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis tickFormatter={(value) => `${value.toFixed(1)}%`} />
              <Tooltip formatter={tooltipFormatter} />
              <Legend />
              <Bar dataKey="FG%" fill={hasIndependence ? getTeamColor('Independence', 0) : '#3b82f6'} />
              <Bar dataKey="2PT%" fill={hasIndependence ? getTeamColor('Independence', 1) : '#10b981'} />
              <Bar dataKey="3PT%" fill={hasIndependence ? getTeamColor('Independence', 2) : '#f59e0b'} />
              <Bar dataKey="FT%" fill={hasIndependence ? getTeamColor('Independence', 3) : '#ef4444'} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold mb-4 text-gray-800">Shot Attempts Per Game</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={attemptsData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip formatter={tooltipFormatter} />
              <Legend />
              <Bar dataKey="FGA" fill={hasIndependence ? getTeamColor('Independence', 0) : '#3b82f6'} />
              <Bar dataKey="2PTA" fill={hasIndependence ? getTeamColor('Independence', 1) : '#10b981'} />
              <Bar dataKey="3PTA" fill={hasIndependence ? getTeamColor('Independence', 2) : '#f59e0b'} />
              <Bar dataKey="FTA" fill={hasIndependence ? getTeamColor('Independence', 3) : '#ef4444'} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold mb-4 text-gray-800">Rebounding Breakdown</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={reboundingData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip formatter={tooltipFormatter} />
              <Legend />
              <Bar dataKey="Total REB" fill={hasIndependence ? getTeamColor('Independence', 0) : '#3b82f6'} />
              <Bar dataKey="OREB" fill={hasIndependence ? getTeamColor('Independence', 1) : '#10b981'} />
              <Bar dataKey="DREB" fill={hasIndependence ? getTeamColor('Independence', 2) : '#f59e0b'} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Complete Team Averages Comparison */}
      {yourTeam && (
        <>
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-2xl font-bold mb-6 text-gray-800">Complete Team Averages Comparison</h2>
            
            {statsSections.map((section, sectionIndex) => (
              <div key={sectionIndex} className="mb-8">
                <h3 className="text-xl font-semibold mb-4 text-gray-800 border-b pb-2">
                  {section.title}
                </h3>
                <div className="overflow-x-auto">
                  <table className="min-w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-3 px-4 font-semibold text-gray-700">Statistic</th>
                        <th className="text-center py-3 px-4 font-semibold" style={{ color: '#9333ea' }}>{yourTeam.name}</th>
                        <th className="text-center py-3 px-4 font-semibold text-black">{texasTeam.name}</th>
                        <th className="text-center py-3 px-4 font-semibold text-gray-700">Difference</th>
                      </tr>
                    </thead>
                    <tbody>
                      {section.stats.map((stat, statIndex) => {
                        const difference = stat.yourTeam - stat.texasTeam;
                        const isPercentage = stat.isPercentage ?? false;
                        return (
                          <tr key={statIndex} className="border-b hover:bg-gray-100">
                            <td className="py-3 px-4 text-gray-800 font-medium">{stat.label}</td>
                            <td className="py-3 px-4 text-center font-semibold" style={{ color: '#9333ea' }}>
                              {formatStat(stat.yourTeam, isPercentage)}
                            </td>
                            <td className="py-3 px-4 text-center text-black font-semibold">
                              {formatStat(stat.texasTeam, isPercentage)}
                            </td>
                            <td className={`py-3 px-4 text-center font-semibold ${
                              difference > 0 ? 'text-green-600' : difference < 0 ? 'text-red-600' : 'text-gray-700'
                            }`}>
                              {difference > 0 ? '+' : ''}
                              {formatStat(difference, isPercentage)}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            ))}
          </div>

          {/* Player Averages Summary */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-2xl font-bold mb-6 text-gray-800">Player Averages Summary</h2>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Independence Player Averages */}
              <div>
                <h3 className="text-lg font-semibold mb-4" style={{ color: '#9333ea' }}>{yourTeam.name} - Average Per Player</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between py-2 border-b">
                    <span className="text-gray-700">Avg Points Per Game:</span>
                    <span className="font-semibold" style={{ color: '#9333ea' }}>
                      {(yourTeam.players.reduce((sum, p) => sum + p.stats.pointsPerGame, 0) / yourTeam.players.length).toFixed(1)}
                    </span>
                  </div>
                  <div className="flex justify-between py-2 border-b">
                    <span className="text-gray-700">Avg Rebounds Per Game:</span>
                    <span className="font-semibold" style={{ color: '#9333ea' }}>
                      {(yourTeam.players.reduce((sum, p) => sum + p.stats.reboundsPerGame, 0) / yourTeam.players.length).toFixed(1)}
                    </span>
                  </div>
                  <div className="flex justify-between py-2 border-b">
                    <span className="text-gray-700">Avg Assists Per Game:</span>
                    <span className="font-semibold" style={{ color: '#9333ea' }}>
                      {(yourTeam.players.reduce((sum, p) => sum + p.stats.assistsPerGame, 0) / yourTeam.players.length).toFixed(1)}
                    </span>
                  </div>
                  <div className="flex justify-between py-2 border-b">
                    <span className="text-gray-700">Avg Steals Per Game:</span>
                    <span className="font-semibold" style={{ color: '#9333ea' }}>
                      {(yourTeam.players.reduce((sum, p) => sum + p.stats.stealsPerGame, 0) / yourTeam.players.length).toFixed(1)}
                    </span>
                  </div>
                  <div className="flex justify-between py-2 border-b">
                    <span className="text-gray-700">Avg Blocks Per Game:</span>
                    <span className="font-semibold" style={{ color: '#9333ea' }}>
                      {(yourTeam.players.reduce((sum, p) => sum + p.stats.blocksPerGame, 0) / yourTeam.players.length).toFixed(1)}
                    </span>
                  </div>
                  <div className="flex justify-between py-2 border-b">
                    <span className="text-gray-700">Avg Minutes Per Game:</span>
                    <span className="font-semibold" style={{ color: '#9333ea' }}>
                      {(yourTeam.players.reduce((sum, p) => sum + p.stats.minutesPerGame, 0) / yourTeam.players.length).toFixed(1)}
                    </span>
                  </div>
                  <div className="flex justify-between py-2 border-b">
                    <span className="text-gray-700">Avg FG%:</span>
                    <span className="font-semibold" style={{ color: '#9333ea' }}>
                      {(yourTeam.players.reduce((sum, p) => sum + p.stats.fieldGoalPercentage, 0) / yourTeam.players.length).toFixed(1)}%
                    </span>
                  </div>
                  <div className="flex justify-between py-2 border-b">
                    <span className="text-gray-700">Avg 3PT%:</span>
                    <span className="font-semibold" style={{ color: '#9333ea' }}>
                      {(yourTeam.players.reduce((sum, p) => sum + p.stats.threePointPercentage, 0) / yourTeam.players.length).toFixed(1)}%
                    </span>
                  </div>
                  <div className="flex justify-between py-2 border-b">
                    <span className="text-gray-700">Avg FT%:</span>
                    <span className="font-semibold" style={{ color: '#9333ea' }}>
                      {(yourTeam.players.reduce((sum, p) => sum + p.stats.freeThrowPercentage, 0) / yourTeam.players.length).toFixed(1)}%
                    </span>
                  </div>
                  <div className="flex justify-between py-2 border-b">
                    <span className="text-gray-700">Avg FGA Per Game:</span>
                    <span className="font-semibold" style={{ color: '#9333ea' }}>
                      {(yourTeam.players.reduce((sum, p) => sum + (p.stats.fieldGoalAttemptsPerGame ?? 0), 0) / yourTeam.players.length).toFixed(1)}
                    </span>
                  </div>
                  <div className="flex justify-between py-2 border-b">
                    <span className="text-gray-700">Avg 2PTA Per Game:</span>
                    <span className="font-semibold" style={{ color: '#9333ea' }}>
                      {(yourTeam.players.reduce((sum, p) => sum + (p.stats.twoPointAttemptsPerGame ?? 0), 0) / yourTeam.players.length).toFixed(1)}
                    </span>
                  </div>
                  <div className="flex justify-between py-2 border-b">
                    <span className="text-gray-700">Avg 3PTA Per Game:</span>
                    <span className="font-semibold" style={{ color: '#9333ea' }}>
                      {(yourTeam.players.reduce((sum, p) => sum + (p.stats.threePointAttemptsPerGame ?? 0), 0) / yourTeam.players.length).toFixed(1)}
                    </span>
                  </div>
                  <div className="flex justify-between py-2 border-b">
                    <span className="text-gray-700">Avg FTA Per Game:</span>
                    <span className="font-semibold" style={{ color: '#9333ea' }}>
                      {(yourTeam.players.reduce((sum, p) => sum + (p.stats.freeThrowAttemptsPerGame ?? 0), 0) / yourTeam.players.length).toFixed(1)}
                    </span>
                  </div>
                  <div className="flex justify-between py-2 border-b">
                    <span className="text-gray-700">Avg OREB Per Game:</span>
                    <span className="font-semibold" style={{ color: '#9333ea' }}>
                      {(yourTeam.players.reduce((sum, p) => sum + (p.stats.offensiveReboundsPerGame ?? 0), 0) / yourTeam.players.length).toFixed(1)}
                    </span>
                  </div>
                  <div className="flex justify-between py-2 border-b">
                    <span className="text-gray-700">Avg DREB Per Game:</span>
                    <span className="font-semibold" style={{ color: '#9333ea' }}>
                      {(yourTeam.players.reduce((sum, p) => sum + (p.stats.defensiveReboundsPerGame ?? 0), 0) / yourTeam.players.length).toFixed(1)}
                    </span>
                  </div>
                  <div className="flex justify-between py-2 border-b">
                    <span className="text-gray-700">Avg Turnovers Per Game:</span>
                    <span className="font-semibold" style={{ color: '#9333ea' }}>
                      {(yourTeam.players.reduce((sum, p) => sum + p.stats.turnoversPerGame, 0) / yourTeam.players.length).toFixed(1)}
                    </span>
                  </div>
                </div>
              </div>

              {/* Texas Team Player Averages */}
              <div>
                <h3 className="text-lg font-semibold mb-4 text-black">{texasTeam.name} - Average Per Player</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between py-2 border-b">
                    <span className="text-gray-700">Avg Points Per Game:</span>
                    <span className="font-semibold text-black">
                      {(texasTeam.players.reduce((sum, p) => sum + p.stats.pointsPerGame, 0) / texasTeam.players.length).toFixed(1)}
                    </span>
                  </div>
                  <div className="flex justify-between py-2 border-b">
                    <span className="text-gray-700">Avg Rebounds Per Game:</span>
                    <span className="font-semibold text-black">
                      {(texasTeam.players.reduce((sum, p) => sum + p.stats.reboundsPerGame, 0) / texasTeam.players.length).toFixed(1)}
                    </span>
                  </div>
                  <div className="flex justify-between py-2 border-b">
                    <span className="text-gray-700">Avg Assists Per Game:</span>
                    <span className="font-semibold text-black">
                      {(texasTeam.players.reduce((sum, p) => sum + p.stats.assistsPerGame, 0) / texasTeam.players.length).toFixed(1)}
                    </span>
                  </div>
                  <div className="flex justify-between py-2 border-b">
                    <span className="text-gray-700">Avg Steals Per Game:</span>
                    <span className="font-semibold text-black">
                      {(texasTeam.players.reduce((sum, p) => sum + p.stats.stealsPerGame, 0) / texasTeam.players.length).toFixed(1)}
                    </span>
                  </div>
                  <div className="flex justify-between py-2 border-b">
                    <span className="text-gray-700">Avg Blocks Per Game:</span>
                    <span className="font-semibold text-black">
                      {(texasTeam.players.reduce((sum, p) => sum + p.stats.blocksPerGame, 0) / texasTeam.players.length).toFixed(1)}
                    </span>
                  </div>
                  <div className="flex justify-between py-2 border-b">
                    <span className="text-gray-700">Avg Minutes Per Game:</span>
                    <span className="font-semibold text-black">
                      {(texasTeam.players.reduce((sum, p) => sum + p.stats.minutesPerGame, 0) / texasTeam.players.length).toFixed(1)}
                    </span>
                  </div>
                  <div className="flex justify-between py-2 border-b">
                    <span className="text-gray-700">Avg FG%:</span>
                    <span className="font-semibold text-black">
                      {(texasTeam.players.reduce((sum, p) => sum + p.stats.fieldGoalPercentage, 0) / texasTeam.players.length).toFixed(1)}%
                    </span>
                  </div>
                  <div className="flex justify-between py-2 border-b">
                    <span className="text-gray-700">Avg 3PT%:</span>
                    <span className="font-semibold text-black">
                      {(texasTeam.players.reduce((sum, p) => sum + p.stats.threePointPercentage, 0) / texasTeam.players.length).toFixed(1)}%
                    </span>
                  </div>
                  <div className="flex justify-between py-2 border-b">
                    <span className="text-gray-700">Avg FT%:</span>
                    <span className="font-semibold text-black">
                      {(texasTeam.players.reduce((sum, p) => sum + p.stats.freeThrowPercentage, 0) / texasTeam.players.length).toFixed(1)}%
                    </span>
                  </div>
                  <div className="flex justify-between py-2 border-b">
                    <span className="text-gray-700">Avg FGA Per Game:</span>
                    <span className="font-semibold text-black">
                      {(texasTeam.players.reduce((sum, p) => sum + (p.stats.fieldGoalAttemptsPerGame ?? 0), 0) / texasTeam.players.length).toFixed(1)}
                    </span>
                  </div>
                  <div className="flex justify-between py-2 border-b">
                    <span className="text-gray-700">Avg 2PTA Per Game:</span>
                    <span className="font-semibold text-black">
                      {(texasTeam.players.reduce((sum, p) => sum + (p.stats.twoPointAttemptsPerGame ?? 0), 0) / texasTeam.players.length).toFixed(1)}
                    </span>
                  </div>
                  <div className="flex justify-between py-2 border-b">
                    <span className="text-gray-700">Avg 3PTA Per Game:</span>
                    <span className="font-semibold text-black">
                      {(texasTeam.players.reduce((sum, p) => sum + (p.stats.threePointAttemptsPerGame ?? 0), 0) / texasTeam.players.length).toFixed(1)}
                    </span>
                  </div>
                  <div className="flex justify-between py-2 border-b">
                    <span className="text-gray-700">Avg FTA Per Game:</span>
                    <span className="font-semibold text-black">
                      {(texasTeam.players.reduce((sum, p) => sum + (p.stats.freeThrowAttemptsPerGame ?? 0), 0) / texasTeam.players.length).toFixed(1)}
                    </span>
                  </div>
                  <div className="flex justify-between py-2 border-b">
                    <span className="text-gray-700">Avg OREB Per Game:</span>
                    <span className="font-semibold text-black">
                      {(texasTeam.players.reduce((sum, p) => sum + (p.stats.offensiveReboundsPerGame ?? 0), 0) / texasTeam.players.length).toFixed(1)}
                    </span>
                  </div>
                  <div className="flex justify-between py-2 border-b">
                    <span className="text-gray-700">Avg DREB Per Game:</span>
                    <span className="font-semibold text-black">
                      {(texasTeam.players.reduce((sum, p) => sum + (p.stats.defensiveReboundsPerGame ?? 0), 0) / texasTeam.players.length).toFixed(1)}
                    </span>
                  </div>
                  <div className="flex justify-between py-2 border-b">
                    <span className="text-gray-700">Avg Turnovers Per Game:</span>
                    <span className="font-semibold text-black">
                      {(texasTeam.players.reduce((sum, p) => sum + p.stats.turnoversPerGame, 0) / texasTeam.players.length).toFixed(1)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

