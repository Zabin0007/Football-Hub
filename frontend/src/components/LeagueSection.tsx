import { League } from "../types/league"
import MatchCard from "./MatchCard"

export default function LeagueSection({ league }: { league: League }) {

  return (

    <div className="mb-10">
      {/* League Header */}
      <div className="flex items-center gap-3 mb-4">
        <div className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center">
          🏆
        </div>
        <h3 className="text-xl font-semibold text-white">
          {league.name}
        </h3>
      </div>
    {/* Matches */}
      <div className="flex flex-col gap-3">
        {league.matches.map(match => (
          <MatchCard key={match.id} match={match}/>
        ))}
      </div>
    </div>
  )

}