import { useQuery } from 'react-query'
import { fetchReportingExportOptions } from './reportingExportService'

export function useReportingExportOptions() {
  return useQuery(
    'auditor:reportingExportOptions',
    fetchReportingExportOptions,
    { staleTime: 5 * 60 * 1000 }
  )
}
