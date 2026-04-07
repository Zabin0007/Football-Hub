import Link from "next/link";
import { Match } from "../types/match";
import Image from "next/image";

export default function MatchCard({ match }: {match : Match}) {
  return (
      <Link href={`/match/${match.id}`}>
            <div className="bg-gray-800 hover:border-green-500 hover:bg-gray-700 border border-gray-700 rounded-xl p-3 sm:p-5 transition-all duration-200 cursor-pointer">

                {/* Score Row */}
                <div className="flex items-center justify-between gap-2 sm:gap-4">

                    {/* Team A */}
                    <div className="flex flex-col items-center gap-1 sm:gap-2 flex-1 min-w-0">
                        <div className="w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center flex-shrink-0">
                            {match.logoA ? (
                                <Image 
                                    src={match.logoA} 
                                    alt={match.teamA}
                                    width={40}
                                    height={40}
                                    className="object-contain"
                                />
                            ) : (
                                <span className="text-2xl sm:text-3xl">⚽</span>
                            )}
                        </div>
                        <span className="text-white text-xs sm:text-lg font-semibold tracking-wide truncate">
                            {match.teamA}
                        </span>
                    </div>

                    {/* Score Center */}
                    <div className="flex flex-col items-center gap-0.5 sm:gap-1 flex-shrink-0">
                        <div className="flex items-center gap-1 sm:gap-2">
                            <span className="text-white text-xl sm:text-3xl font-bold">{match.scoreA}</span>
                            <span className="text-gray-500 text-sm sm:text-lg">-</span>
                            <span className="text-white text-xl sm:text-3xl font-bold">{match.scoreB}</span>
                        </div>

                        {/* Status indicator */}
                        {match.status === "live" && match.minute && (
                            <div className="flex items-center gap-1">
                                <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-red-500 rounded-full animate-pulse" />
                                <span className="text-red-400 text-xs sm:text-md">{match.minute}'</span>
                            </div>
                        )}
                        {match.status === "finished" && (
                            <span className="text-gray-500 text-xs sm:text-md">FT</span>
                        )}
                        {match.status === "upcoming" && (
                            <span className="text-gray-400 text-xs sm:text-md">{match.time}</span>
                        )}
                    </div>

                    {/* Team B */}
                    <div className="flex flex-col items-center gap-1 sm:gap-2 flex-1 min-w-0">
                        <div className="w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center flex-shrink-0">
                            {match.logoB ? (
                                <Image 
                                    src={match.logoB} 
                                    alt={match.teamB}
                                    width={40}
                                    height={40}
                                    className="object-contain"
                                />
                            ) : (
                                <span className="text-2xl sm:text-3xl">⚽</span>
                            )}
                        </div>
                        <span className="text-white text-xs sm:text-lg font-semibold tracking-wide truncate">
                            {match.teamB}
                        </span>
                    </div>

                </div>
            </div>
        </Link>
  );
}