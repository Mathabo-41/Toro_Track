import { useQuery } from 'react-query'
import { fetchAuditTrail } from './auditTrailService'

export function useAuditTrail() {
  return useQuery('auditor:auditTrail', fetchAuditTrail, {
    staleTime: 5 * 60 * 1000
  })
}
