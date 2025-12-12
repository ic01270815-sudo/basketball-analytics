'use client';

import { Team } from '@/types/basketball';

interface PlayerStatsTableProps {
  yourTeam: Team;
  texasTeam: Team;
}

export default function PlayerStatsTable({ yourTeam, texasTeam }: PlayerStatsTableProps) {
  return (
    <div className="space-y-6">
      {/* Your Team Players */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-800">{yourTeam.name} - Player Statistics</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-3 py-3 text-left text-xs font-medium text-gray-700 uppercase sticky left-0 bg-gray-50 z-10">Name</th>
                <th className="px-3 py-3 text-left text-xs font-medium text-gray-700 uppercase">Pos</th>
                <th className="px-3 py-3 text-left text-xs font-medium text-gray-700 uppercase">MINS</th>
                <th className="px-3 py-3 text-left text-xs font-medium text-gray-700 uppercase">PPG</th>
                <th className="px-3 py-3 text-left text-xs font-medium text-gray-700 uppercase">RPG</th>
                <th className="px-3 py-3 text-left text-xs font-medium text-gray-700 uppercase">OREB</th>
                <th className="px-3 py-3 text-left text-xs font-medium text-gray-700 uppercase">DREB</th>
                <th className="px-3 py-3 text-left text-xs font-medium text-gray-700 uppercase">APG</th>
                <th className="px-3 py-3 text-left text-xs font-medium text-gray-700 uppercase">SPG</th>
                <th className="px-3 py-3 text-left text-xs font-medium text-gray-700 uppercase">BPG</th>
                <th className="px-3 py-3 text-left text-xs font-medium text-gray-700 uppercase">TO</th>
                <th className="px-3 py-3 text-left text-xs font-medium text-gray-700 uppercase">FGA</th>
                <th className="px-3 py-3 text-left text-xs font-medium text-gray-700 uppercase">FG%</th>
                <th className="px-3 py-3 text-left text-xs font-medium text-gray-700 uppercase">2FGA</th>
                <th className="px-3 py-3 text-left text-xs font-medium text-gray-700 uppercase">2FG%</th>
                <th className="px-3 py-3 text-left text-xs font-medium text-gray-700 uppercase">3FGA</th>
                <th className="px-3 py-3 text-left text-xs font-medium text-gray-700 uppercase">3FG%</th>
                <th className="px-3 py-3 text-left text-xs font-medium text-gray-700 uppercase">FTA</th>
                <th className="px-3 py-3 text-left text-xs font-medium text-gray-700 uppercase">FT%</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {yourTeam.players.map((player) => (
                <tr key={player.id}>
                  <td className="px-3 py-3 whitespace-nowrap text-sm font-medium text-gray-900 sticky left-0 bg-white z-10">
                    {player.name}
                  </td>
                  <td className="px-3 py-3 whitespace-nowrap text-sm text-gray-700">{player.position}</td>
                  <td className="px-3 py-3 whitespace-nowrap text-sm text-gray-700">
                    {player.stats.minutesPerGame.toFixed(1)}
                  </td>
                  <td className="px-3 py-3 whitespace-nowrap text-sm text-gray-700">
                    {player.stats.pointsPerGame.toFixed(1)}
                  </td>
                  <td className="px-3 py-3 whitespace-nowrap text-sm text-gray-700">
                    {player.stats.reboundsPerGame.toFixed(1)}
                  </td>
                  <td className="px-3 py-3 whitespace-nowrap text-sm text-gray-700">
                    {(player.stats.offensiveReboundsPerGame ?? 0).toFixed(1)}
                  </td>
                  <td className="px-3 py-3 whitespace-nowrap text-sm text-gray-700">
                    {(player.stats.defensiveReboundsPerGame ?? 0).toFixed(1)}
                  </td>
                  <td className="px-3 py-3 whitespace-nowrap text-sm text-gray-700">
                    {player.stats.assistsPerGame.toFixed(1)}
                  </td>
                  <td className="px-3 py-3 whitespace-nowrap text-sm text-gray-700">
                    {player.stats.stealsPerGame.toFixed(1)}
                  </td>
                  <td className="px-3 py-3 whitespace-nowrap text-sm text-gray-700">
                    {player.stats.blocksPerGame.toFixed(1)}
                  </td>
                  <td className="px-3 py-3 whitespace-nowrap text-sm text-gray-700">
                    {player.stats.turnoversPerGame.toFixed(1)}
                  </td>
                  <td className="px-3 py-3 whitespace-nowrap text-sm text-gray-700">
                    {(player.stats.fieldGoalAttemptsPerGame ?? 0).toFixed(1)}
                  </td>
                  <td className="px-3 py-3 whitespace-nowrap text-sm text-gray-700">
                    {player.stats.fieldGoalPercentage.toFixed(1)}%
                  </td>
                  <td className="px-3 py-3 whitespace-nowrap text-sm text-gray-700">
                    {(player.stats.twoPointAttemptsPerGame ?? 0).toFixed(1)}
                  </td>
                  <td className="px-3 py-3 whitespace-nowrap text-sm text-gray-700">
                    {(player.stats.twoPointPercentage ?? 0).toFixed(1)}%
                  </td>
                  <td className="px-3 py-3 whitespace-nowrap text-sm text-gray-700">
                    {(player.stats.threePointAttemptsPerGame ?? 0).toFixed(1)}
                  </td>
                  <td className="px-3 py-3 whitespace-nowrap text-sm text-gray-700">
                    {player.stats.threePointPercentage.toFixed(1)}%
                  </td>
                  <td className="px-3 py-3 whitespace-nowrap text-sm text-gray-700">
                    {(player.stats.freeThrowAttemptsPerGame ?? 0).toFixed(1)}
                  </td>
                  <td className="px-3 py-3 whitespace-nowrap text-sm text-gray-700">
                    {player.stats.freeThrowPercentage.toFixed(1)}%
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Texas Team Players */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-800">{texasTeam.name} - Player Statistics</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-3 py-3 text-left text-xs font-medium text-gray-700 uppercase sticky left-0 bg-gray-50 z-10">Name</th>
                <th className="px-3 py-3 text-left text-xs font-medium text-gray-700 uppercase">Pos</th>
                <th className="px-3 py-3 text-left text-xs font-medium text-gray-700 uppercase">MINS</th>
                <th className="px-3 py-3 text-left text-xs font-medium text-gray-700 uppercase">PPG</th>
                <th className="px-3 py-3 text-left text-xs font-medium text-gray-700 uppercase">RPG</th>
                <th className="px-3 py-3 text-left text-xs font-medium text-gray-700 uppercase">OREB</th>
                <th className="px-3 py-3 text-left text-xs font-medium text-gray-700 uppercase">DREB</th>
                <th className="px-3 py-3 text-left text-xs font-medium text-gray-700 uppercase">APG</th>
                <th className="px-3 py-3 text-left text-xs font-medium text-gray-700 uppercase">SPG</th>
                <th className="px-3 py-3 text-left text-xs font-medium text-gray-700 uppercase">BPG</th>
                <th className="px-3 py-3 text-left text-xs font-medium text-gray-700 uppercase">TO</th>
                <th className="px-3 py-3 text-left text-xs font-medium text-gray-700 uppercase">FGA</th>
                <th className="px-3 py-3 text-left text-xs font-medium text-gray-700 uppercase">FG%</th>
                <th className="px-3 py-3 text-left text-xs font-medium text-gray-700 uppercase">2FGA</th>
                <th className="px-3 py-3 text-left text-xs font-medium text-gray-700 uppercase">2FG%</th>
                <th className="px-3 py-3 text-left text-xs font-medium text-gray-700 uppercase">3FGA</th>
                <th className="px-3 py-3 text-left text-xs font-medium text-gray-700 uppercase">3FG%</th>
                <th className="px-3 py-3 text-left text-xs font-medium text-gray-700 uppercase">FTA</th>
                <th className="px-3 py-3 text-left text-xs font-medium text-gray-700 uppercase">FT%</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {texasTeam.players.map((player) => (
                <tr key={player.id}>
                  <td className="px-3 py-3 whitespace-nowrap text-sm font-medium text-gray-900 sticky left-0 bg-white z-10">
                    {player.name}
                  </td>
                  <td className="px-3 py-3 whitespace-nowrap text-sm text-gray-700">{player.position}</td>
                  <td className="px-3 py-3 whitespace-nowrap text-sm text-gray-700">
                    {player.stats.minutesPerGame.toFixed(1)}
                  </td>
                  <td className="px-3 py-3 whitespace-nowrap text-sm text-gray-700">
                    {player.stats.pointsPerGame.toFixed(1)}
                  </td>
                  <td className="px-3 py-3 whitespace-nowrap text-sm text-gray-700">
                    {player.stats.reboundsPerGame.toFixed(1)}
                  </td>
                  <td className="px-3 py-3 whitespace-nowrap text-sm text-gray-700">
                    {(player.stats.offensiveReboundsPerGame ?? 0).toFixed(1)}
                  </td>
                  <td className="px-3 py-3 whitespace-nowrap text-sm text-gray-700">
                    {(player.stats.defensiveReboundsPerGame ?? 0).toFixed(1)}
                  </td>
                  <td className="px-3 py-3 whitespace-nowrap text-sm text-gray-700">
                    {player.stats.assistsPerGame.toFixed(1)}
                  </td>
                  <td className="px-3 py-3 whitespace-nowrap text-sm text-gray-700">
                    {player.stats.stealsPerGame.toFixed(1)}
                  </td>
                  <td className="px-3 py-3 whitespace-nowrap text-sm text-gray-700">
                    {player.stats.blocksPerGame.toFixed(1)}
                  </td>
                  <td className="px-3 py-3 whitespace-nowrap text-sm text-gray-700">
                    {player.stats.turnoversPerGame.toFixed(1)}
                  </td>
                  <td className="px-3 py-3 whitespace-nowrap text-sm text-gray-700">
                    {(player.stats.fieldGoalAttemptsPerGame ?? 0).toFixed(1)}
                  </td>
                  <td className="px-3 py-3 whitespace-nowrap text-sm text-gray-700">
                    {player.stats.fieldGoalPercentage.toFixed(1)}%
                  </td>
                  <td className="px-3 py-3 whitespace-nowrap text-sm text-gray-700">
                    {(player.stats.twoPointAttemptsPerGame ?? 0).toFixed(1)}
                  </td>
                  <td className="px-3 py-3 whitespace-nowrap text-sm text-gray-700">
                    {(player.stats.twoPointPercentage ?? 0).toFixed(1)}%
                  </td>
                  <td className="px-3 py-3 whitespace-nowrap text-sm text-gray-700">
                    {(player.stats.threePointAttemptsPerGame ?? 0).toFixed(1)}
                  </td>
                  <td className="px-3 py-3 whitespace-nowrap text-sm text-gray-700">
                    {player.stats.threePointPercentage.toFixed(1)}%
                  </td>
                  <td className="px-3 py-3 whitespace-nowrap text-sm text-gray-700">
                    {(player.stats.freeThrowAttemptsPerGame ?? 0).toFixed(1)}
                  </td>
                  <td className="px-3 py-3 whitespace-nowrap text-sm text-gray-700">
                    {player.stats.freeThrowPercentage.toFixed(1)}%
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

