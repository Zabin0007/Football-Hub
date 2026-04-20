import { useQuery } from "react-query"
import { getTodayMatches } from "../services/matchServices"

export const useTodayMatches = () => {
    return useQuery({
        queryKey: ['todayMatches'],
        queryFn: getTodayMatches,
        staleTime: 1000 * 10, // Data is stale after 10 seconds
        refetchInterval: 1000 * 10, // Refetch every 10 seconds for live updates
        refetchOnWindowFocus: true 
    })
}