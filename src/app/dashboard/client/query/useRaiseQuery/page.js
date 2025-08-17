// Contains all the logic and instructions for this feature. We can also display error messages to the user interface from this file.

import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { create } from 'zustand';
import * as raiseQueryService from '../raiseQueryService/page';

// Zustand Store for UI state (active query, new query form)
const useRaiseQueryStore = create((set) => ({
  activeQuery: null,
  newQuery: {
    title: '',
    category: '',
    description: '',
    attachments: []
  },
  fileToUpload: null,
  setActiveQuery: (query) => set({ activeQuery: query }),
  setNewQuery: (query) => set({ newQuery: query }),
  setFileToUpload: (file) => set({ fileToUpload: file }),
}));

/**
 *  managing the state and logic of the Raise Query screen. It uses Zustand for local UI state and React Query for server state.
 */
export const useRaiseQuery = () => {
  const queryClient = useQueryClient();
  const { activeQuery, newQuery, fileToUpload,
          setActiveQuery, setNewQuery, setFileToUpload } = useRaiseQueryStore();

  // React Query hook for fetching server state (list of queries)
  const { data: queries = [], isLoading: isLoadingQueries } = useQuery({
    queryKey: ['queries'],
    queryFn: raiseQueryService.fetchQueries,
  });

  // React Query mutation for submitting a new query
  const submitQueryMutation = useMutation({
    mutationFn: raiseQueryService.submitQuery,
    onSuccess: () => {
      // Invalidate the queries cache to trigger a refetch
      queryClient.invalidateQueries({ queryKey: ['queries'] });
    },
  });

  // Handlers
  const handleFileChange = (e) => {
    if (e.target.files.length > 0) {
      const file = e.target.files[0];
      setFileToUpload({
        name: file.name,
        size: `${(file.size / (1024 * 1024)).toFixed(1)} MB`
      });
    }
  };

  const handleRemoveFile = () => {
    setFileToUpload(null);
  };

  const handleSubmitQuery = (e) => {
    e.preventDefault();
    // Where we send the form data and file to the database
    submitQueryMutation.mutate({
      ...newQuery,
      attachments: fileToUpload ? [fileToUpload] : [],
      date: new Date().toISOString().slice(0, 10),
      status: 'pending'
    });
    setNewQuery({
      title: '',
      category: '',
      description: '',
      attachments: []
    });
    setFileToUpload(null);
    alert('Query submitted successfully!');
  };

  return {
    activeQuery,
    setActiveQuery,
    newQuery,
    setNewQuery,
    fileToUpload,
    handleFileChange,
    handleRemoveFile,
    handleSubmitQuery,
    queries,
    isLoadingQueries
  };
};