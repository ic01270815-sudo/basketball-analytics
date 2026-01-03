'use client';

import { useState } from 'react';
import React from 'react';
import { Team, Player } from '@/types/basketball';

interface PlayerStatsTableProps {
  yourTeam: Team;
  texasTeam: Team;
}

interface PlayerAnalysis {
  strengths: Array<{ stat: string; value: number; label: string }>;
  weaknesses: Array<{ stat: string; value: number; label: string }>;
}

export default function PlayerStatsTable({ yourTeam, texasTeam }: PlayerStatsTableProps) {
  const [expandedPlayer, setExpandedPlayer] = useState<string | null>(null);

  // Helper function to get improvement suggestions
  const getImprovementSuggestions = (statName: string): string[] => {
    const suggestionsMap: Record<string, string[]> = {
      'Scoring': [
        'Focus on shot selection and taking higher percentage shots',
        'Work on finishing at the rim and mid-range jumpers',
        'Practice free throws to convert more scoring opportunities'
      ],
      'Rebounding': [
        'Improve positioning and boxing out techniques',
        'Work on timing jumps and reading ball trajectory',
        'Increase effort on both offensive and defensive glass'
      ],
      'Playmaking': [
        'Improve court vision and passing accuracy',
        'Practice making reads and finding open teammates',
        'Work on ball handling to create better passing angles'
      ],
      'Defensive Pressure': [
        'Focus on active hands and defensive positioning',
        'Work on anticipation and reading offensive plays',
        'Improve lateral quickness and defensive footwork'
      ],
      'Rim Protection': [
        'Work on timing and vertical jump for blocks',
        'Improve defensive positioning in the paint',
        'Focus on contesting shots without fouling'
      ],
      'Ball Security': [
        'Reduce turnovers by improving ball handling',
        'Work on decision-making under pressure',
        'Practice passing accuracy and avoiding risky plays'
      ],
      'Field Goal Shooting': [
        'Focus on shot mechanics and form',
        'Work on shot selection and taking better quality shots',
        'Practice shooting from different spots on the court'
      ],
      'Three-Point Shooting': [
        'Increase practice time on three-point shots',
        'Work on consistent shooting form and release',
        'Focus on shot selection and taking open threes'
      ],
      'Free Throw Shooting': [
        'Dedicate more practice time to free throw shooting',
        'Work on consistent form and routine',
        'Practice under pressure situations'
      ],
      'Two-Point Shooting': [
        'Improve finishing at the rim',
        'Work on mid-range jump shot consistency',
        'Focus on shot selection in the paint'
      ],
      'Offensive Rebounding': [
        'Improve positioning and timing on offensive glass',
        'Work on crashing the boards after shots',
        'Focus on reading missed shot trajectories'
      ],
      'Defensive Rebounding': [
        'Improve boxing out techniques',
        'Work on securing rebounds in traffic',
        'Focus on defensive positioning and awareness'
      ],
    };
    return suggestionsMap[statName] || ['Focus on improving this area through dedicated practice'];
  };

  // Calculate team averages for comparison
  const teamAverages = {
    pointsPerGame: yourTeam.players.reduce((sum, p) => sum + p.stats.pointsPerGame, 0) / yourTeam.players.length,
    reboundsPerGame: yourTeam.players.reduce((sum, p) => sum + p.stats.reboundsPerGame, 0) / yourTeam.players.length,
    assistsPerGame: yourTeam.players.reduce((sum, p) => sum + p.stats.assistsPerGame, 0) / yourTeam.players.length,
    stealsPerGame: yourTeam.players.reduce((sum, p) => sum + p.stats.stealsPerGame, 0) / yourTeam.players.length,
    blocksPerGame: yourTeam.players.reduce((sum, p) => sum + p.stats.blocksPerGame, 0) / yourTeam.players.length,
    turnoversPerGame: yourTeam.players.reduce((sum, p) => sum + p.stats.turnoversPerGame, 0) / yourTeam.players.length,
    fieldGoalPercentage: yourTeam.players.reduce((sum, p) => sum + p.stats.fieldGoalPercentage, 0) / yourTeam.players.length,
    threePointPercentage: yourTeam.players.reduce((sum, p) => sum + p.stats.threePointPercentage, 0) / yourTeam.players.length,
    freeThrowPercentage: yourTeam.players.reduce((sum, p) => sum + p.stats.freeThrowPercentage, 0) / yourTeam.players.length,
    twoPointPercentage: yourTeam.players.reduce((sum, p) => sum + (p.stats.twoPointPercentage ?? p.stats.fieldGoalPercentage), 0) / yourTeam.players.length,
    offensiveReboundsPerGame: yourTeam.players.reduce((sum, p) => sum + (p.stats.offensiveReboundsPerGame ?? 0), 0) / yourTeam.players.length,
    defensiveReboundsPerGame: yourTeam.players.reduce((sum, p) => sum + (p.stats.defensiveReboundsPerGame ?? 0), 0) / yourTeam.players.length,
  };

  // Analyze player strengths and weaknesses
  const analyzePlayer = (player: Player): PlayerAnalysis => {
    const strengths: Array<{ stat: string; value: number }> = [];
    const weaknesses: Array<{ stat: string; value: number }> = [];

    // Scoring
    if (player.stats.pointsPerGame > teamAverages.pointsPerGame * 1.1) {
      strengths.push({ stat: 'Scoring', value: player.stats.pointsPerGame });
    } else if (player.stats.pointsPerGame < teamAverages.pointsPerGame * 0.9) {
      weaknesses.push({ stat: 'Scoring', value: player.stats.pointsPerGame });
    }

    // Rebounding
    if (player.stats.reboundsPerGame > teamAverages.reboundsPerGame * 1.1) {
      strengths.push({ stat: 'Rebounding', value: player.stats.reboundsPerGame });
    } else if (player.stats.reboundsPerGame < teamAverages.reboundsPerGame * 0.9) {
      weaknesses.push({ stat: 'Rebounding', value: player.stats.reboundsPerGame });
    }

    // Assists
    if (player.stats.assistsPerGame > teamAverages.assistsPerGame * 1.1) {
      strengths.push({ stat: 'Playmaking', value: player.stats.assistsPerGame });
    } else if (player.stats.assistsPerGame < teamAverages.assistsPerGame * 0.9) {
      weaknesses.push({ stat: 'Playmaking', value: player.stats.assistsPerGame });
    }

    // Steals
    if (player.stats.stealsPerGame > teamAverages.stealsPerGame * 1.1) {
      strengths.push({ stat: 'Defensive Pressure', value: player.stats.stealsPerGame });
    } else if (player.stats.stealsPerGame < teamAverages.stealsPerGame * 0.9) {
      weaknesses.push({ stat: 'Defensive Pressure', value: player.stats.stealsPerGame });
    }

    // Blocks
    if (player.stats.blocksPerGame > teamAverages.blocksPerGame * 1.1) {
      strengths.push({ stat: 'Rim Protection', value: player.stats.blocksPerGame });
    } else if (player.stats.blocksPerGame < teamAverages.blocksPerGame * 0.9 && player.stats.blocksPerGame < 0.5) {
      weaknesses.push({ stat: 'Rim Protection', value: player.stats.blocksPerGame });
    }

    // Turnovers (lower is better)
    if (player.stats.turnoversPerGame < teamAverages.turnoversPerGame * 0.9) {
      strengths.push({ stat: 'Ball Security', value: player.stats.turnoversPerGame });
    } else if (player.stats.turnoversPerGame > teamAverages.turnoversPerGame * 1.1) {
      weaknesses.push({ stat: 'Ball Security', value: player.stats.turnoversPerGame });
    }

    // Field Goal Percentage
    if (player.stats.fieldGoalPercentage > teamAverages.fieldGoalPercentage * 1.05) {
      strengths.push({ stat: 'Field Goal Shooting', value: player.stats.fieldGoalPercentage });
    } else if (player.stats.fieldGoalPercentage < teamAverages.fieldGoalPercentage * 0.95) {
      weaknesses.push({ stat: 'Field Goal Shooting', value: player.stats.fieldGoalPercentage });
    }

    // Three Point Percentage
    if (player.stats.threePointPercentage > teamAverages.threePointPercentage * 1.05 && (player.stats.threePointAttemptsPerGame ?? 0) > 1) {
      strengths.push({ stat: 'Three-Point Shooting', value: player.stats.threePointPercentage });
    } else if (player.stats.threePointPercentage < teamAverages.threePointPercentage * 0.95 && (player.stats.threePointAttemptsPerGame ?? 0) > 1) {
      weaknesses.push({ stat: 'Three-Point Shooting', value: player.stats.threePointPercentage });
    }

    // Free Throw Percentage
    if (player.stats.freeThrowPercentage > teamAverages.freeThrowPercentage * 1.05 && (player.stats.freeThrowAttemptsPerGame ?? 0) > 0.5) {
      strengths.push({ stat: 'Free Throw Shooting', value: player.stats.freeThrowPercentage });
    } else if (player.stats.freeThrowPercentage < teamAverages.freeThrowPercentage * 0.95 && (player.stats.freeThrowAttemptsPerGame ?? 0) > 0.5) {
      weaknesses.push({ stat: 'Free Throw Shooting', value: player.stats.freeThrowPercentage });
    }

    // Two Point Percentage
    const twoPointPct = player.stats.twoPointPercentage ?? player.stats.fieldGoalPercentage;
    if (twoPointPct > teamAverages.twoPointPercentage * 1.05 && (player.stats.twoPointAttemptsPerGame ?? 0) > 1) {
      strengths.push({ stat: 'Two-Point Shooting', value: twoPointPct });
    } else if (twoPointPct < teamAverages.twoPointPercentage * 0.95 && (player.stats.twoPointAttemptsPerGame ?? 0) > 1) {
      weaknesses.push({ stat: 'Two-Point Shooting', value: twoPointPct });
    }

    // Offensive Rebounds
    const oreb = player.stats.offensiveReboundsPerGame ?? 0;
    if (oreb > teamAverages.offensiveReboundsPerGame * 1.2) {
      strengths.push({ stat: 'Offensive Rebounding', value: oreb });
    } else if (oreb < teamAverages.offensiveReboundsPerGame * 0.8 && oreb < 0.5) {
      weaknesses.push({ stat: 'Offensive Rebounding', value: oreb });
    }

    // Defensive Rebounds
    const dreb = player.stats.defensiveReboundsPerGame ?? 0;
    if (dreb > teamAverages.defensiveReboundsPerGame * 1.2) {
      strengths.push({ stat: 'Defensive Rebounding', value: dreb });
    } else if (dreb < teamAverages.defensiveReboundsPerGame * 0.8 && dreb < 1) {
      weaknesses.push({ stat: 'Defensive Rebounding', value: dreb });
    }

    // Helper function to get stat label
    const getStatLabel = (statName: string): string => {
      const statMap: Record<string, string> = {
        'Scoring': 'Points Per Game',
        'Rebounding': 'Rebounds Per Game',
        'Playmaking': 'Assists Per Game',
        'Defensive Pressure': 'Steals Per Game',
        'Rim Protection': 'Blocks Per Game',
        'Ball Security': 'Turnovers Per Game',
        'Field Goal Shooting': 'Field Goal Percentage',
        'Three-Point Shooting': 'Three-Point Percentage',
        'Free Throw Shooting': 'Free Throw Percentage',
        'Two-Point Shooting': 'Two-Point Percentage',
        'Offensive Rebounding': 'Offensive Rebounds Per Game',
        'Defensive Rebounding': 'Defensive Rebounds Per Game',
      };
      return statMap[statName] || statName;
    };


    // Helper function to format stat value
    const formatStatValue = (statName: string, value: number): string => {
      const isPercentage = statName.includes('Shooting') || statName.includes('%');
      if (isPercentage) {
        // Percentages are already stored as 0-100 range (not 0-1), so just format
        return value.toFixed(1) + '%';
      }
      return value.toFixed(1);
    };

    // Sort by value difference and take top 3
    strengths.sort((a, b) => b.value - a.value);
    weaknesses.sort((a, b) => a.value - b.value);

    return {
      strengths: strengths.slice(0, 3).map(s => ({
        stat: s.stat,
        value: s.value,
        label: getStatLabel(s.stat)
      })),
      weaknesses: weaknesses.slice(0, 3).map(w => ({
        stat: w.stat,
        value: w.value,
        label: getStatLabel(w.stat)
      })),
    };
  };

  return (
    <div className="space-y-6">
      {/* Description */}
      <div className="bg-white rounded-lg shadow p-6">
        <p className="text-gray-700 text-base">
          Breakdown of the current players of Independence's Girls Varsity Team
        </p>
      </div>
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
              {yourTeam.players.map((player) => {
                const analysis = analyzePlayer(player);
                const isExpanded = expandedPlayer === player.id;
                
                return (
                  <React.Fragment key={player.id}>
                    <tr 
                      className="hover:bg-gray-50 cursor-pointer"
                      onClick={() => setExpandedPlayer(isExpanded ? null : player.id)}
                    >
                      <td className="px-3 py-3 whitespace-nowrap text-sm font-medium text-gray-900 sticky left-0 bg-white z-10">
                        {player.name}
                      </td>
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
                    {isExpanded && (
                      <tr className="bg-gray-50">
                        <td colSpan={19} className="px-6 py-4">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <h4 className="text-sm font-semibold text-green-700 mb-2">Strengths</h4>
                              <ul className="list-disc list-inside space-y-1">
                                {analysis.strengths.length > 0 ? (
                                  analysis.strengths.map((strength, idx) => {
                                    const isPercentage = strength.stat.includes('Shooting') || strength.stat.includes('%');
                                    const displayValue = isPercentage 
                                      ? strength.value.toFixed(1) + '%'
                                      : strength.value.toFixed(1);
                                    return (
                                      <li key={idx} className="text-sm text-gray-700 mb-2">
                                        {strength.stat}
                                        <ul className="list-disc list-inside ml-6 mt-1">
                                          <li className="text-xs text-gray-600">
                                            {strength.label}: {displayValue}
                                          </li>
                                        </ul>
                                      </li>
                                    );
                                  })
                                ) : (
                                  <li className="text-sm text-gray-500">No significant strengths identified</li>
                                )}
                              </ul>
                            </div>
                            <div>
                              <h4 className="text-sm font-semibold text-red-700 mb-2">Areas for Improvement</h4>
                              <ul className="list-disc list-inside space-y-1">
                                {analysis.weaknesses.length > 0 ? (
                                  analysis.weaknesses.map((weakness, idx) => {
                                    const isPercentage = weakness.stat.includes('Shooting') || weakness.stat.includes('%');
                                    const displayValue = isPercentage 
                                      ? weakness.value.toFixed(1) + '%'
                                      : weakness.value.toFixed(1);
                                    const suggestions = getImprovementSuggestions(weakness.stat);
                                    return (
                                      <li key={idx} className="text-sm text-gray-700 mb-2">
                                        {weakness.stat}
                                        <ul className="list-disc list-inside ml-6 mt-1 space-y-1">
                                          <li className="text-xs text-gray-600">
                                            {weakness.label}: {displayValue}
                                          </li>
                                          {suggestions.map((suggestion, sugIdx) => (
                                            <li key={sugIdx} className="text-xs text-gray-500 italic">
                                              {suggestion}
                                            </li>
                                          ))}
                                        </ul>
                                      </li>
                                    );
                                  })
                                ) : (
                                  <li className="text-sm text-gray-500">No significant weaknesses identified</li>
                                )}
                              </ul>
                            </div>
                          </div>
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

