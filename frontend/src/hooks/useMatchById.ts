import { useQuery } from "react-query"
import { getMatchById } from "../services/matchServices"

export const useMatchById = (matchId:string) => {
    return useQuery({
        queryKey:['match',matchId],
        queryFn:()=> getMatchById(matchId),
        enabled: !!matchId,
        refetchInterval: 1000 * 10, // Refetch every 10 seconds for live updates
        refetchOnWindowFocus: true
    })
}