// complianceAlerting/useCompliance/page.js
'use client';

import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchActiveAlerts, fetchSecurityChecks, exportComplianceReport } from '../complianceService/page';

export function useCompliance() {
  const [search, setSearch] = useState('');
  const currentPath = '/dashboard/auditor/complianceAlerting';

  const { data: alerts, isLoading, isError } = useQuery({
    queryKey: ['activeAlerts'],
    queryFn: fetchActiveAlerts,
    refetchInterval: 30000,
  });

  const { data: securityChecks = [] } = useQuery({
    queryKey: ['securityChecks'],
    queryFn: fetchSecurityChecks,
  });

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  const handleExport = () => {
    exportComplianceReport();
  };

  const filteredAlerts = alerts
    ? alerts.filter(
        (alert) =>
          alert.client.toLowerCase().includes(search.toLowerCase()) ||
          alert.details.toLowerCase().includes(search.toLowerCase()) ||
          alert.severity.toLowerCase().includes(search.toLowerCase()) ||
          alert.status.toLowerCase().includes(search.toLowerCase()) ||
          alert.assignedTo.toLowerCase().includes(search.toLowerCase())
      )
    : [];

  return {
    filteredAlerts,
    securityChecks,
    search,
    handleSearchChange,
    handleExport,
    currentPath,
    isLoading,
    isError,
  };
}