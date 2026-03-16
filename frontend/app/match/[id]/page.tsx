"use client"

import Events from "@/src/components/MatchPage/Events"
import Lineup from "@/src/components/MatchPage/MatchLineup/Lineup"
import Scoreboard from "@/src/components/MatchPage/ScoreBoard"
import Stats from "@/src/components/MatchPage/Stats"
import Tabs from "@/src/components/MatchPage/Tabs"
import Link from "next/link"
import { useState } from "react"
import { FaArrowLeftLong } from "react-icons/fa6";
export default function MatchPage() {

const [activeTab, setActiveTab] = useState("stats")

const match = {
teamA: "Arsenal",
teamB: "Chelsea",
scoreA: 2,
scoreB: 1,
minute: 67,
league: "Premier League"
}

return (
<div className="min-h-screen bg-gray-950 text-white">
<div className="md:mx-45 py-25 mx-5">
 <div className="mb-5">
        <Link href={'/'} className="flex items-center gap-2 text-lg text-gray-500 hover:text-white">
        <FaArrowLeftLong/>
                Back
        </Link>
</div>

{/* Scoreboard */}
<Scoreboard match={match} /> 

{/* Tabs */}
<div className="mt-6">
        <Tabs activeTab={activeTab} setActiveTab={setActiveTab} />
</div>

{/* Tab Content */}
<div className="mt-6">
{activeTab === "stats" && <Stats />}
{activeTab === "events" && <Events/>}
{activeTab === "lineups" && <Lineup/>}
</div>
</div>
</div>
)

}