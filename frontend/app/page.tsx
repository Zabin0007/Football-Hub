"use client"

import MatchCard from "@/src/components/MatchCard";
import MatchFilterTabs from "@/src/components/MatchFilterTabs";
import { Match } from "@/src/types/match";
import { useState } from "react";

export default function Home() {
  const matches : Match[] = [
     {
    id: 1,
    teamA: "RMA",
    teamB: "CHE",
    time: "20:30",
    status: "live",
    minute: "69",
    scoreA: "1",
    scoreB: "0"
  },
  {
    id: 2,
    teamA: "MCI",
    teamB: "ARS",
    time: "22:30",
    status: "upcoming",
    minute: "0",
    scoreA: "0",
    scoreB: "0"
  },
  {
    id: 3,
    teamA: "FCB",
    teamB: "PSG",
    time: "FT",
    status: "finished",
    minute: "90",
    scoreA: "1",
    scoreB: "0"
  }
  ];

  const [filter,setFilter] = useState('all')
  const filteredMatches = filter === 'all' ? matches : matches.filter((item) => item.status === filter)
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="md:mx-45 py-25 mx-5">
        
        {/* Page Header */}
        <div className="mb-6 sm:mb-8 lg:mb-10">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-2">
            Today's Matches
          </h2>
          <p className="text-gray-600 dark:text-gray-400 text-sm sm:text-base">
            Don't miss out on today's exciting football matches
          </p>
        </div>
        <MatchFilterTabs filter = {filter} setFilter={setFilter}/>
        {/* Matches Grid */}
        <div className="flex flex-col gap-3">
          {filteredMatches.map((item) => (
            <MatchCard
              key={item.id}
              match={item}
            />
          ))}
        </div>

        {/* Empty State for when no matches */}
        {matches.length === 0 && (
          <div className="text-center py-12 sm:py-16">
            <div className="text-6xl sm:text-8xl mb-4">⚽</div>
            <h3 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white mb-2">
              No matches today
            </h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm sm:text-base">
              Check back tomorrow for upcoming matches
            </p>
          </div>
        )}

      </div>
    </div>
  );
}