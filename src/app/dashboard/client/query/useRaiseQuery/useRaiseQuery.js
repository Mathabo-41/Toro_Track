// Contains all the logic and instructions for this feature. We can also display error messages to the user interface from this file.

import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { create } from 'zustand';
import * as raiseQueryService from '../raiseQueryService/service';

// Zustand Store for UI state (active query, new query form)
const useRaiseQueryStore = create((set) => ({
  activeQuery: null,
  newQuery: {
    title: '',
    category: '',
    description: '',
  },
  fileToUpload: null, // This will now store the File object directly
  setActiveQuery: (query) => set({ activeQuery: query }),
  setNewQuery: (query) => set({ newQuery: query }),
  setFileToUpload: (file) => set({ fileToUpload: file }),
  resetForm: () => set({
    newQuery: { title: '', category: '', description: '' },
    fileToUpload: null
  }),
}));

/**
 * Manages the state and logic of the Raise Query screen.
 * @param {Object} options - Configuration options.
 * @param {Function} options.onSuccess - Callback for successful mutation.
 * @param {Function} options.onError - Callback for failed mutation.
 */
export const useRaiseQuery = ({ onSuccess, onError } = {}) => {
  const queryClient = useQueryClient();
  const { 
    activeQuery, newQuery, fileToUpload,
    setActiveQuery, setNewQuery, setFileToUpload, resetForm
  } = useRaiseQueryStore();

  // React Query hook for fetching server state (list of queries)
  const { data: queries = [], isLoading: isLoadingQueries } = useQuery({
    queryKey: ['queries'],
    queryFn: raiseQueryService.fetchQueries,
  });

  // React Query mutation for submitting a new query
  const submitQueryMutation = useMutation({
    mutationFn: raiseQueryService.submitQuery,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['queries'] });
      resetForm();
      if (onSuccess) {
        onSuccess('Query submitted successfully!');
      }
    },
    onError: (error) => {
      console.error("Mutation Error:", error);
      if (onError) {
        onError(error.message || 'Failed to submit query. Please try again.');
      }
    },
  });

  // Handlers
  const handleFileChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      setFileToUpload(e.target.files[0]);
    }
  };

  const handleRemoveFile = () => {
    setFileToUpload(null);
  };

  const handleSubmitQuery = (e) => {
    e.preventDefault();
    submitQueryMutation.mutate({
      ...newQuery,
      fileToUpload: fileToUpload,
    });
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
    isLoadingQueries,
    isSubmitting: submitQueryMutation.isPending,
  };
};