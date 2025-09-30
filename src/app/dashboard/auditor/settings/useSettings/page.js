// Contains all the logic and instructions for this feature. We can also display error messages to the user interface from this file.
'use client';

import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { create } from 'zustand';
import { fetchSettings, updateSettings } from '../settingsService/page';

/**
 * Zustand Store for global state.
 */
const useSettingsStore = create(() => ({
  auditTrailMenu: [
    { name: 'Audit Trail', path: '/dashboard/auditor/audit-trail' },
    { name: 'License Configuration Tracking', path: '/dashboard/auditor/licenseConfig' },
    { name: 'Asset Status Documentation', path: '/dashboard/auditor/assetStatusDoc' },
    { name: 'Reporting & Export', path: '/dashboard/auditor/reportingExport' },
    { name: 'Compliance & Alerting', path: '/dashboard/auditor/complianceAlerting' },
    { name: 'Settings', path: '/dashboard/auditor/settings' }
  ],
}));

/**
 * manage state and logic for this screen
 */
export function useSettings() {
  const queryClient = useQueryClient();
  const { auditTrailMenu } = useSettingsStore();
  const [search, setSearch] = useState('');
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const currentPath = '/dashboard/auditor/settings';

  // Use React Query to fetch initial settings data
  const { data: settingsData, isLoading } = useQuery({
    queryKey: ['auditorSettings'],
    queryFn: fetchSettings,
  });

  // Use React Hook Form with the default values from the fetched data
  const methods = useForm({
    defaultValues: settingsData,
  });
  const { reset } = methods;

  // Sync form state with fetched data
  useEffect(() => {
    if (settingsData) {
      reset(settingsData);
    }
  }, [settingsData, reset]);

  // Use React Query's useMutation for form submission
  const saveMutation = useMutation({
    mutationFn: updateSettings,
    onSuccess: () => {
      // Invalidate the query to refetch fresh data or update cache
      queryClient.invalidateQueries({ queryKey: ['auditorSettings'] });
      console.log("Settings updated successfully!");
    },
  });

  const onSubmit = (data) => {
    console.log('Form data to be saved:', data);
    saveMutation.mutate(data);
  };

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  return {
    auditTrailMenu,
    search,
    handleSearchChange,
    currentPath,
    methods,
    handleSubmit: methods.handleSubmit,
    onSubmit,
    isLoading,
    isSubmitting: saveMutation.isPending,
  };
}