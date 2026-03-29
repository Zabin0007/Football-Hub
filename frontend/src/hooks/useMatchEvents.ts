import { useQuery } from "react-query"
import { getMatchEvents } from "../services/matchServices"

export const useMatchEvents = (matchId: string, enabled: boolean) => {
    return useQuery({
        queryKey:['events',matchId],
        queryFn: ()=> getMatchEvents(matchId),
        enabled,
        staleTime: 1000 * 60 * 5
    })
}