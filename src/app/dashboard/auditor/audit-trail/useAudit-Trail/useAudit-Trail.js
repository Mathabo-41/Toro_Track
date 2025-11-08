// Contains all the logic and instructions for this feature. We can also display error messages to the UI from this file.
'use client';

import { useState, useMemo } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { 
    auditTrailMenu, 
    getAuditTrailData, 
    createAuditLogEntry,
    updateAuditLogEntry,
    deleteAuditLogEntry,
    uploadDocument,
    addDocumentRecord
} from '../audit-trailService/service';

// Manage state and logic for the audit trail screen
const useAuditTrail = () => {
    const queryClient = useQueryClient();
    const [search, setSearch] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingLog, setEditingLog] = useState(null);
    const [feedback, setFeedback] = useState({ open: false, message: '', severity: 'success' });

    /*
    * Fetch data using useQuery.
    * This replaces the useEffect and useState for 'logs'.
    */
    const { data: logs, isLoading: isLoadingLogs } = useQuery({
        queryKey: ['auditTrailData'],
        queryFn: getAuditTrailData,
    });

    const handleSearchChange = (event) => {
        setSearch(event.target.value);
    };
 
    /*
    * Filter log data based on search input.
    */
    const filteredRows = useMemo(() => {
        if (!logs) {
          return [];
        }
        return logs.filter((row) =>
          row.orderId.toLowerCase().includes(search.toLowerCase())
        );
    }, [search, logs]);
    
    /*
    * Modal state handlers.
    */
    const handleOpenModal = (log = null) => {
        setEditingLog(log);
        setIsModalOpen(true);
    };
    const handleCloseModal = () => {
        setEditingLog(null);
        setIsModalOpen(false);
    };

    // Helper to invalidate cache and show feedback
    const onMutationSuccess = (message) => {
        queryClient.invalidateQueries({ queryKey: ['auditTrailData'] });
        setFeedback({ open: true, message, severity: 'success' });
        handleCloseModal();
    };

    const onMutationError = (message) => {
        setFeedback({ open: true, message, severity: 'error' });
    };

    /*
    * Mutation for creating a new log entry.
    */
    const addLogMutation = useMutation({
        mutationFn: createAuditLogEntry,
        onSuccess: () => onMutationSuccess('Log entry added successfully!'),
        onError: () => onMutationError('Failed to add log entry.'),
    });

    /*
    * Mutation for updating an existing log entry.
    */
    const editLogMutation = useMutation({
        mutationFn: updateAuditLogEntry,
        onSuccess: () => onMutationSuccess('Log entry updated successfully!'),
        onError: () => onMutationError('Failed to update log entry.'),
    });

    /*
    * Mutation for deleting a log entry.
    */
    const deleteLogMutation = useMutation({
        mutationFn: deleteAuditLogEntry,
        onSuccess: () => onMutationSuccess('Log entry deleted.'),
        onError: () => onMutationError('Failed to delete log entry.'),
    });

    /*
    * Mutation for handling the entire document upload flow.
    */
    const uploadDocumentMutation = useMutation({
        mutationFn: async ({ logId, file }) => {
            if (!file) throw new Error('No file provided.');
            
            setFeedback({ open: true, message: 'Uploading document...', severity: 'info' });
            const filePath = await uploadDocument(file);

            if (filePath) {
                const docData = {
                    name: file.name,
                    url: filePath,
                    type: file.type.split('/')[1].toUpperCase() // e.g., 'pdf', 'png'
                };
                const record = await addDocumentRecord(logId, docData);
                if (record) {
                    return 'Document attached successfully!';
                } else {
                    throw new Error('Failed to record the document.');
                }
            } else {
                throw new Error('File upload failed.');
            }
        },
        onSuccess: (message) => onMutationSuccess(message),
        onError: (err) => onMutationError(err.message),
    });


    // Public handlers that call the mutations
    const addLogEntry = (newLogData) => addLogMutation.mutate(newLogData);
    const editLogEntry = (updatedLogData) => editLogMutation.mutate(updatedLogData);
    const removeLogEntry = (logId) => deleteLogMutation.mutate(logId);
    const handleDocumentUpload = (logId, file) => uploadDocumentMutation.mutate({ logId, file });

    const handleCloseFeedback = () => {
        setFeedback({ ...feedback, open: false });
    };

    return {
        auditTrailMenu,
        filteredRows,
        search,
        handleSearchChange,
        isModalOpen,
        editingLog,
        handleOpenModal,
        handleCloseModal,
        addLogEntry,
        editLogEntry,
        removeLogEntry,
        handleDocumentUpload,
        feedback,
        handleCloseFeedback,
        isLoadingLogs, // Expose loading state
    };
};

export default useAuditTrail;