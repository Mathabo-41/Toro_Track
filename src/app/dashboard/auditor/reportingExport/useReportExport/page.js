// useReportExport/page.js
'use client';

import { useState } from 'react';
import { useQuery, useMutation } from '@tanstack/react-query';
import { create } from 'zustand';
import { 
  getReportOptions, 
  exportPdfReport, 
  exportCsvReport, 
  setReportSchedule, 
  generateAuditSnapshot 
} from '../reportingExService/page';

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

export const useReportExport = () => {
  const [search, setSearch] = useState('');
  const currentPath = '/dashboard/auditor/reportingExport';

  const formState = useFormStore();

  const reportOptionsQuery = useQuery({
    queryKey: ['reportOptions'],
    queryFn: getReportOptions,
  });

  const exportPdfMutation = useMutation({
    mutationFn: exportPdfReport,
  });

  const exportCsvMutation = useMutation({
    mutationFn: exportCsvReport,
  });

  const setScheduleMutation = useMutation({
    mutationFn: setReportSchedule,
  });

  const generateSnapshotMutation = useMutation({
    mutationFn: generateAuditSnapshot,
  });

  const handleSearchChange = (e) => setSearch(e.target.value);

  const handleExportPdf = () => {
    exportPdfMutation.mutate({ 
      fromDate: formState.fromDate, 
      toDate: formState.toDate, 
      client: formState.client, 
      assetType: formState.assetType 
    });
  };

  const handleExportCsv = () => {
    exportCsvMutation.mutate({ 
      fromDate: formState.fromDate, 
      toDate: formState.toDate, 
      client: formState.client, 
      assetType: formState.assetType 
    });
  };

  const handleSetSchedule = () => {
    setScheduleMutation.mutate({ 
      scheduleFrequency: formState.scheduleFrequency, 
      sendTo: formState.sendTo 
    });
  };

  const handleGenerateSnapshot = () => {
    generateSnapshotMutation.mutate({ 
      cutOffDate: formState.cutOffDate 
    });
  };

  return {
    search,
    currentPath,
    ...formState,
    handleSearchChange,
    handleExportPdf,
    handleExportCsv,
    handleSetSchedule,
    handleGenerateSnapshot,
    reportOptionsQuery,
    exportPdfMutation,
    exportCsvMutation,
    setScheduleMutation,
    generateSnapshotMutation,
  };
};