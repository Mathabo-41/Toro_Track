import { useQuery, useMutation, useQueryClient } from 'react-query'
import {
  fetchConversations,
  fetchConversationMessages,
  sendMessage,
  fetchMeetings,
  fetchNotifications
} from './messageService'

export function useConversations() {
  return useQuery('client:conversations', fetchConversations)
}

export function useConversationMessages(convId) {
  return useQuery(['client:messages', convId], () =>
    fetchConversationMessages(convId)
  )
}

export function useSendMessage(convId) {
  const qc = useQueryClient()
  return useMutation((text) => sendMessage(convId, text), {
    onSuccess: () => {
      qc.invalidateQueries(['client:messages', convId])
      qc.invalidateQueries('client:conversations')
    }
  })
}

export function useMeetings() {
  return useQuery('client:meetings', fetchMeetings)
}

export function useNotifications() {
  return useQuery('client:notifications', fetchNotifications)
}
