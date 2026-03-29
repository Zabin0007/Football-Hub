import { useQuery } from "react-query"
import { getMatchLineups } from "../services/matchServices"

export const useMatchLineups = (matchId: string, enabled: boolean) => {
    return useQuery({
        queryKey: ['lineups', matchId],
        queryFn: () => getMatchLineups(matchId),
        enabled
    })
}