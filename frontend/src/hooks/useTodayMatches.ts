import { useQuery } from "react-query"
import { getTodayMatches } from "../services/matchServices"

export const useTodayMatches = () => {
    return useQuery({
        queryKey: ['todayMatches'],
        queryFn: getTodayMatches,
        staleTime: 1000 * 60 * 15,
        refetchOnWindowFocus: false
    })
}