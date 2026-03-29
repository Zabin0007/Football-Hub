"use client"

import LeagueSection from "@/src/components/LeagueSection";
import MatchFilterTabs from "@/src/components/MatchFilterTabs";
import HomePageSkeleton from "@/src/components/Skeltons/HomePageSkeleton";
import { League } from "@/src/types/league";
import { transformMatches } from "@/src/utils/transformMatches";
import { useState } from "react";
import { useTodayMatches } from "@/src/hooks/useTodayMatches";

export default function Home() {

  const [filter, setFilter] = useState('all')
  const [search, setSearch] = useState('')

  const { data, isLoading, error } = useTodayMatches()

  const leagues: League[] = data ? transformMatches(data) : []

  const filteredLeagues = leagues
    .map((league) => {
      const filteredMatches = league.matches.filter((match) => {
        const searchLower = search.toLowerCase();

        return (
          league.name.toLowerCase().includes(searchLower) ||
          match.teamA.toLowerCase().includes(searchLower) ||
          match.teamB.toLowerCase().includes(searchLower)
        );
      });

      return {
        ...league,
        matches:
          filter === "all"
            ? filteredMatches
            : filteredMatches.filter((m) => m.status === filter),
      };
    })
    .filter((league) => league.matches.length > 0);

  if (isLoading) {
    return <HomePageSkeleton />
  }

  if (error) {
    return (
      <div className="text-center text-red-500 py-10">
        Failed to load matches
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="md:mx-45 py-25 mx-5">

        {/* Header */}
        <div className="mb-6 sm:mb-8 lg:mb-10">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-2">
            Today's Matches
          </h2>
          <p className="text-gray-600 dark:text-gray-400 text-sm sm:text-base">
            Don't miss out on today's exciting football matches
          </p>
        </div>

        <div className="mb-4">
          <input
            type="text"
            placeholder="Search league (e.g. Premier League)"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full p-3 rounded-lg bg-gray-800 text-white border border-gray-700 focus:outline-none"
          />
        </div>

        <MatchFilterTabs filter={filter} setFilter={setFilter} />

        <div className="flex flex-col gap-3">
          {filteredLeagues.map((league) => (
            <LeagueSection key={league.id} league={league} />
          ))}
        </div>

        {filteredLeagues.length === 0 && (
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