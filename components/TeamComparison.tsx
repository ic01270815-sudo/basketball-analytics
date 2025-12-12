'use client';

import { Team } from '@/types/basketball';
import { compareTeams } from '@/utils/analytics';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface TeamComparisonProps {
  yourTeam: Team;
  texasTeam: Team;
}

export default function TeamComparison({ yourTeam, texasTeam }: TeamComparisonProps) {
  const comparison = compareTeams(yourTeam, texasTeam);

  const comparisonData = [
    {
      stat: 'Points/Game',
      yourTeam: comparison.pointsPerGame.team1,
      texasTeam: comparison.pointsPerGame.team2,
      difference: comparison.pointsPerGame.difference,
      category: 'Scoring',
    },
    {
      stat: 'Rebounds/Game',
      yourTeam: comparison.reboundsPerGame.team1,
      texasTeam: comparison.reboundsPerGame.team2,
      difference: comparison.reboundsPerGame.difference,
      category: 'Rebounding',
    },
    {
      stat: 'Offensive Rebounds/Game',
      yourTeam: comparison.offensiveReboundsPerGame.team1,
      texasTeam: comparison.offensiveReboundsPerGame.team2,
      difference: comparison.offensiveReboundsPerGame.difference,
      category: 'Rebounding',
    },
    {
      stat: 'Defensive Rebounds/Game',
      yourTeam: comparison.defensiveReboundsPerGame.team1,
      texasTeam: comparison.defensiveReboundsPerGame.team2,
      difference: comparison.defensiveReboundsPerGame.difference,
      category: 'Rebounding',
    },
    {
      stat: 'Assists/Game',
      yourTeam: comparison.assistsPerGame.team1,
      texasTeam: comparison.assistsPerGame.team2,
      difference: comparison.assistsPerGame.difference,
      category: 'Playmaking',
    },
    {
      stat: 'Steals/Game',
      yourTeam: comparison.stealsPerGame.team1,
      texasTeam: comparison.stealsPerGame.team2,
      difference: comparison.stealsPerGame.difference,
      category: 'Defense',
    },
    {
      stat: 'Blocks/Game',
      yourTeam: comparison.blocksPerGame.team1,
      texasTeam: comparison.blocksPerGame.team2,
      difference: comparison.blocksPerGame.difference,
      category: 'Defense',
    },
    {
      stat: 'Turnovers/Game',
      yourTeam: comparison.turnoversPerGame.team1,
      texasTeam: comparison.turnoversPerGame.team2,
      difference: comparison.turnoversPerGame.difference,
      category: 'Ball Control',
    },
    {
      stat: 'FG%',
      yourTeam: comparison.fieldGoalPercentage.team1,
      texasTeam: comparison.fieldGoalPercentage.team2,
      difference: comparison.fieldGoalPercentage.difference,
      category: 'Shooting',
    },
    {
      stat: 'FGA/Game',
      yourTeam: comparison.fieldGoalAttemptsPerGame.team1,
      texasTeam: comparison.fieldGoalAttemptsPerGame.team2,
      difference: comparison.fieldGoalAttemptsPerGame.difference,
      category: 'Shooting',
    },
    {
      stat: '2PT%',
      yourTeam: comparison.twoPointPercentage.team1,
      texasTeam: comparison.twoPointPercentage.team2,
      difference: comparison.twoPointPercentage.difference,
      category: 'Shooting',
    },
    {
      stat: '2PTA/Game',
      yourTeam: comparison.twoPointAttemptsPerGame.team1,
      texasTeam: comparison.twoPointAttemptsPerGame.team2,
      difference: comparison.twoPointAttemptsPerGame.difference,
      category: 'Shooting',
    },
    {
      stat: '3PT%',
      yourTeam: comparison.threePointPercentage.team1,
      texasTeam: comparison.threePointPercentage.team2,
      difference: comparison.threePointPercentage.difference,
      category: 'Shooting',
    },
    {
      stat: '3PTA/Game',
      yourTeam: comparison.threePointAttemptsPerGame.team1,
      texasTeam: comparison.threePointAttemptsPerGame.team2,
      difference: comparison.threePointAttemptsPerGame.difference,
      category: 'Shooting',
    },
    {
      stat: 'FT%',
      yourTeam: comparison.freeThrowPercentage.team1,
      texasTeam: comparison.freeThrowPercentage.team2,
      difference: comparison.freeThrowPercentage.difference,
      category: 'Shooting',
    },
    {
      stat: 'FTA/Game',
      yourTeam: comparison.freeThrowAttemptsPerGame.team1,
      texasTeam: comparison.freeThrowAttemptsPerGame.team2,
      difference: comparison.freeThrowAttemptsPerGame.difference,
      category: 'Shooting',
    },
  ];

  const chartData = comparisonData.map(item => ({
    stat: item.stat,
    category: item.category,
    [yourTeam.name]: item.yourTeam,
    [texasTeam.name]: item.texasTeam,
  }));

  return (
    <div className="space-y-6">
      {/* Win/Loss Comparison */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold mb-4 text-gray-800">Season Record</h3>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-gray-600 mb-1">{yourTeam.name}</p>
            <p className="text-2xl font-bold text-gray-800">
              {comparison.wins.team1}-{yourTeam.teamStats.losses}
            </p>
            <p className="text-sm text-gray-700">
              Win %: {((comparison.wins.team1 / (comparison.wins.team1 + yourTeam.teamStats.losses)) * 100).toFixed(1)}%
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-600 mb-1">{texasTeam.name}</p>
            <p className="text-2xl font-bold text-gray-800">
              {comparison.wins.team2}-{texasTeam.teamStats.losses}
            </p>
            <p className="text-sm text-gray-700">
              Win %: {((comparison.wins.team2 / (comparison.wins.team2 + texasTeam.teamStats.losses)) * 100).toFixed(1)}%
            </p>
          </div>
        </div>
      </div>

      {/* Comparison Charts - Multiple Categories */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Scoring & Shooting */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold mb-4 text-gray-800">Scoring & Shooting</h3>
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={chartData.filter(d => d.category === 'Scoring' || d.category === 'Shooting')} margin={{ top: 5, right: 30, left: 20, bottom: 100 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis 
                dataKey="stat" 
                angle={-45} 
                textAnchor="end" 
                height={100}
                tick={{ fontSize: 11 }}
                interval={0}
              />
              <YAxis 
                domain={[0, 'auto']}
                allowDecimals={false}
                tickCount={6}
                tickFormatter={(value) => {
                  if (value >= 1000) return `${(value / 1000).toFixed(1)}k`;
                  return value.toString();
                }}
              />
              <Tooltip />
              <Legend wrapperStyle={{ paddingTop: '30px' }} />
              <Bar dataKey={yourTeam.name} fill="#9333ea" />
              <Bar dataKey={texasTeam.name} fill="#000000" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Rebounding & Defense */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold mb-4 text-gray-800">Rebounding & Defense</h3>
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={chartData.filter(d => d.category === 'Rebounding' || d.category === 'Defense')} margin={{ top: 5, right: 30, left: 20, bottom: 100 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis 
                dataKey="stat" 
                angle={-45} 
                textAnchor="end" 
                height={100}
                tick={{ fontSize: 11 }}
                interval={0}
              />
              <YAxis 
                domain={[0, 'auto']}
                allowDecimals={false}
                tickCount={6}
                tickFormatter={(value) => {
                  if (value >= 1000) return `${(value / 1000).toFixed(1)}k`;
                  return value.toString();
                }}
              />
              <Tooltip />
              <Legend wrapperStyle={{ paddingTop: '30px' }} />
              <Bar dataKey={yourTeam.name} fill="#9333ea" />
              <Bar dataKey={texasTeam.name} fill="#000000" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Detailed Comparison Table - Grouped by Category */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-800">Complete Statistical Comparison</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                  Category
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                  Statistic
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                  {yourTeam.name}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                  {texasTeam.name}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                  Difference
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {comparisonData.map((item, index) => {
                const showCategory = index === 0 || comparisonData[index - 1].category !== item.category;
                return (
                  <tr key={item.stat} className={showCategory ? 'bg-gray-50' : ''}>
                    {showCategory && (
                      <td rowSpan={comparisonData.filter(d => d.category === item.category).length} 
                          className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900 align-top">
                        {item.category}
                      </td>
                    )}
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {item.stat}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                      {typeof item.yourTeam === 'number' ? item.yourTeam.toFixed(1) : item.yourTeam}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                      {typeof item.texasTeam === 'number' ? item.texasTeam.toFixed(1) : item.texasTeam}
                    </td>
                    <td className={`px-6 py-4 whitespace-nowrap text-sm font-semibold ${
                      item.difference > 0 ? 'text-green-600' : item.difference < 0 ? 'text-red-600' : 'text-gray-600'
                    }`}>
                      {item.difference > 0 ? '+' : ''}
                      {typeof item.difference === 'number' ? item.difference.toFixed(1) : item.difference}
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

