// Contains all the logic and instructions for this feature. We can also display error messages to the user interface from this file.

'use client';

import { useState, useEffect } from 'react';
import * as service from '../profilesService/page';

 //manage state and logic for this screen
export default function useProfiles() {
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedClientId, setSelectedClientId] = useState(null);

  // State for the client profile modal
  const [profileData, setProfileData] = useState(null);
  const [loadingProfile, setLoadingProfile] = useState(false);
  const [errorProfile, setErrorProfile] = useState(null);

  // This is where we fetch data from the database.
  useEffect(() => {
    async function loadClients() {
      try {
        setLoading(true);
        const fetchedClients = await service.fetchClients();
        setClients(fetchedClients);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    }
    loadClients();
  }, []);
  
  // Fetches detailed data for the profile modal.
  const loadClientProfile = async (clientId) => {
    try {
        setLoadingProfile(true);
        setErrorProfile(null);
        const data = await service.fetchClientProfile(clientId);
        setProfileData(data);
    } catch (err) {
        setErrorProfile(err.message);
    } finally {
        setLoadingProfile(false);
    }
  };

  // This is where we send data to the database.
  const handleMenuOpen = (event, clientId) => {
    setAnchorEl(event.currentTarget);
    setSelectedClientId(clientId);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedClientId(null);
  };

  const handleDelete = async () => {
    try {
        await service.deleteClient(selectedClientId);
        setClients(clients.filter((client) => client.id !== selectedClientId));
    } catch (err) {
        // The frontend can display this error via a snackbar
        console.error(err);
    } finally {
        handleMenuClose();
    }
  };

  const handleStatusChange = async (clientId, newPriority) => {
    try {
        await service.updateClientStatus(clientId, newPriority);
        setClients(
          clients.map((client) =>
            client.id === clientId ? { ...client, priority: newPriority } : client
          )
        );
    } catch(err) {
        console.error(err);
    } finally {
        handleMenuClose();
    }
  };

   // This is where we call the data that we are sending anf fetching from the database.
  return {
    clients,
    loading,
    error,
    anchorEl,
    selectedClientId,
    handleMenuOpen,
    handleMenuClose,
    handleDelete,
    handleStatusChange,
    // Expose modal-related state and functions
    profileData,
    loadingProfile,
    errorProfile,
    loadClientProfile,
  };
}