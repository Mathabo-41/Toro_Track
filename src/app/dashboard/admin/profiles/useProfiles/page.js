import { useState, useEffect } from 'react';
import * as service from '../profilesService/page';

export default function useProfiles() {
  const [clients, setClients]           = useState([]);
  const [loading, setLoading]           = useState(false);
  const [error, setError]               = useState(null);
  const [anchorEl, setAnchorEl]         = useState(null);
  const [selectedClientId, setSelected] = useState(null);

  // Load clients on mount
  useEffect(() => {
    setLoading(true);
    service.fetchClients()
      .then(setClients)
      .catch(setError)
      .finally(() => setLoading(false));
  }, []);

  const handleMenuOpen = (event, id) => {
    setAnchorEl(event.currentTarget);
    setSelected(id);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelected(null);
  };

  const handleDelete = async () => {
    if (!selectedClientId) return;
    setLoading(true);
    try {
      await service.deleteClient(selectedClientId);
      setClients((prev) => prev.filter(c => c.id !== selectedClientId));
      handleMenuClose();
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (id, newStatus) => {
    setLoading(true);
    try {
      await service.updateClientStatus(id, newStatus);
      setClients((prev) =>
        prev.map(c => c.id === id ? { ...c, status: newStatus } : c)
      );
      handleMenuClose();
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  return {
    clients,
    loading,
    error,
    anchorEl,
    selectedClientId,
    handleMenuOpen,
    handleMenuClose,
    handleDelete,
    handleStatusChange
  };
}
