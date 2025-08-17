// Contains all the logic and instructions for this feature. We can also display error messages to the user interface from this file.

'use client';

import { useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { create } from 'zustand';
import { getAssetStatusDocData } from '../assetStatusDocService/page';

// Zustand Store for search state
const useAssetStatusDocStore = create((set) => ({
  search: "",
  setSearch: (value) => set({ search: value }),
}));

const useAssetStatusDoc = () => {
  // Use zustand store for search state
  const { search, setSearch } = useAssetStatusDocStore();
  const currentPath = '/dashboard/auditor/assetStatusDoc';

  // Use React Query to fetch data
  const { data, isLoading, error } = useQuery({
    queryKey: ['assetStatusDocData'],
    queryFn: getAssetStatusDocData,
  });

  // Memoized filtered data
  const filteredStatusData = useMemo(() => {
    if (isLoading || error) return [];
    return data.statusData.filter(item =>
      item.asset.toLowerCase().includes(search.toLowerCase()) ||
      item.status.toLowerCase().includes(search.toLowerCase())
    );
  }, [search, data, isLoading, error]);

  const filteredDocumentsData = useMemo(() => {
    if (isLoading || error) return [];
    return data.documentsData.filter(doc =>
      doc.toLowerCase().includes(search.toLowerCase())
    );
  }, [search, data, isLoading, error]);

  const filteredSignatures = useMemo(() => {
    if (isLoading || error) return [];
    return data.digitalSignatures.filter(sig =>
      sig.client.toLowerCase().includes(search.toLowerCase()) ||
      sig.status.toLowerCase().includes(search.toLowerCase())
    );
  }, [search, data, isLoading, error]);

  // Handler for search input
  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  return {
    state: {
      search,
      currentPath,
      isLoading,
      error,
      filteredStatusData,
      filteredDocumentsData,
      filteredSignatures,
    },
    handlers: {
      handleSearchChange,
    },
    data: data ? {
      auditTrailMenu: data.auditTrailMenu,
      userInfo: data.userInfo,
    } : { auditTrailMenu: [], userInfo: { name: '', role: '' } },
  };
};

// manage state and logic for this screen
export default useAssetStatusDoc;