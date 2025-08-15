// /features/admin/Permissions/usePermissions.js
import { useState, useEffect } from 'react';
import * as service from '../permissionsService/page';

const defaultRoles = [
  /* same defaultRoles array you supplied */
];

export default function usePermissions() {
  const [roles, setRoles]             = useState([]);
  const [selectedRole, setSelected]   = useState('');
  const [loading, setLoading]         = useState(false);
  const [error, setError]             = useState(null);

  // Load roles from server (or fallback to defaults)
  useEffect(() => {
    setLoading(true);
    service.fetchRoles()
      .then((data) => {
        setRoles(data.length ? data : defaultRoles);
        setSelected(data[0]?.name || defaultRoles[0].name);
      })
      .catch(setError)
      .finally(() => setLoading(false));
  }, []);

  const handlePermissionChange = (roleName, category, value) => {
    setRoles((prev) =>
      prev.map((r) =>
        r.name === roleName
          ? {
              ...r,
              permissions: {
                ...r.permissions,
                [category]: value
              }
            }
          : r
      )
    );
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      await service.savePermissions(roles);
      alert('Permissions saved successfully!');
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  return {
    roles,
    selectedRole,
    setSelected,
    loading,
    error,
    handlePermissionChange,
    handleSave
  };
}
