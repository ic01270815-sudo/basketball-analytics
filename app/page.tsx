'use client';

import { useState } from 'react';
import { texasTeam } from '@/data/texasTeam';
import { independenceTeam, independenceRawGameData } from '@/data/independenceData';
import { Team } from '@/types/basketball';
import TeamOverview from '@/components/TeamOverview';
import PlayerStatsTable from '@/components/PlayerStatsTable';
import HomeVsAway from '@/components/HomeVsAway';
import { addDetailedStatsToTeam } from '@/utils/addDetailedStats';

export default function Home() {
  const [activeTab, setActiveTab] = useState<'overview' | 'players' | 'homeaway'>('overview');
  
  // Automatically load Independence team data
  const yourTeam = independenceTeam;

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center gap-4">
            <div className="relative w-16 h-16 flex-shrink-0">
              <img
                src="/independence-logo.svg"
                alt="Independence Knights Logo"
                className="w-full h-full object-contain"
              />
            </div>
            <h1 className="text-3xl font-bold text-gray-900">Independence Girls Varsity Basketball Team Analytics</h1>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Tab Navigation */}
        {yourTeam.players.length > 0 && (
          <div className="mb-6 border-b border-gray-200">
            <nav className="-mb-px flex space-x-8">
              <button
                onClick={() => setActiveTab('overview')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'overview'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-700 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Team Comparison
              </button>
              <button
                onClick={() => setActiveTab('homeaway')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'homeaway'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-700 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Home vs Away
              </button>
              <button
                onClick={() => setActiveTab('players')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'players'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-700 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Player Stats
              </button>
            </nav>
          </div>
        )}

        {/* Tab Content */}
        {yourTeam.players.length > 0 ? (
          <>
            {activeTab === 'overview' && (
              <TeamOverview yourTeam={yourTeam} texasTeam={addDetailedStatsToTeam(texasTeam)} />
            )}
            {activeTab === 'players' && (
              <PlayerStatsTable yourTeam={yourTeam} texasTeam={addDetailedStatsToTeam(texasTeam)} />
            )}
            {activeTab === 'homeaway' && (
              <HomeVsAway yourTeam={yourTeam} rawGameData={independenceRawGameData} />
            )}
          </>
        ) : (
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-yellow-800 mb-2">⚠️ Independence Data Not Found</h3>
            <p className="text-yellow-700 mb-4">
              To see the comparison, please copy your <code className="bg-yellow-100 px-2 py-1 rounded">independence_data.json</code> file to:
            </p>
            <code className="block bg-yellow-100 p-3 rounded text-sm mb-4">
              my-next-app/data/independence_data.json
            </code>
            <p className="text-yellow-700 text-sm">
              Once the file is in place, refresh the page to see your team's data compared to the Texas average team.
            </p>
          </div>
        )}
      </main>
    </div>
  );
}
