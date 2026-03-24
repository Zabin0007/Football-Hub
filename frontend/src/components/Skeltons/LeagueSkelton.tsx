import MatchCardSkelton from "./MatchCardSkelton";

export default function LeagueSkelton() {
    return (
        <div className="mb-10 animate-pulse">
            {/* league Header */}
            <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 bg-gray-700 rounded"/>
                <div className="h-5 w-40 bg-gray-700 rounded"/>
            </div>
            {/* Matches */}
            <div className="flex flex-col gap-3">
                <MatchCardSkelton/>
                <MatchCardSkelton/>
                <MatchCardSkelton/>
            </div>
        </div>
    )
}