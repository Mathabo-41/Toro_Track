/* The file that combines the logic with the styles and displays it as a screen. 
Rendering takes place here to make the screen respond fast when it is being clicked*/
'use client';

import React from 'react';
import Link from 'next/link';
import {
  Box,
  Typography,
  Grid,
  List,
  ListItem,
  ListItemText,
  Drawer,
  ListItemButton,
  TextField,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
} from '@mui/material';
import { AccountCircle as AccountCircleIcon } from '@mui/icons-material';
import { useReportExport } from './useReportExport/page';
import {
  fullScreenContainerStyles,
  drawerStyles,
  drawerHeaderStyles,
  listItemButtonStyles,
  mainContentBoxStyles,
  headerBoxStyles,
  pageTitleStyles,
  headerRightSectionStyles,
  searchFieldStyles,
  userProfileStyles,
  userInfoStyles,
  auditorTextStyles,
  reportingExportContainerStyles,
  reportingExportTitle,
  reportingExportSubtitle,
  reportingExportSection,
  reportingExportSectionTitle,
  reportingExportSectionDescription,
  reportingExportButton,
  reportingExportFormControl,
  reportingExportMenuItem,
  reportingExportSelect,
} from './styles';

// Import global styles for layout and navigation
import * as globalStyles from '../common/styles';
import { useAuditorStore } from '../common/auditorStore';
import { auditorMenu } from '../common/auditorStore';

// --- Static Navigation Data ---
const auditTrailMenu = [
  { name: 'Audit Trail', path: '/dashboard/auditor/audit-trail' },
  { name: 'License Configuration Tracking', path: '/dashboard/auditor/licenseConfig' },
  { name: 'Asset Status Documentation', path: '/dashboard/auditor/assetStatusDoc' },
  { name: 'Reporting & Export', path: '/dashboard/auditor/reportingExport' },
  { name: 'Compliance & Alerting', path: '/dashboard/auditor/complianceAlerting' },
  { name: 'Settings', path: '/dashboard/auditor/settings' },
];

