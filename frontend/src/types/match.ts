export type Match = {
  id: number
  teamA: string
  teamB: string
  logoA?: string
  logoB?: string
  status: "live" | "finished" | "upcoming"
  scoreA: number
  scoreB: number
  minute?: number
  time?: string
  league: string
}