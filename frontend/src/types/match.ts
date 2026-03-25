export type Match = {
  id: number
  teamA: string
  teamB: string
  status: "live" | "finished" | "upcoming"
  scoreA: number
  scoreB: number
  minute?: number
  time?: string
  league: string
}