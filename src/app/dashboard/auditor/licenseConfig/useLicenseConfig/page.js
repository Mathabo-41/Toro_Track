import { useQuery } from 'react-query'
import { fetchLicenseConfig } from './licenseConfigService'

export function useLicenseConfig(client) {
  return useQuery(['auditor:licenseConfig', client], () => fetchLicenseConfig(client), {
    staleTime: 5 * 60 * 1000
  })
}
