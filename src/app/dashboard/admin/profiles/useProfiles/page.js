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

  // This is where we fetch data from the database.
  useEffect(() => {
    async function fetchClients() {
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

    fetchClients();
  }, []);

  // This is where we will send data to the database.
  const handleMenuOpen = (event, clientId) => {
    setAnchorEl(event.currentTarget);
    setSelectedClientId(clientId);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedClientId(null);
  };

  const handleDelete = () => {
    setClients(clients.filter((client) => client.id !== selectedClientId));
    handleMenuClose();
  };

  const handleStatusChange = (clientId, newPriority) => {
    setClients(
      clients.map((client) =>
        client.id === clientId ? { ...client, priority: newPriority } : client
      )
    );
    handleMenuClose();
  };

   // This is where we call the data that we are sending anf fetching from the database. We call it so that it can be
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
  };
}