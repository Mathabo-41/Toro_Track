// Contains all the logic and state management for the license configuration feature.
'use client';

import { useState, useMemo, useCallback, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getDashboardData, getLicenseRegisterByClient, addNewLicense } from '../licenseConfigService/service';

/**
 * Manages all state and handlers for the License Configuration page.
 */
export function useLicenseConfig() {
  const queryClient = useQueryClient();
  const [client, setClient] = useState('all');
  const [isDialogOpen, setDialogOpen] = useState(false);
  const [newLicense, setNewLicense] = useState({
    licenseName: '',
    licenseKey: '',
    status: 'new',
  });

  // Fetch all dashboard data using useQuery
  const { data: dashboardData, isLoading: isLoadingDashboard, error: dashboardError } = useQuery({
    queryKey: ['licenseDashboardData'],
    queryFn: getDashboardData,
  });

  // Fetch the client-specific register.
  const { data: registerData, isLoading: isLoadingRegister } = useQuery({
    queryKey: ['licenseRegister', client],
    queryFn: () => getLicenseRegisterByClient(client),
    // We use the dashboard data as initial data for the 'all' state to prevent a double-fetch on load.
    initialData: () => {
      if (client === 'all') {
        return dashboardData?.registerData;
      }
      return undefined;
    },
    // Only re-fetch if the client is not 'all' OR if dashboard data is ready.
    enabled: !!dashboardData,
  });

  // Memoize the derived data
  const clients = useMemo(() => dashboardData?.clientsData || [], [dashboardData]);
  const licenseData = useMemo(() => dashboardData?.usageData || [], [dashboardData]);
  const renewalData = useMemo(() => dashboardData?.renewalsData || [], [dashboardData]);
  const licenseRows = useMemo(() => registerData || [], [registerData]);
  
  // Handle Client Change
  const handleClientChange = (event) => {
    setClient(event.target.value);
  };

  // Dialog Handlers
  const handleOpenDialog = () => setDialogOpen(true);
  const handleCloseDialog = () => {
    setDialogOpen(false);
    setNewLicense({ licenseName: '', licenseKey: '', status: 'new' });
  };

  const handleNewLicenseChange = (event) => {
    const { name, value } = event.target;
    setNewLicense(prev => ({ ...prev, [name]: value }));
  };

  // Mutation for adding a new license
  const addLicenseMutation = useMutation({
    mutationFn: (licenseDetails) => addNewLicense(licenseDetails),
    onSuccess: () => {
      // When mutation is successful, refetch all data to update the UI
      queryClient.invalidateQueries({ queryKey: ['licenseDashboardData'] });
      queryClient.invalidateQueries({ queryKey: ['licenseRegister', client] });
      handleCloseDialog();
    },
    onError: (err) => {
      console.error('Error adding license:', JSON.stringify(err, null, 2));
      alert('Failed to add license. See console for details.');
    }
  });

  /*
  * Saves a new license and then re-fetches all dashboard data to update the UI.
  */
  const handleSaveLicense = async () => {
    if (client === 'all') {
      alert('Please select a specific client from the dropdown before adding a license.');
      return;
    }
    if (!newLicense.licenseName || !newLicense.licenseKey) {
      alert('Please provide both a license name and a license key.');
      return;
    }
    
    addLicenseMutation.mutate({ ...newLicense, client });
  };

  /*
  * Calculates the totals for assigned and purchased licenses.
  */
  const totals = useMemo(() => {
    return licenseData.reduce(
      (acc, cur) => ({
        assigned: acc.assigned + (cur.assigned || 0),
        purchased: acc.purchased + (cur.purchased || 0),
      }),
      { assigned: 0, purchased: 0 }
    );
  }, [licenseData]);

  // Consolidate loading state
  const loading = isLoadingDashboard || isLoadingRegister;
  
  // Consolidate errors
  const error = dashboardError; // Can expand to include registerError

  return {
    client,
    clients,
    handleClientChange,
    licenseData,
    licenseRows,
    renewalData,
    totals,
    loading,
    error,
    isDialogOpen,
    handleOpenDialog,
    handleCloseDialog,
    newLicense,
    handleNewLicenseChange,
    handleSaveLicense,
  };
}