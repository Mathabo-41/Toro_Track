// Contains all the logic and instructions for this feature. We can also display error messages to the user interface from this file.
'use client';

import { useState, useMemo } from 'react';
import { auditTrailMenu, auditTrailData } from '../audit-trailService/page';

// Fetch and store data from the database
const useAuditTrail = () => {
  const [search, setSearch] = useState("");
  const currentPath = '/dashboard/auditor/audit-trail';

  const handleSearchChange = (event) => {
    setSearch(event.target.value);
  };
 
  const filteredRows = useMemo(() => {
    if (!auditTrailData) {
      return [];
    }
    return auditTrailData.filter((row) =>
      row.orderId.toLowerCase().includes(search.toLowerCase())
    );
  }, [search, auditTrailData]);
  

  return {
    auditTrailMenu,
    filteredRows,
    search,
    handleSearchChange,
    currentPath,
  };
};
// manage state and logic for this screen
export default useAuditTrail;