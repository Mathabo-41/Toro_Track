// Contains all the logic and instructions for this feature. We can also display error messages to the user interface from this file.
'use client';

import { useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { create } from 'zustand';
import { getAssetStatusDocData } from '../assetStatusDocService/page';

const useAssetStatusDocStore = create((set) => ({
  search: "",
  setSearch: (value) => set({ search: value }),
}));

const useAssetStatusDoc = () => {
  const { search, setSearch } = useAssetStatusDocStore();

  const { data, isLoading, error } = useQuery({
    queryKey: ['assetStatusDocData'],
    queryFn: getAssetStatusDocData,
  });

  const filteredStatusData = useMemo(() => {
    if (!data || !data.statusData) return [];
    const lowercasedSearch = search.toLowerCase();
    return data.statusData.filter(item =>
      (item.asset && item.asset.toLowerCase().includes(lowercasedSearch)) ||
      (item.status && item.status.toLowerCase().includes(lowercasedSearch)) ||
      (item.orderId && item.orderId.toLowerCase().includes(lowercasedSearch))
    );
  }, [search, data]);

  const filteredDocumentsData = useMemo(() => {
    if (!data || !data.documentsData) return [];
    const lowercasedSearch = search.toLowerCase();
    return data.documentsData.filter(doc =>
      (doc.name && doc.name.toLowerCase().includes(lowercasedSearch)) ||
      (doc.type && doc.type.toLowerCase().includes(lowercasedSearch))
    );
  }, [search, data]);

  const filteredClientInfo = useMemo(() => {
    if (!data || !data.clientInfo) return [];
    const lowercasedSearch = search.toLowerCase();
    return data.clientInfo.filter(info =>
      (info.orderId && info.orderId.toLowerCase().includes(lowercasedSearch)) ||
      (info.receiver && info.receiver.toLowerCase().includes(lowercasedSearch))
    );
  }, [search, data]);

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  return {
    state: {
      search,
      isLoading,
      error,
      filteredStatusData,
      filteredDocumentsData,
      filteredClientInfo,
    },
    handlers: { handleSearchChange },
    data: data ? { userInfo: data.userInfo } : { userInfo: { name: '', role: '' } },
  };
};

export default useAssetStatusDoc;