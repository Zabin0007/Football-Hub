export type Match = {
  id: number
  teamA: string
  teamB: string
  status: "live" | "finished" | "upcoming"
  scoreA: string
  scoreB: string
  minute: string
  time: string
}