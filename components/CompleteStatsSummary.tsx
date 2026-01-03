'use client';

import { Team } from '@/types/basketball';

interface CompleteStatsSummaryProps {
  yourTeam: Team;
  texasTeam: Team;
}

interface StatItem {
  label: string;
  yourTeam: number;
  texasTeam: number;
  isPercentage?: boolean;
}

export default function CompleteStatsSummary({ yourTeam, texasTeam }: CompleteStatsSummaryProps) {
  const formatStat = (value: number | undefined, isPercentage: boolean = false): string => {
    if (value === undefined || value === null) return 'N/A';
    if (isPercentage) {
      return `${value.toFixed(1)}%`;
    }
    return value.toFixed(1);
  };

  const statsSections: Array<{ title: string; stats: StatItem[] }> = [
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
  ];

  return (
    <div className="space-y-6">
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
          {/* Your Team Player Averages */}
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
    </div>
  );
}

