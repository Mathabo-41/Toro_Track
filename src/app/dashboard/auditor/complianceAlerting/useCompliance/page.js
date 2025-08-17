// Contains all the logic and instructions for this feature. We can also display error messages to the user interface from this file.
'use client';

import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { create } from 'zustand';
import { fetchComplianceFeatures } from '../complianceService/page';


// manage state and logic for this screen
export function useCompliance() {
  const [search, setSearch] = useState('');
  const currentPath = '/dashboard/auditor/complianceAlerting';

  // React Query for fetching server state (hardcode data for now)
  const { data: features, isLoading, isError } = useQuery({
    queryKey: ['complianceFeatures'],
    queryFn: fetchComplianceFeatures,
  });

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  // Filter features based on search query
  const filteredFeatures = features
    ? features.filter(
        (feature) =>
          feature.title.toLowerCase().includes(search.toLowerCase()) ||
          feature.description.toLowerCase().includes(search.toLowerCase())
      )
    : [];

  return {
    filteredFeatures,
    search,
    handleSearchChange,
    currentPath,
    isLoading,
    isError,
  };
}