'use client';

import { Team } from '@/types/basketball';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface TeamOverviewProps {
  yourTeam: Team | null;
  texasTeam: Team;
  showBoth?: boolean;
}

export default function TeamOverview({ yourTeam, texasTeam, showBoth = true }: TeamOverviewProps) {
  const teams = showBoth && yourTeam ? [yourTeam, texasTeam] : [texasTeam];
  
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
      {/* Quick Stats Summary */}
      {yourTeam && (
        <div className="bg-gradient-to-r from-blue-50 to-green-50 rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold mb-4 text-gray-800">Quick Stats Summary</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 text-sm">
            <div>
              <p className="text-gray-600">Your Team PPG</p>
              <p className="text-xl font-bold" style={{ color: '#9333ea' }}>{yourTeam.teamStats.pointsPerGame.toFixed(1)}</p>
            </div>
            <div>
              <p className="text-gray-600">Texas Avg PPG</p>
              <p className="text-xl font-bold text-gray-600">{texasTeam.teamStats.pointsPerGame.toFixed(1)}</p>
            </div>
            <div>
              <p className="text-gray-600">Your Team RPG</p>
              <p className="text-xl font-bold" style={{ color: '#1f2937' }}>{yourTeam.teamStats.reboundsPerGame.toFixed(1)}</p>
            </div>
            <div>
              <p className="text-gray-600">Texas Avg RPG</p>
              <p className="text-xl font-bold text-gray-600">{texasTeam.teamStats.reboundsPerGame.toFixed(1)}</p>
            </div>
            <div>
              <p className="text-gray-600">Your Team FG%</p>
              <p className="text-xl font-bold" style={{ color: '#7c3aed' }}>{yourTeam.teamStats.fieldGoalPercentage.toFixed(1)}%</p>
            </div>
            <div>
              <p className="text-gray-600">Texas Avg FG%</p>
              <p className="text-xl font-bold text-gray-600">{texasTeam.teamStats.fieldGoalPercentage.toFixed(1)}%</p>
            </div>
          </div>
        </div>
      )}

      {/* Team Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {teams.map((team) => (
          <div key={team.id} className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold mb-4 text-gray-800">{team.name}</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Record:</span>
                <span className="font-semibold text-gray-800">
                  {team.teamStats.wins}-{team.teamStats.losses}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Win %:</span>
                <span className="font-semibold text-gray-800">
                  {((team.teamStats.wins / (team.teamStats.wins + team.teamStats.losses)) * 100).toFixed(1)}%
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">PPG:</span>
                <span className="font-semibold text-gray-800">{team.teamStats.pointsPerGame.toFixed(1)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Pts Allowed:</span>
                <span className="font-semibold text-gray-800">{team.teamStats.pointsAllowedPerGame.toFixed(1)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">FG%:</span>
                <span className="font-semibold text-gray-800">{team.teamStats.fieldGoalPercentage.toFixed(1)}%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">2PT%:</span>
                <span className="font-semibold text-gray-800">{(team.teamStats.twoPointPercentage ?? 0).toFixed(1)}%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">3PT%:</span>
                <span className="font-semibold text-gray-800">{team.teamStats.threePointPercentage.toFixed(1)}%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">FT%:</span>
                <span className="font-semibold text-gray-800">{team.teamStats.freeThrowPercentage.toFixed(1)}%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">FGA/Game:</span>
                <span className="font-semibold text-gray-800">{(team.teamStats.fieldGoalAttemptsPerGame ?? 0).toFixed(1)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">OREB/Game:</span>
                <span className="font-semibold text-gray-800">{(team.teamStats.offensiveReboundsPerGame ?? 0).toFixed(1)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">DREB/Game:</span>
                <span className="font-semibold text-gray-800">{(team.teamStats.defensiveReboundsPerGame ?? 0).toFixed(1)}</span>
              </div>
            </div>
          </div>
        ))}
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
              <Tooltip />
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
              <YAxis />
              <Tooltip />
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
              <Tooltip />
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
              <Tooltip />
              <Legend />
              <Bar dataKey="Total REB" fill={hasIndependence ? getTeamColor('Independence', 0) : '#3b82f6'} />
              <Bar dataKey="OREB" fill={hasIndependence ? getTeamColor('Independence', 1) : '#10b981'} />
              <Bar dataKey="DREB" fill={hasIndependence ? getTeamColor('Independence', 2) : '#f59e0b'} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

