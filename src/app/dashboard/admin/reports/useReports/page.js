// features/admin/PerformanceReports/useReports.js

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import * as svc from '../reportsService/page';

export function useReports() {
  const qc = useQueryClient();

  // Fetch key metrics
  const {
    data: metrics = {},
    isLoading: metricsLoading,
    error: metricsError
  } = useQuery('reports:metrics', svc.getMetrics);

  // Fetch recent activities
  const {
    data: activities = [],
    isLoading: activitiesLoading,
    error: activitiesError
  } = useQuery('reports:activities', svc.getActivities);

  // Export mutation
  const exportMutation = useMutation(svc.exportReport, {
    onSuccess: (blob, format) => {
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `report.${format}`;
      a.click();
      URL.revokeObjectURL(url);
    }
  });

  return {
    metrics,
    metricsLoading,
    metricsError,
    activities,
    activitiesLoading,
    activitiesError,
    exportReport: exportMutation.mutate,
    exporting: exportMutation.isLoading
  };
}
