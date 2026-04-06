import { useQuery } from "react-query"
import api from "../api/axios"

export const useSubscriptionStatus = (matchId : string) => {
    return useQuery({
        queryKey: ['subscription', matchId],
        queryFn: async()=>{
            const res = await api.get(`/subscription-status/${matchId}`)
            return res.data
        },
        enabled: !!matchId
    })
}