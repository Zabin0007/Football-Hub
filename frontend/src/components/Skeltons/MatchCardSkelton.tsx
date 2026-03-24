export default function MatchCardSkelton() {
    return (
        <div className="bg-gray-800 border border-gray-700 rounded-xl p-5 animate-pulse">
            <div className="flex items-center justify-between gap-4">
                {/* Team A */}
                <div className="flex flex-col items-center gap-2 flex-1">
                    <div className="w-10 h-10 bg-gray-700 rounded-full" />
                    <div className="h-4 w-20 bg-gray-700 rounded" />
                </div>

                {/* Score */}
                <div className="flex flex-col items-center gap-2">
                    <div className="h-6 w-16 bg-gray-700 rounded" />
                    <div className="h-3 w-10 bg-gray-700 rounded" />
                </div>

                {/* Team B */}
                <div className="flex flex-col items-center gap-2 flex-1">
                    <div className="w-10 h-10 bg-gray-700 rounded-full" />
                    <div className="h-4 w-20 bg-gray-700 rounded" />
                </div>
            </div>
        </div>
    )
}