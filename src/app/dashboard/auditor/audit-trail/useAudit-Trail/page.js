// Contains all the logic and instructions for this feature. We can also display error messages to the user interface from this file.
'use client';

import { useState, useMemo, useEffect } from 'react';
import { 
    auditTrailMenu, 
    getAuditTrailData, 
    createAuditLogEntry,
    updateAuditLogEntry,
    deleteAuditLogEntry,
    uploadDocument,
    addDocumentRecord
} from '../audit-trailService/page';

// Manage state and logic for the audit trail screen
const useAuditTrail = () => {
    const [search, setSearch] = useState("");
    const [logs, setLogs] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingLog, setEditingLog] = useState(null);
    const [feedback, setFeedback] = useState({ open: false, message: '', severity: 'success' });

    /*
    * Fetch data when the component mounts.
    */
    useEffect(() => {
        const loadData = async () => {
            const data = await getAuditTrailData();
            setLogs(data);
        };
        loadData();
    }, []);

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

    /*
    * Handles creating a new log entry.
    */
    const addLogEntry = async (newLogData) => {
        const returnedData = await createAuditLogEntry(newLogData);
        if (returnedData) {
            const newFormattedLog = { ...returnedData, timestamp: new Date(returnedData.timestamp).toLocaleString() };
            setLogs(prevLogs => [newFormattedLog, ...prevLogs]);
            setFeedback({ open: true, message: 'Log entry added successfully!', severity: 'success' });
            handleCloseModal();
        } else {
            setFeedback({ open: true, message: 'Failed to add log entry.', severity: 'error' });
        }
    };

    /*
    * Handles updating an existing log entry.
    */
    const editLogEntry = async (updatedLogData) => {
        const returnedData = await updateAuditLogEntry(updatedLogData);
        if (returnedData) {
            const updatedFormattedLog = { ...returnedData, timestamp: new Date(returnedData.timestamp).toLocaleString() };
            setLogs(prevLogs => prevLogs.map(log => log.id === updatedFormattedLog.id ? updatedFormattedLog : log));
            setFeedback({ open: true, message: 'Log entry updated successfully!', severity: 'success' });
            handleCloseModal();
        } else {
            setFeedback({ open: true, message: 'Failed to update log entry.', severity: 'error' });
        }
    };

    /*
    * Handles deleting a log entry.
    */
    const removeLogEntry = async (logId) => {
        const deletedId = await deleteAuditLogEntry(logId);
        if (deletedId) {
            setLogs(prevLogs => prevLogs.filter(log => log.id !== deletedId));
            setFeedback({ open: true, message: 'Log entry deleted.', severity: 'success' });
        } else {
            setFeedback({ open: true, message: 'Failed to delete log entry.', severity: 'error' });
        }
    };

    /*
    * Handles the entire document upload flow.
    */
    const handleDocumentUpload = async (logId, file) => {
        if (!file) return;

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
                setFeedback({ open: true, message: 'Document attached successfully!', severity: 'success' });
            } else {
                setFeedback({ open: true, message: 'Failed to record the document.', severity: 'error' });
            }
        } else {
            setFeedback({ open: true, message: 'File upload failed.', severity: 'error' });
        }
    };

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
        handleCloseFeedback
    };
};

export default useAuditTrail;