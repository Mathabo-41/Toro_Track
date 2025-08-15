import { useQuery } from 'react-query'
import { fetchComplianceFeatures } from './complianceService'

export function useCompliance() {
  return useQuery('auditor:compliance', fetchComplianceFeatures, {
    staleTime: 5 * 60 * 1000
  })
}
