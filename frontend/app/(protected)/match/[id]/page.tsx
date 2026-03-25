"use client"
import MatchChat from "@/src/components/Chat/MatchChat"
import Events from "@/src/components/MatchPage/Events"
import Lineup from "@/src/components/MatchPage/MatchLineup/Lineup"
import Scoreboard from "@/src/components/MatchPage/ScoreBoard"
import Stats from "@/src/components/MatchPage/Stats"
import Tabs from "@/src/components/MatchPage/Tabs"
import MatchPageSkelton from "@/src/components/Skeltons/MatchPageSkelton"
import { getMatchById } from "@/src/services/matchServices"
import { ApiMAtchDetail } from "@/src/types/apiMatchDetail"
import { Match } from "@/src/types/match"
import { transformMatch } from "@/src/utils/transformMatch"
import Link from "next/link"
import { useParams } from "next/navigation"
import { useEffect, useState } from "react"
import { FaArrowLeftLong } from "react-icons/fa6";
export default function MatchPage() {

        const [activeTab, setActiveTab] = useState("stats")
        const [match, setMatch] = useState<Match | null>(null)
        const params = useParams()
        const [loading, setLoading] = useState(true)
        const matchId = params.id as string
        useEffect(() => {
                const fetchMatch = async () => {
                        try {
                        const data: ApiMAtchDetail = await getMatchById(matchId)
                         if (!data) {
                         const mock = {
                                fixture: { id: 1, status: { short: "LIVE", elapsed: 45 } },
                                 teams: {
                                   home: { name: "Arsenal" },
                                   away: { name: "Chelsea" }
                                         },
                                 goals: { home: 2, away: 1 },
                                 league: { name: "Premier League" }
                                        }
                                setMatch(transformMatch(mock as any))
                                return
                                }
                                const formattedMatch = transformMatch(data)
                                setMatch(formattedMatch)
                        } catch (error) {
                                console.log(error)
                        }finally{
                                setLoading(false)
                        }
                }
                if (matchId) {
                        fetchMatch()
                }
        }, [matchId])
        if (loading) {
                return (
                        <>
                        <MatchPageSkelton />
                        </>
                )
        }
        return (
                <div className="min-h-screen bg-gray-950 text-white">
                        <div className="md:mx-45 py-25 mx-5">
                                <div className="mb-5">
                                        <Link href={'/'} className="flex items-center gap-2 text-lg text-gray-500 hover:text-white">
                                                <FaArrowLeftLong />
                                                Back
                                        </Link>
                                </div>

                                {/* Scoreboard */}
                                {match && <Scoreboard match={match} />}

                                {/* Tabs */}
                                <div className="mt-6">
                                        <Tabs activeTab={activeTab} setActiveTab={setActiveTab} />
                                </div>

                                {/* Tab Content */}
                                <div className="mt-6">
                                        {activeTab === "stats" && <Stats />}
                                        {activeTab === "events" && <Events />}
                                        {activeTab === "lineups" && <Lineup />}
                                        {activeTab === "chat" && <MatchChat matchId={matchId} />}
                                </div>
                        </div>
                </div>
        )

}