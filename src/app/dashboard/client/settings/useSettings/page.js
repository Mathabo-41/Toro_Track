import { useQuery, useMutation, useQueryClient } from 'react-query'
import {
  fetchProfile,
  updateProfile,
  updatePassword,
  updateNotifications,
  updatePreferences
} from './settingsService'

export function useProfile() {
  return useQuery('client:profile', fetchProfile)
}

export function useSaveProfile() {
  const qc = useQueryClient()
  return useMutation(updateProfile, {
    onSuccess: () => qc.invalidateQueries('client:profile')
  })
}

export function useSavePassword() {
  return useMutation(updatePassword)
}

export function useSaveNotifications() {
  const qc = useQueryClient()
  return useMutation(updateNotifications, {
    onSuccess: () => qc.invalidateQueries('client:profile')
  })
}

export function useSavePreferences() {
  const qc = useQueryClient()
  return useMutation(updatePreferences, {
    onSuccess: () => qc.invalidateQueries('client:profile')
  })
}
