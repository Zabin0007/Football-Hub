import { useQuery } from "react-query"
import { getMatchLineups } from "../services/matchServices"

export const useMatchLineups = (matchId: string, enabled: boolean) => {
    return useQuery({
        queryKey: ['lineups', matchId],
        queryFn: async () => {
            console.log('🔍 useMatchLineups - Fetching lineups for match:', matchId)
            const result = await getMatchLineups(matchId)
            console.log('🔍 useMatchLineups - Received result:', result)
            return result
        },
        enabled,
        onError: (error) => {
            console.error('❌ useMatchLineups - Error:', error)
        },
        onSuccess: (data) => {
            console.log('✅ useMatchLineups - Success:', data)
        }
    })
}