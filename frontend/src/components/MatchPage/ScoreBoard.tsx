import { Match } from "@/src/types/match";
import Image from "next/image";

export default function Scoreboard({ match }: { match:Match }) {

    return (
        <div className="bg-gray-900 border border-gray-800 rounded-xl p-4 sm:p-6">
          <div className="flex items-center justify-center gap-2 sm:gap-3 mb-4 text-gray-400 text-xs sm:text-base flex-wrap">

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
            <div className="flex items-center justify-between md:mx-15 gap-2 sm:gap-4">
                <div className="flex flex-col items-center flex-1 min-w-0">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center mb-2">
                        {match.logoA ? (
                            <Image 
                                src={match.logoA} 
                                alt={match.teamA}
                                width={48}
                                height={48}
                                className="object-contain"
                            />
                        ) : (
                            <span className="text-2xl sm:text-3xl">⚽</span>
                        )}
                    </div>
                    <span className="text-sm sm:text-lg font-semibold tracking-wide text-center truncate">{match.teamA}</span>
                </div>
                <div className="text-2xl sm:text-4xl font-bold flex-shrink-0">
                    {match.scoreA} - {match.scoreB}
                </div>
                <div className="flex flex-col items-center flex-1 min-w-0">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center mb-2">
                        {match.logoB ? (
                            <Image 
                                src={match.logoB} 
                                alt={match.teamB}
                                width={48}
                                height={48}
                                className="object-contain"
                            />
                        ) : (
                            <span className="text-2xl sm:text-3xl">⚽</span>
                        )}
                    </div>
                    <span className="text-sm sm:text-lg font-semibold tracking-wide text-center truncate">{match.teamB}</span>
                </div>
            </div>
        </div>
    )

}
