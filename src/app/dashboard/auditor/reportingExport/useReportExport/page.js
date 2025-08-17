// Contains all the logic and instructions for this feature. We can also display error messages to the user interface from this file.
'use client';

import { useState } from 'react';
import { useQuery, useMutation } from '@tanstack/react-query';
import { create } from 'zustand';
import {
  getReportOptions,
  exportPdfReport,
  exportCsvReport,
  setReportSchedule,
  generateAuditSnapshot,
} from '../reportingExService/page';

// Zustand store for managing form state
const useFormStore = create((set) => ({
  fromDate: '',
  toDate: '',
  client: '',
  assetType: '',
  scheduleFrequency: '',
  sendTo: '',
  cutOffDate: '',
  setFromDate: (date) => set({ fromDate: date }),
  setToDate: (date) => set({ toDate: date }),
  setClient: (client) => set({ client }),
  setAssetType: (type) => set({ assetType: type }),
  setScheduleFrequency: (frequency) => set({ scheduleFrequency: frequency }),
  setSendTo: (email) => set({ sendTo: email }),
  setCutOffDate: (date) => set({ cutOffDate: date }),
}));

// manage state and logic for this screen
export const useReportExport = () => {
  const [search, setSearch] = useState('');
  const currentPath = '/dashboard/auditor/reportingExport';

  // Use Zustand for form state
  const {
    fromDate,
    toDate,
    client,
    assetType,
    scheduleFrequency,
    sendTo,
    cutOffDate,
    setFromDate,
    setToDate,
    setClient,
    setAssetType,
    setScheduleFrequency,
    setSendTo,
    setCutOffDate,
  } = useFormStore();

  // Tanstack react Query to store and fetch data from the database
  const reportOptionsQuery = useQuery({
    queryKey: ['reportOptions'],
    queryFn: getReportOptions,
  });

  const exportPdfMutation = useMutation({
    mutationFn: exportPdfReport,
    onSuccess: (data) => console.log(data),
    onError: (error) => console.error('PDF Export failed:', error),
  });

  const exportCsvMutation = useMutation({
    mutationFn: exportCsvReport,
    onSuccess: (data) => console.log(data),
    onError: (error) => console.error('CSV Export failed:', error),
  });

  const setScheduleMutation = useMutation({
    mutationFn: setReportSchedule,
    onSuccess: (data) => console.log(data),
    onError: (error) => console.error('Schedule failed:', error),
  });

  const generateSnapshotMutation = useMutation({
    mutationFn: generateAuditSnapshot,
    onSuccess: (data) => console.log(data),
    onError: (error) => console.error('Snapshot failed:', error),
  });

  // Handlers for user interactions
  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  const handleExportPdf = () => {
    exportPdfMutation.mutate({ fromDate, toDate, client, assetType });
  };

  const handleExportCsv = () => {
    exportCsvMutation.mutate({ fromDate, toDate, client, assetType });
  };

  const handleSetSchedule = () => {
    setScheduleMutation.mutate({ scheduleFrequency, sendTo });
  };

  const handleGenerateSnapshot = () => {
    generateSnapshotMutation.mutate({ cutOffDate });
  };

  return {
    // State
    search,
    currentPath,
    fromDate,
    toDate,
    client,
    assetType,
    scheduleFrequency,
    sendTo,
    cutOffDate,
    // Handlers
    handleSearchChange,
    handleExportPdf,
    handleExportCsv,
    handleSetSchedule,
    handleGenerateSnapshot,
    setFromDate,
    setToDate,
    setClient,
    setAssetType,
    setScheduleFrequency,
    setSendTo,
    setCutOffDate,
    // Query results
    reportOptionsQuery,
    exportPdfMutation,
    exportCsvMutation,
    setScheduleMutation,
    generateSnapshotMutation,
  };
};