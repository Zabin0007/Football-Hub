"use client"

import MatchChat from "@/src/components/Chat/MatchChat"
import Events from "@/src/components/MatchPage/Events"
import Lineup from "@/src/components/MatchPage/MatchLineup/Lineup"
import Scoreboard from "@/src/components/MatchPage/ScoreBoard"
import Stats from "@/src/components/MatchPage/Stats"
import Tabs from "@/src/components/MatchPage/Tabs"
import MatchPageSkelton from "@/src/components/Skeltons/MatchPageSkelton"
import { getMatchById, getMatchEvents, getMatchLineups, getMatchStats } from "@/src/services/matchServices"
import { ApiMAtchDetail } from "@/src/types/apiMatchDetail"
import { Match } from "@/src/types/match"
import { transformMatch } from "@/src/utils/transformMatch"
import { socket } from "@/src/utils/socket"
import Link from "next/link"
import { useParams } from "next/navigation"
import { useEffect, useRef, useState } from "react"
import { FaArrowLeftLong } from "react-icons/fa6"
import TabContentSkeleton from "@/src/components/Skeltons/TabContentSkelton"
import LineupSkeleton from "@/src/components/Skeltons/LineupSkelton"

export default function MatchPage() {
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const [activeTab, setActiveTab] = useState("stats")
  const [match, setMatch] = useState<Match | null>(null)
  const [loading, setLoading] = useState(true)
  const [notification, setNotification] = useState<string | null>(null)
  const [tabData, setTabData] = useState<any>({
    stats: null,
    events: null,
    lineups: null
  })
  const [tabLoading, setTabLoading] = useState(false)
  const params = useParams()
  const matchId = params.id as string


  const loadTabData = async (tab: string) => {
    try {
      const isLive = match?.status !== "finished"

      // ✅ If NOT live → use cache
      if (!isLive && tabData[tab]) {
        console.log("Using cached (FT match)")
        return
      }
      setTabLoading(true)

      let data: any

      if (tab === "events") {
        data = await getMatchEvents(matchId)
      } else if (tab === "stats") {
        data = await getMatchStats(matchId)
      } else if (tab === "lineups") {
        data = await getMatchLineups(matchId)
      }

      setTabData((prev: any) => ({
        ...prev,
        [tab]: data
      }))

    } catch (err) {
      console.log(err)
    } finally {
      setTabLoading(false)
    }
  }

  //  Fetch match
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

        setMatch(transformMatch(data))

      } catch (error) {
        console.log(error)
      } finally {
        setLoading(false)
      }
    }

    if (matchId) fetchMatch()
  }, [matchId])

  // matchUpdate
  useEffect(() => {
    if (!matchId) return

    socket.connect()
    socket.emit("joinMatch", matchId)

    const handleMatchUpdate = (event: any) => {
      console.log("Live update:", event)
      
      setMatch((prev) => {
        if (!prev) return prev

        if (event.type === "goal") {
          audioRef.current?.play().catch(() => {
            console.log("AutoPlay Blocked");
          })
          setNotification(
            `⚽ GOAL! ${prev.teamA} ${event.scoreA} - ${event.scoreB} ${prev.teamB} (${event.minute}')`
          )
        }

        switch (event.type) {
          case "goal":
            return {
              ...prev,
              scoreA: event.scoreA ?? prev.scoreA,
              scoreB: event.scoreB ?? prev.scoreB,
              minute: event.minute ?? prev.minute
            }

          case "minute":
            return {
              ...prev,
              minute: event.minute ?? prev.minute
            }

          case "status":
            return {
              ...prev,
              status: event.status
            }

          default:
            return prev
        }
      })
    }

    socket.on("matchUpdate", handleMatchUpdate)

    return () => {
      socket.off("matchUpdate", handleMatchUpdate)
      socket.disconnect()
    }

  }, [matchId])

  //toastify
  useEffect(() => {
    if (!notification) return
    const timer = setTimeout(() => setNotification(null), 3000)
    return () => clearTimeout(timer)
  }, [notification])

  if (loading) return <MatchPageSkelton />

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <div className="md:mx-45 py-25 mx-5">
        <audio ref={audioRef} src='/sound/goal.mp3' preload="auto" />
        {/* PopUp Notification */}
        {notification && (
          <div className="fixed top-5 right-5 bg-green-600 px-5 py-3 rounded-lg shadow-lg z-50">
            {notification}
          </div>
        )}

        <div className="mb-5">
          <Link href={'/'} className="flex items-center gap-2 text-lg text-gray-500 hover:text-white">
            <FaArrowLeftLong />
            Back
          </Link>
        </div>

        {match && <Scoreboard match={match} />}

        <div className="mt-6">
          <Tabs activeTab={activeTab} setActiveTab={(tab: any) => {
            setActiveTab(tab)
            loadTabData(tab)
          }} />
        </div>

        <div className="mt-6">
          {tabLoading && activeTab === "stats" && <TabContentSkeleton />}
          {tabLoading && activeTab === "events" && <TabContentSkeleton />}
          {tabLoading && activeTab === "lineups" && <LineupSkeleton />}

          {!tabLoading && activeTab === "stats" && <Stats data={tabData.stats} />}
          {!tabLoading && activeTab === "events" && <Events data={tabData.events} />}
          {!tabLoading && activeTab === "lineups" && <Lineup data={tabData.lineups} />}
        </div>

      </div>
    </div>
  )
}