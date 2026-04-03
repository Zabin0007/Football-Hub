import { useQuery } from "react-query"
import { getMatchStats } from "../services/matchServices"

export const useMatchStats = (matchId: string, enabled: boolean) => {
    return useQuery({
        queryKey: ['stats', matchId],
        queryFn: async () => {
            console.log('🔍 useMatchStats - Fetching stats for match:', matchId)
            const result = await getMatchStats(matchId)
            console.log('🔍 useMatchStats - Received result:', result)
            return result
        },
        enabled,
        onError: (error) => {
            console.error('❌ useMatchStats - Error:', error)
        },
        onSuccess: (data) => {
            console.log('✅ useMatchStats - Success:', data)
        }
    })
}