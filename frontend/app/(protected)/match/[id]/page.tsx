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
import api from "@/src/api/axios"
import Link from "next/link"
import { useParams } from "next/navigation"
import { useEffect, useRef, useState } from "react"
import { FaArrowLeftLong } from "react-icons/fa6"
import { useQueryClient } from "react-query"
import { useMatchById } from "@/src/hooks/useMatchById"
import { useMatchEvents } from "@/src/hooks/useMatchEvents"
import { useMatchStats } from "@/src/hooks/useMatchStats"
import { useMatchLineups } from "@/src/hooks/useMatchLineups"
import { useSubscriptionStatus } from "@/src/hooks/useSubscriptionStatus"

export default function MatchPage() {
  const audioRef = useRef<HTMLAudioElement | null>(null)

  const [activeTab, setActiveTab] = useState("stats")
  const [notification, setNotification] = useState<string | null>(null)
  const [isSocketConnected, setIsSocketConnected] = useState(false)
  const [isNotifying, setIsNotifying] = useState(false)
  const params = useParams()
  const matchId = params.id as string

  const queryClient = useQueryClient()
  const { data, isLoading: subLoading } = useSubscriptionStatus(matchId)
  const { data: matchData, isLoading } = useMatchById(matchId)
  const match = matchData ? transformMatch(matchData) : null

  const handleNotifyToggle = async () => {
    try {
      setIsNotifying(true)

      if (!data?.isSubscribed) {
        await api.post('/subscribe', { matchId })
        setNotification("✓ Subscribed")
      } else {
        await api.post('/unsubscribe', { matchId })
        setNotification("🔕 Unsubscribed")
      }

      queryClient.invalidateQueries(["subscription", matchId])

    } catch {
      setNotification("Error")
    } finally {
      setIsNotifying(false)
    }
  }

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
  useEffect(() => {
    if (isSocketConnected) return
    console.log('Fallback Polling active');
    const interval = setInterval(() => {
      queryClient.invalidateQueries({ queryKey: ['match', matchId] })
    }, 30000);
    return () => clearInterval(interval)
  }, [isSocketConnected, matchId])

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
        <div className="mb-5 flex items-center justify-between">
          <Link href={'/'} className="flex items-center gap-2 text-lg text-gray-500 hover:text-white">
            <FaArrowLeftLong />
            Back
          </Link>
          <button
            onClick={handleNotifyToggle}
            disabled={isNotifying || subLoading}
            className={`flex items-center gap-2 px-6 py-2 rounded-full font-semibold transition ${isNotifying
                ? 'bg-green-500 text-black'
                : 'bg-gray-800  text-gray-500 hover:text-white border border-gray-700 hover:border-green-500'
              } disabled:opacity-50`}
            title="Notify me for this match"
          >
            <span className="text-xl">{data?.isSubscribed ? '🔕' : '🔔'}</span>
            <span> {isNotifying
              ? 'Processing...'
              : data?.isSubscribed
                ? 'Unsubscribe'
                : 'Notify Me'}</span>
            {isNotifying && (
              <span className="w-3 h-3 bg-red-500 rounded-full ml-1 animate-pulse"></span>
            )}
          </button>
        </div>

        {/*  Scoreboard */}
        {match && <Scoreboard match={match} />}

        {/*  Tabs */}
        <div className="mt-6">
          <Tabs activeTab={activeTab} setActiveTab={setActiveTab} matchStatus={match?.status} />
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
            match?.status === "live" ? (
              <MatchChat matchId={matchId} />
            ) : (
              <div className="bg-gray-900 border border-gray-800 rounded-xl p-8 text-center">
                <p className="text-gray-400 text-lg">
                  {match?.status === "upcoming" 
                    ? "Chat will be available when the match starts" 
                    : "This match has finished. Chat is no longer available."}
                </p>
              </div>
            )
          )}

        </div>

      </div>
    </div>
  )
}