// Contains all the logic and instructions for this feature.
'use client';

import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';

// MOCK DATA: Replace with your actual API calls from the service file.
const mockActiveAlerts = [
  { id: 1, severity: 'Critical', client: 'Innovate Corp', details: 'Admin access from unrecognized IP', timestamp: '2025-09-21 15:30', status: 'New', assignedTo: 'Lisa Moloi' },
  { id: 2, severity: 'High', client: 'Tech Solutions Ltd.', details: 'Firewall configuration drift detected', timestamp: '2025-09-21 14:05', status: 'In Progress', assignedTo: 'Thabiso Radebe' },
  { id: 3, severity: 'Low', client: 'Global Exports', details: 'Dormant user account flagged', timestamp: '2025-09-20 11:00', status: 'New', assignedTo: 'Shane Frans' },
  { id: 4, severity: 'Medium', client: 'Innovate Corp', details: 'Cloud backup failed (3rd attempt)', timestamp: '2025-09-21 09:45', status: 'Resolved', assignedTo: 'Lisa Moloi' },
];

const mockSecurityChecks = [
    { title: 'Firewall & VPN Audits', details: 'Last audit: 2025-09-15. Status: OK' },
    { title: 'Access Control', details: '2 excessive admin privileges found.' },
    { title: 'Backup Integrity', details: 'Last verification: 2025-09-21. Success Rate: 99.8%' },
];

// Mock fetch functions
const fetchActiveAlerts = () => new Promise(resolve => setTimeout(() => resolve(mockActiveAlerts), 500));
const fetchSecurityChecks = () => new Promise(resolve => setTimeout(() => resolve(mockSecurityChecks), 500));


// Manage state and logic for this screen
export function useCompliance() {
  const [search, setSearch] = useState('');
  const currentPath = '/dashboard/auditor/complianceAlerting';

  // React Query for fetching active alerts
  const { data: alerts, isLoading, isError } = useQuery({
    queryKey: ['activeAlerts'],
    queryFn: fetchActiveAlerts,
  });

  // React Query for fetching security checks
  const { data: securityChecks = [] } = useQuery({
    queryKey: ['securityChecks'],
    queryFn: fetchSecurityChecks,
  });


  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  // NEW: Placeholder for export functionality
  const handleExport = () => {
    // In a real app, this would trigger a CSV/PDF generation
    alert('Generating report...');
    console.log('Exporting data:', filteredAlerts);
  };

  // MODIFIED: Filter alerts based on search query
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