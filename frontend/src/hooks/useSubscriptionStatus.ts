import { useQuery } from "react-query"
import api from "../api/axios"
import { useAuth } from "../context/AuthContext"

export const useSubscriptionStatus = (matchId : string) => {
    const { isLoggedIn } = useAuth()
    
    return useQuery({
        queryKey: ['subscription', matchId],
        queryFn: async()=>{
            const res = await api.get(`/subscription-status/${matchId}`)
            return res.data
        },
        enabled: !!matchId && isLoggedIn
    })
}