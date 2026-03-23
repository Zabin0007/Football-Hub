"use client"

import LeagueSection from "@/src/components/LeagueSection";
import MatchFilterTabs from "@/src/components/MatchFilterTabs";
import { getTodayMatches } from "@/src/services/matchServices";
import { League } from "@/src/types/league";
import { transformMatches } from "@/src/utils/transformMatches";
import { useEffect, useState } from "react";
export default function Home() {

  const [filter, setFilter] = useState('all')
  const [leagues, setLeagues] = useState<League[]>([]);
  const [loading, setLoading] = useState(true)

  useEffect(()=>{
    const fetchMatches = async() => {
      try {
          const apiData = await getTodayMatches()
          const formattedData = transformMatches(apiData)
          setLeagues(formattedData)
      } catch (error) {
          console.log(error);
      } finally { 
          setLoading(false)
      }
    }

    fetchMatches();
  },[])

  const filteredLeagues = leagues
    .map(league => ({
      ...league,
      matches:
        filter === "all"
          ? league.matches
          : league.matches.filter(match => match.status === filter)
    }))
    .filter((league) => league.matches.length > 0) //return remove leagues with zero matches

    if (loading) {
   return (
    <div className="min-h-screen flex items-center justify-center text-white">
      Loading matches...
    </div>
  );
  } 

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
        <MatchFilterTabs filter={filter} setFilter={setFilter} />
        {/* Matches Grid */}
        <div className="flex flex-col gap-3">
          {filteredLeagues.map((league) => (
            <LeagueSection key={league.id} league={league} />
          ))}
        </div>

        {/* Empty State for when no matches */}
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