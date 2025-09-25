// Contains all the logic and state management for the license configuration feature.
'use client';

import { useState, useEffect, useMemo, useCallback, useRef } from 'react';
import { getDashboardData, getLicenseRegisterByClient, addNewLicense } from '../licenseConfigService/page';

/**
 * Manages all state and handlers for the License Configuration page.
 */
export function useLicenseConfig() {
  const [client, setClient] = useState('all');
  const [clients, setClients] = useState([]);
  const [licenseData, setLicenseData] = useState([]);
  const [licenseRows, setLicenseRows] = useState([]);
  const [renewalData, setRenewalData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isDialogOpen, setDialogOpen] = useState(false);
  const isInitialMount = useRef(true);

  const [newLicense, setNewLicense] = useState({
    licenseName: '',
    licenseKey: '',
    status: 'new',
  });

  /*
  * This function fetches all necessary data for the dashboard from the service.
  */
  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      const { usageData, registerData, renewalsData, clientsData } = await getDashboardData();
      
      setLicenseData(usageData);
      setLicenseRows(registerData);
      setRenewalData(renewalsData);
      setClients(clientsData);
    } catch (err) {
      console.error("Error fetching license data:", JSON.stringify(err, null, 2));
      setError(err.message || 'An unknown error occurred.');
    } finally {
      setLoading(false);
    }
  }, []);

  /*
  * This effect fetches the initial dashboard data when the component first loads.
  */
  useEffect(() => {
    fetchData();
  }, [fetchData]);

  /*
  * Re-fetches the license register when the client filter changes, but not on the initial load.
  */
  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }

    const fetchRegister = async () => {
      try {
        setLoading(true);
        const data = await getLicenseRegisterByClient(client);
        setLicenseRows(data);
      } catch (err) {
        console.error("Error fetching license register:", JSON.stringify(err, null, 2));
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    
    fetchRegister();
  }, [client]);

  const handleClientChange = (event) => {
    setClient(event.target.value);
  };
  
  const handleOpenDialog = () => setDialogOpen(true);
  const handleCloseDialog = () => {
    setDialogOpen(false);
    setNewLicense({ licenseName: '', licenseKey: '', status: 'new' });
  };

  const handleNewLicenseChange = (event) => {
    const { name, value } = event.target;
    setNewLicense(prev => ({ ...prev, [name]: value }));
  };

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

    try {
      await addNewLicense({ ...newLicense, client });
      handleCloseDialog();
      await fetchData(); 
    } catch (err) {
      console.error('Error adding license:', JSON.stringify(err, null, 2));
      setError(err.message);
    }
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