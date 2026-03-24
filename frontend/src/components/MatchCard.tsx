import Link from "next/link";
import { Match } from "../types/match";
export default function MatchCard({ match }: {match : Match}) {
  return (
      <Link href={`/match/${match.id}`}>
            <div className="bg-gray-800 hover:bg-gray-700 border border-gray-700 rounded-xl p-5 transition-all duration-200 cursor-pointer">

                {/* Score Row */}
                <div className="flex items-center justify-between gap-4">

                    {/* Team A */}
                    <div className="flex flex-col items-center gap-2 flex-1">
                        <div className="w-10 h-10  flex items-center justify-center text-3xl">
                            ⚽
                        </div>
                        <span className="text-white text-lg font-semibold tracking-wide">
                            {match.teamA}
                        </span>
                    </div>

                    {/* Score Center */}
                    <div className="flex flex-col items-center gap-1">
                        <div className="flex items-center gap-2">
                            <span className="text-white text-3xl font-bold">{match.scoreA}</span>
                            <span className="text-gray-500 text-lg">-</span>
                            <span className="text-white text-3xl font-bold">{match.scoreB}</span>
                        </div>

                        {/* Status indicator */}
                        {match.status === "live" && match.minute && (
                            <div className="flex items-center gap-1">
                                <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                                <span className="text-red-400 text-md ">{match.minute}'</span>
                            </div>
                        )}
                        {match.status === "finished" && (
                            <span className="text-gray-500 text-md">FT</span>
                        )}
                        {match.status === "upcoming" && (
                            <span className="text-gray-400 text-md">{match.time}</span>
                        )}
                    </div>

                    {/* Team B */}
                    <div className="flex flex-col items-center gap-2 flex-1">
                        <div className="w-10 h-10 rounded-full  flex items-center justify-center text-3xl">
                            ⚽
                        </div>
                        <span className="text-white text-lg font-semibold tracking-wide">
                            {match.teamB}
                        </span>
                    </div>

                </div>
            </div>
        </Link>
  );
}