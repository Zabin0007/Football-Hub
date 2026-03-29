"use client"

import MatchChat from "@/src/components/Chat/MatchChat"
import Events from "@/src/components/MatchPage/Events"
import Lineup from "@/src/components/MatchPage/MatchLineup/Lineup"
import Scoreboard from "@/src/components/MatchPage/ScoreBoard"
import Stats from "@/src/components/MatchPage/Stats"
import Tabs from "@/src/components/MatchPage/Tabs"
import MatchPageSkelton from "@/src/components/Skeltons/MatchPageSkelton"
import TabContentSkeleton from "@/src/components/Skeltons/TabContentSkelton"
import LineupSkeleton from "@/src/components/Skeltons/LineupSkelton"
import { transformMatch } from "@/src/utils/transformMatch"
import { socket } from "@/src/utils/socket"
import Link from "next/link"
import { useParams } from "next/navigation"
import { useEffect, useRef, useState } from "react"
import { FaArrowLeftLong } from "react-icons/fa6"
import { useQueryClient } from "react-query"
import { useMatchById } from "@/src/hooks/useMatchById"
import { useMatchEvents } from "@/src/hooks/useMatchEvents"
import { useMatchStats } from "@/src/hooks/useMatchStats"
import { useMatchLineups } from "@/src/hooks/useMatchLineups"
import { log } from "node:console"

export default function MatchPage() {
  const audioRef = useRef<HTMLAudioElement | null>(null)

  const [activeTab, setActiveTab] = useState("stats")
  const [notification, setNotification] = useState<string | null>(null)
  const [isSocketConnected, setIsSocketConnected] = useState(false)
  const params = useParams()
  const matchId = params.id as string

  const queryClient = useQueryClient()

  // MATCH DATA
  const { data: matchData, isLoading } = useMatchById(matchId)
  const match = matchData ? transformMatch(matchData) : null

  //  TAB DATA (lazy loading)
  const {
    data: events,
    isLoading: eventsLoading
  } = useMatchEvents(matchId, activeTab === "events")

  const {
    data: stats,
    isLoading: statsLoading
  } = useMatchStats(matchId, activeTab === "stats")

  const {
    data: lineups,
    isLoading: lineupsLoading
  } = useMatchLineups(matchId, activeTab === "lineups")

  //  SOCKET + REALTIME UPDATE
  useEffect(() => {
    if (!matchId) return

    socket.connect()
    socket.emit("joinMatch", matchId)

    // reconnect support
    socket.on("connect", () => {
      console.log('Socket connected');
      setIsSocketConnected(true)
      socket.emit("joinMatch", matchId)
    })

    socket.on("disconnect", () => {
      console.log("Socket disconnected")
      setIsSocketConnected(false)
    })

    const handleMatchUpdate = (event: any) => {
      console.log("Live update:", event)

      //  Update match cache directly
      queryClient.setQueryData(["match", matchId], (oldData: any) => {
        if (!oldData) return oldData

        const updated = { ...oldData }

        // GOAL
        if (event.type === "goal") {
          audioRef.current?.play().catch(() => { })

          setNotification(
            `⚽ GOAL! ${updated.teams.home.name} ${event.scoreA} - ${event.scoreB} ${updated.teams.away.name} (${event.minute}')`
          )

          updated.goals.home = event.scoreA ?? updated.goals.home
          updated.goals.away = event.scoreB ?? updated.goals.away
          updated.fixture.status.elapsed =
            event.minute ?? updated.fixture.status.elapsed

        }

        //  MINUTE
        if (event.type === "minute") {
          updated.fixture.status.elapsed =
            event.minute ?? updated.fixture.status.elapsed
        }

        //  STATUS (HT / FT)
        if (event.type === "status") {
          updated.fixture.status.short = event.status
        }

        return updated
      })
    }

    socket.on("matchUpdate", handleMatchUpdate)

    return () => {
      socket.off("matchUpdate", handleMatchUpdate)
      socket.off("connect")
      socket.off('disconnect')
      socket.disconnect()
    }
  }, [matchId])

  //polling fallback
  useEffect(()=>{
    if(isSocketConnected) return
    console.log('Fallback Polling active');
    const interval = setInterval(() => {
        queryClient.invalidateQueries({queryKey:['match',matchId]})
    }, 30000);
    return ()=>clearInterval(interval)
  },[isSocketConnected, matchId])

  // toastify  auto-hide
  useEffect(() => {
    if (!notification) return
    const timer = setTimeout(() => setNotification(null), 3000)
    return () => clearTimeout(timer)
  }, [notification])

  // ⏳ Loading
  if (isLoading) return <MatchPageSkelton />

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <div className="md:mx-45 py-25 mx-5">

        <audio ref={audioRef} src='/sound/goal.mp3' preload="auto" />

        {/* Toastify Notification */}
        {notification && (
          <div className="fixed top-5 right-5 bg-green-600 px-5 py-3 rounded-lg shadow-lg z-50">
            {notification}
          </div>
        )}

        {/*  Back */}
        <div className="mb-5">
          <Link href={'/'} className="flex items-center gap-2 text-lg text-gray-500 hover:text-white">
            <FaArrowLeftLong />
            Back
          </Link>
        </div>

        {/*  Scoreboard */}
        {match && <Scoreboard match={match} />}

        {/*  Tabs */}
        <div className="mt-6">
          <Tabs activeTab={activeTab} setActiveTab={setActiveTab} />
        </div>

        {/*  Tab Content */}
        <div className="mt-6">

          {activeTab === "stats" && (
            statsLoading
              ? <TabContentSkeleton />
              : <Stats data={stats} />
          )}

          {activeTab === "events" && (
            eventsLoading
              ? <TabContentSkeleton />
              : <Events data={events} />
          )}

          {activeTab === "lineups" && (
            lineupsLoading
              ? <LineupSkeleton />
              : <Lineup data={lineups} />
          )}

          {activeTab === "chat" && (
            <MatchChat matchId={matchId} />
          )}

        </div>

      </div>
    </div>
  )
}