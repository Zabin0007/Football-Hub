import { Match } from "@/src/types/match";

export default function Scoreboard({ match }: { match:Match }) {

    return (
        <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
          <div className="flex items-center justify-center gap-3 mb-4 text-gray-400">

        <span>⚑ {match.league}</span>
        {match.status === "live" && (
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
            <span className="text-red-400 font-semibold">LIVE</span>
            <span>{match.minute}'</span>
          </div>
        )}
        {match.status === "finished" && (
          <span className="text-gray-500 font-semibold">FT</span>
        )}
        {match.status === "upcoming" && (
          <span className="text-gray-400">{match.time}</span>
        )}

      </div>
            <div className="flex items-center justify-between md:mx-15">
                <div className="flex flex-col items-center text-3xl">
                    ⚽
                    <span className="mt-2 text-lg font-semibold tracking-wide">{match.teamA}</span>
                </div>
                <div className="text-4xl font-bold">
                    {match.scoreA} - {match.scoreB}
                </div>
                <div className="flex flex-col items-center text-3xl">
                    ⚽
                    <span className="mt-2 text-lg font-semibold tracking-wide">{match.teamB}</span>
                </div>
            </div>
        </div>
    )

}
