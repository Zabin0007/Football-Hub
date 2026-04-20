import { useMutation, useQueryClient } from "react-query"
import { subscribeToMatch, unsubscribeFromMatch } from "../services/matchServices"

export const useSubscribeMutation = (matchId: string) => {
  const queryClient = useQueryClient()

  const subscribeMutation = useMutation({
    mutationFn: () => subscribeToMatch(matchId),
    onSuccess: () => {
      queryClient.invalidateQueries(["subscription", matchId])
    },
    onError: (error) => {
      console.error("Subscribe failed:", error)
    }
  })

  const unsubscribeMutation = useMutation({
    mutationFn: () => unsubscribeFromMatch(matchId),
    onSuccess: () => {
      queryClient.invalidateQueries(["subscription", matchId])
    },
    onError: (error) => {
      console.error("Unsubscribe failed:", error)
    }
  })

  return { subscribeMutation, unsubscribeMutation }
}
