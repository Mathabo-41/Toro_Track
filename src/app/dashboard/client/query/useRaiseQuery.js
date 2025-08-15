import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { fetchQueries, createQuery } from './raiseQueryService';
import { useClientStore } from '../common/clientStore';

export const useRaiseQuery = () => {
  // Local UI State: for managing which query detail view is open
  const [activeQuery, setActiveQuery] = useState(null);
  const [fileToUpload, setFileToUpload] = useState(null);

  // Global Client State: access actions from the Zustand store
  const showNotification = useClientStore((state) => state.showNotification);

  // React Query Client: to invalidate queries and trigger refetches
  const queryClient = useQueryClient();

  // Form State: manage form inputs, validation, and submission
  const {
    register,
    handleSubmit,
    reset,
    control, // Needed for Material UI's <Select> component
    formState: { errors },
  } = useForm();

  // Server State (Fetching): useQuery to get the list of queries
  const {
    data: queries,
    isLoading: isLoadingQueries,
    error: queriesError,
  } = useQuery({
    queryKey: ['queries'], // Unique key for this query
    queryFn: fetchQueries, // The function that fetches the data
  });

  // Server State (Mutation): useMutation for creating a new query
  const {
    mutate: submitQuery,
    isPending: isSubmittingQuery,
  } = useMutation({
    mutationFn: createQuery, // The function that performs the mutation
    onSuccess: () => {
      // When the mutation is successful:
      queryClient.invalidateQueries(['queries']); // Refetch the queries list
      reset(); // Clear the form fields
      setFileToUpload(null); // Clear the file input
      showNotification('Query submitted successfully!', 'success');
    },
    onError: (error) => {
      // When there's an error:
      showNotification(`Error: ${error.message}`, 'error');
    },
  });

  // --- Handlers ---
  const handleFormSubmit = (formData) => {
    // Attach the file to the form data before submitting
    submitQuery({ ...formData, attachment: fileToUpload?.file });
  };

  const handleFileChange = (e) => {
    if (e.target.files.length > 0) {
      const file = e.target.files[0];
      setFileToUpload({
        file: file, // Keep the actual file object for uploading
        name: file.name,
        size: `${(file.size / (1024 * 1024)).toFixed(1)} MB`,
      });
    }
  };

  const handleRemoveFile = () => {
    // Also clear the file input field in the form
    const fileInput = document.querySelector('input[type="file"]');
    if (fileInput) fileInput.value = '';
    setFileToUpload(null);
  };

  const handleViewQuery = (query) => {
    setActiveQuery(query);
  };

  const handleCloseQueryView = () => {
    setActiveQuery(null);
  };


  // --- Return everything the UI component needs ---
  return {
    // State
    activeQuery,
    queries: queries || [], // Default to an empty array
    isLoadingQueries,
    queriesError,
    isSubmittingQuery,
    fileToUpload,
    errors,
    control,

    // Handlers
    handleViewQuery,
    handleCloseQueryView,
    handleSubmit: handleSubmit(handleFormSubmit), // Wrapped submission handler
    register,
    handleFileChange,
    handleRemoveFile,
  };
};