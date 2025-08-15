import { useQuery } from 'react-query'
import { fetchSettings } from './settingsService'

export function useSettings() {
  return useQuery('auditor:settings', fetchSettings, {
    staleTime: 5 * 60 * 1000
  })
}
