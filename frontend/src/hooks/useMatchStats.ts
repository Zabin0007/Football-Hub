import { useQuery } from "react-query"
import { getMatchStats } from "../services/matchServices"

export const useMatchStats = (matchId: string, enabled: boolean) => {
    return useQuery({
        queryKey: ['stats', matchId],
        queryFn: () => getMatchStats(matchId),
        enabled
    })
}