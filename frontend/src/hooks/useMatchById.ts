import { useQuery } from "react-query"
import { getMatchById } from "../services/matchServices"

export const useMatchById = (matchId:string) => {
    return useQuery({
        queryKey:['match',matchId],
        queryFn:()=> getMatchById(matchId),
        enabled: !!matchId
    })
}