export default function ReportingExportPage() {
  // --- Hook for State & Handlers ---
  const {
    search,
    currentPath,
    fromDate,
    toDate,
    client,
    assetType,
    scheduleFrequency,
    sendTo,
    cutOffDate,
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
    reportOptionsQuery,
    exportPdfMutation,
    exportCsvMutation,
    setScheduleMutation,
    generateSnapshotMutation,
  } = useReportExport();

  // --- Rendering Logic ---
  const { data: reportOptions, isLoading: isLoadingOptions } = reportOptionsQuery;

  const isExportingPdf = exportPdfMutation.isPending;
  const isExportingCsv = exportCsvMutation.isPending;
  const isSettingSchedule = setScheduleMutation.isPending;
  const isGeneratingSnapshot = generateSnapshotMutation.isPending;

  return (
    <Box sx={globalStyles.rootBox}>
      {/* --- Sidebar Navigation --- */}
      <Drawer
       variant="permanent"
              anchor="left"
              sx={{ '& .MuiDrawer-paper': globalStyles.drawerPaper }}
            >
              <Box sx={globalStyles.drawerHeader}>
                <Typography variant="h5">Auditor Portal</Typography>
              </Box>
              {auditorMenu.map((item) => (
                <ListItem key={item.path} disablePadding>
                  <ListItemButton
                    component={Link}
                    href={item.path}
                    sx={globalStyles.listItemButton}
                  >
                    <ListItemText primary={item.name} />
                  </ListItemButton>
                </ListItem>
              ))}       
       </Drawer>

      {/* --- Main Content --- */}
      <Box component="main" sx={mainContentBoxStyles}>
        <Box sx={headerBoxStyles}>
          <Typography variant="h4" sx={pageTitleStyles}>
            Reporting & Export
          </Typography>
          <Box sx={headerRightSectionStyles}>
            <TextField
              variant="outlined"
              placeholder="Search reports or exports"
              value={search}
              onChange={handleSearchChange}
              sx={searchFieldStyles}
            />
            <Box sx={userProfileStyles}>
              <Box sx={userInfoStyles}>
                <Typography variant="body2">Sipho Ellen</Typography>
                <Typography variant="caption" sx={auditorTextStyles}>
                  Auditor
                </Typography>
              </Box>
              <AccountCircleIcon sx={{ fontSize: 32 }} />
            </Box>
          </Box>
        </Box>

        {/* --- Reporting & Export Content --- */}
        <Box sx={reportingExportContainerStyles}>
          <Grid container maxWidth="md" sx={{ margin: '0 auto' }}>
            {/* --- Main Header --- */}
            <Grid item xs={12}>
              <Typography variant="h4" sx={reportingExportTitle}>
                Reporting & Export
              </Typography>
              <Typography variant="subtitle1" sx={reportingExportSubtitle}>
                Provides flexible, exportable views for internal reviews and external compliance checks.
              </Typography>
            </Grid>

            {/* --- Section 1: Customizable Reports --- */}
            <Grid item xs={12}>
              <Box sx={reportingExportSection}>
                <Typography variant="h6" sx={reportingExportSectionTitle}>
                  Customizable PDF/CSV Reports
                </Typography>
                <Typography variant="body1" sx={reportingExportSectionDescription}>
                  Pre-built templates for delivery logs, license statuses, and audit summaries, with filters by date, client, or asset type.
                </Typography>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={4}>
                    <TextField
                      label="From Date"
                      type="date"
                      fullWidth
                      InputLabelProps={{ shrink: true }}
                      value={fromDate}
                      onChange={(e) => setFromDate(e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <TextField
                      label="To Date"
                      type="date"
                      fullWidth
                      InputLabelProps={{ shrink: true }}
                      value={toDate}
                      onChange={(e) => setToDate(e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <FormControl fullWidth sx={reportingExportFormControl}>
                      <InputLabel>Client</InputLabel>
                      <Select label="Client" value={client} onChange={(e) => setClient(e.target.value)} sx={reportingExportSelect}>
                        <MenuItem value="">All</MenuItem>
                        {isLoadingOptions ? (
                          <MenuItem disabled>Loading...</MenuItem>
                        ) : (
                          reportOptions?.clients.map((c) => (
                            <MenuItem key={c.id} value={c.name}>
                              {c.name}
                            </MenuItem>
                          ))
                        )}
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <FormControl fullWidth sx={reportingExportFormControl}>
                      <InputLabel id="asset-type-label">Asset Type</InputLabel>
                      <Select labelId="asset-type-label" label="Asset Type" value={assetType} onChange={(e) => setAssetType(e.target.value)} sx={reportingExportSelect}>
                        <MenuItem value="">All</MenuItem>
                        {isLoadingOptions ? (
                          <MenuItem disabled>Loading...</MenuItem>
                        ) : (
                          reportOptions?.assetTypes.map((type) => (
                            <MenuItem key={type.id} value={type.name}>
                              {type.name}
                            </MenuItem>
                          ))
                        )}
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <Box onClick={handleExportPdf} sx={reportingExportButton.contained}>
                      <Typography>{isExportingPdf ? 'Exporting...' : 'Export PDF'}</Typography>
                    </Box>
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <Box onClick={handleExportCsv} sx={reportingExportButton.contained}>
                      <Typography>{isExportingCsv ? 'Exporting...' : 'Export CSV'}</Typography>
                    </Box>
                  </Grid>
                </Grid>
              </Box>
            </Grid>

            {/* --- Section 2: Scheduled Delivery --- */}
            <Grid item xs={12}>
              <Box sx={reportingExportSection}>
                <Typography variant="h6" sx={reportingExportSectionTitle}>
                  Scheduled Report Delivery
                </Typography>
                <Typography variant="body1" sx={reportingExportSectionDescription}>
                  Automate sending of monthly or quarterly audit packs to designated stakeholders via email or SharePoint.
                </Typography>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <FormControl fullWidth sx={reportingExportFormControl}>
                      <InputLabel id="schedule-frequency-label">Frequency</InputLabel>
                      <Select labelId="schedule-frequency-label" label="Frequency" value={scheduleFrequency} onChange={(e) => setScheduleFrequency(e.target.value)} sx={reportingExportSelect}>
                        <MenuItem value="monthly">Monthly</MenuItem>
                        <MenuItem value="quarterly">Quarterly</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      label="Send To (Email or SharePoint)"
                      placeholder="email@example.com"
                      fullWidth
                      value={sendTo}
                      onChange={(e) => setSendTo(e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Box onClick={handleSetSchedule} sx={reportingExportButton.contained}>
                      <Typography>{isSettingSchedule ? 'Setting...' : 'Set Schedule'}</Typography>
                    </Box>
                  </Grid>
                </Grid>
              </Box>
            </Grid>

            {/* --- Section 3: On-Demand Snapshots --- */}
            <Grid item xs={12}>
              <Box sx={reportingExportSection}>
                <Typography variant="h6" sx={reportingExportSectionTitle}>
                  On-Demand Audit Snapshots
                </Typography>
                <Typography variant="body1" sx={reportingExportSectionDescription}>
                  Generate instant snapshots of the entire asset register for any cut-off date.
                </Typography>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      label="Cut-Off Date"
                      type="date"
                      fullWidth
                      InputLabelProps={{ shrink: true }}
                      value={cutOffDate}
                      onChange={(e) => setCutOffDate(e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Box onClick={handleGenerateSnapshot} sx={reportingExportButton.contained}>
                      <Typography>{isGeneratingSnapshot ? 'Generating...' : 'Generate Snapshot'}</Typography>
                    </Box>
                  </Grid>
                </Grid>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Box>
  );
}