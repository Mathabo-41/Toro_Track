// ./auditor/reportingExport/RepoExportContent.js
'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { createSupabaseClient } from '@/lib/supabase/client';
import {
  Box, Typography, Grid, List,
  ListItem, ListItemText, Drawer,
  ListItemButton, TextField, MenuItem,
  FormControl, InputLabel, Select,
  Button, IconButton, LinearProgress,
  Card, CardContent, Chip
} from '@mui/material';

// Dashboard icon import
import DashboardIcon from '@mui/icons-material/Dashboard';

// Snackbar and icons
import { Snackbar, Alert } from '@mui/material';
import {
  Logout as LogoutIcon,
  Download as DownloadIcon,
  Schedule as ScheduleIcon,
  CameraAlt as SnapshotIcon,
  Search as SearchIcon,
  PictureAsPdf as PdfIcon,
  TableChart as CsvIcon
} from '@mui/icons-material';

import { useReportExport } from './useReportExport/page';
import {
  mainContentBoxStyles,
  headerBoxStyles,
  pageTitleStyles,
  headerRightSectionStyles,
  searchFieldStyles,
  reportingExportContainerStyles,
  reportingExportTitle,
  reportingExportSubtitle,
  reportingExportSection,
  reportingExportSectionTitle,
  reportingExportSectionDescription,
  reportingExportButton,
  reportingExportFormControl,
  reportingExportSelect,
} from './styles';

// Import global styles for layout and navigation
import * as globalStyles from '../common/styles';
import { auditorMenu } from '../common/auditorStore';

/**
 * Main Reporting & Export Component
 */
export default function RepoExportContent() {
  const supabase = createSupabaseClient();
  const {
    search,
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

  const router = useRouter();
  const [currentUser, setCurrentUser] = useState(null);
  
  // Snackbar state management
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');
  
  // Logout snackbar state
  const [logoutSnackbar, setLogoutSnackbar] = useState(false);

  /**
   * Displays a snackbar notification with the specified message and severity 
   */
  const showSnackbar = (message, severity = 'success') => {
    setSnackbarMessage(message);
    setSnackbarSeverity(severity);
    setOpenSnackbar(true);
  };

  /**
   * Handles closing the snackbar notification
   */
  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenSnackbar(false);
  };

  /**
   * Handles closing the logout snackbar
   */
  const handleCloseLogoutSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setLogoutSnackbar(false);
  };

  /**
   * Fetches the current authenticated user's data when the component mounts
   */
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const { data: { user }, error } = await supabase.auth.getUser();
        if (error) throw error;
        setCurrentUser(user);
      } catch (error) {
        console.error('Error fetching user data:', error);
        showSnackbar('Failed to load user profile', 'error');
      }
    };
    fetchUser();
  }, []);

  /**
   * Enhanced PDF export handler with validation and user feedback
   */
  const handleExportPdfEnhanced = async () => {
    // Validate date range
    if (fromDate && toDate && new Date(fromDate) > new Date(toDate)) {
      showSnackbar('From date cannot be after To date', 'error');
      return;
    }

    try {
      await handleExportPdf();
      showSnackbar('PDF report generated successfully! Check your downloads.', 'success');
    } catch (error) {
      console.error('Error exporting PDF:', error);
      showSnackbar('Failed to generate PDF report. Please try again.', 'error');
    }
  };

  /**
   * Enhanced CSV export handler with validation and user feedback
   */
  const handleExportCsvEnhanced = async () => {
    // Validate date range
    if (fromDate && toDate && new Date(fromDate) > new Date(toDate)) {
      showSnackbar('From date cannot be after To date', 'error');
      return;
    }

    try {
      await handleExportCsv();
      showSnackbar('CSV report exported successfully! Check your downloads.', 'success');
    } catch (error) {
      console.error('Error exporting CSV:', error);
      showSnackbar('Failed to export CSV report. Please try again.', 'error');
    }
  };

  /**
   * Enhanced schedule handler with validation and user feedback
   */
  const handleSetScheduleEnhanced = async () => {
    // Validate required fields for scheduling
    if (!scheduleFrequency) {
      showSnackbar('Please select a frequency', 'error');
      return;
    }
    if (!sendTo || !sendTo.trim()) {
      showSnackbar('Please enter an email or SharePoint location', 'error');
      return;
    }

    // Basic email validation
    if (sendTo.includes('@') && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(sendTo)) {
      showSnackbar('Please enter a valid email address', 'error');
      return;
    }

    try {
      await handleSetSchedule();
      showSnackbar(`Report schedule set for ${scheduleFrequency} delivery to ${sendTo}`, 'success');
    } catch (error) {
      console.error('Error setting schedule:', error);
      showSnackbar('Failed to set report schedule. Please try again.', 'error');
    }
  };

  /**
   * Enhanced snapshot handler with validation and user feedback
   */
  const handleGenerateSnapshotEnhanced = async () => {
    if (!cutOffDate) {
      showSnackbar('Please select a cut-off date', 'error');
      return;
    }

    // Validate that cut-off date is not in the future
    if (new Date(cutOffDate) > new Date()) {
      showSnackbar('Cut-off date cannot be in the future', 'error');
      return;
    }

    try {
      await handleGenerateSnapshot();
      showSnackbar(`Audit snapshot generated for ${new Date(cutOffDate).toLocaleDateString()}`, 'success');
    } catch (error) {
      console.error('Error generating snapshot:', error);
      showSnackbar('Failed to generate audit snapshot. Please try again.', 'error');
    }
  };

  /**
   * Handles user logout with confirmation and redirect
   */
  const handleLogout = async () => {
    setLogoutSnackbar(true);
    setTimeout(async () => {
      try {
        await supabase.auth.signOut();
        router.push('/login');
      } catch (error) {
        console.error('Error during logout:', error);
        showSnackbar('Error during logout', 'error');
      }
    }, 1500);
  };

  /**
   * Resets all form filters to their default values
   */
  const handleResetFilters = () => {
    setFromDate('');
    setToDate('');
    setClient('');
    setAssetType('');
    setScheduleFrequency('');
    setSendTo('');
    setCutOffDate('');
    showSnackbar('All filters have been reset', 'info');
  };

  // Mutation states for loading indicators
  const { data: reportOptions, isLoading: isLoadingOptions, error: optionsError } = reportOptionsQuery;
  const isExportingPdf = exportPdfMutation.isPending;
  const isExportingCsv = exportCsvMutation.isPending;
  const isSettingSchedule = setScheduleMutation.isPending;
  const isGeneratingSnapshot = generateSnapshotMutation.isPending;

  // Show error if options fail to load
  useEffect(() => {
    if (optionsError) {
      showSnackbar('Failed to load report options. Some features may be limited.', 'error');
    }
  }, [optionsError]);

  // Check if any filters are active
  const hasActiveFilters = fromDate || toDate || client || assetType;

  return (
    <Box sx={globalStyles.rootBox}>
      {/* Navigation Sidebar */}
      <Drawer
        variant="permanent"
        anchor="left"
        sx={{ '& .MuiDrawer-paper': globalStyles.drawerPaper }}
      >
        <Box sx={{
          p: 1,
          borderBottom: '2px solid #6b705c',
          display: 'flex',
          alignItems: 'center',
          gap: 1
        }}>
          <Link href="/dashboard/auditor/audit-trail" passHref>
            <IconButton sx={{ color: 'green' }} aria-label="Go to Dashboard">
              <DashboardIcon />
            </IconButton>
          </Link>
          <Typography variant="h5" sx={{ color: '#fefae0' }}>
            Auditor Portal
          </Typography>
        </Box>
        
        {/* Navigation Menu */}
        <List>
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
        </List>

        {/* User Profile and Logout Section */}
        <Box sx={{ mt: 'auto', p: 2, borderTop: '2px solid #6b705c' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2, gap: 1.5 }}>
                <Image 
                  src="/toroLogo.jpg" 
                  alt="User Profile" 
                  width={40} 
                  height={40} 
                  style={{ borderRadius: '50%', border: '2px solid #f3722c' }} 
                />
                <Box sx={{ minWidth: 0 }}>
                    <Typography noWrap sx={{ fontWeight: '600', color: '#fefae0' }}>
                      {currentUser?.email || 'Loading...'}
                    </Typography>
                    <Typography variant="caption" noWrap sx={{ color: 'rgba(254, 250, 224, 0.7)' }}>
                      Auditor
                    </Typography>
                </Box>
            </Box>
            <Button 
              onClick={handleLogout} 
              fullWidth 
              variant="outlined" 
              startIcon={<LogoutIcon />} 
              sx={{ 
                color: '#fefae0', 
                borderColor: '#fefae0', 
                '&:hover': { 
                  background: '#6b705c',
                  borderColor: '#fefae0'
                } 
              }}
            >
              Logout
            </Button>
        </Box>
      </Drawer>

      {/* Main Content Area */}
      <Box component="main" sx={mainContentBoxStyles}>
        {/* Page Header */}
        <Box sx={headerBoxStyles}>
          <Typography variant="h4" sx={pageTitleStyles}>
            Reporting & Export
          </Typography>
          <Box sx={headerRightSectionStyles}>
            <TextField
              variant="outlined"
              placeholder="Search reports or exports..."
              value={search}
              onChange={handleSearchChange}
              sx={searchFieldStyles}
              InputProps={{
                startAdornment: <SearchIcon sx={{ color: '#6b705c', mr: 1 }} />
              }}
              helperText="Search by report name, client, or type"
            />
          </Box>
        </Box>

        {/* Reporting & Export Content */}
        <Box sx={reportingExportContainerStyles}>
          <Grid container spacing={3} sx={{ margin: '0 auto', maxWidth: '1200px' }}>
            {/* Page Header Section */}
            <Grid item xs={12}>
              <Card sx={{ 
                mb: 4, 
                backgroundColor: '#fefae0',
                border: '1px solid #6b705c',
                boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
              }}>
                <CardContent sx={{ p: 4 }}>
                  <Typography variant="h4" sx={reportingExportTitle}>
                    Reporting & Export Center
                  </Typography>
                  <Typography variant="subtitle1" sx={reportingExportSubtitle}>
                    Generate comprehensive reports, schedule automated deliveries, and create audit snapshots for compliance and internal reviews.
                  </Typography>
                  
                  {/* Active Filters Display */}
                  {hasActiveFilters && (
                    <Box sx={{ mt: 2, display: 'flex', alignItems: 'center', gap: 1, flexWrap: 'wrap' }}>
                      <Typography variant="body2" sx={{ fontWeight: 'bold', color: '#525252' }}>
                        Active Filters:
                      </Typography>
                      {fromDate && (
                        <Chip 
                          label={`From: ${new Date(fromDate).toLocaleDateString()}`} 
                          size="small" 
                          onDelete={() => setFromDate('')}
                        />
                      )}
                      {toDate && (
                        <Chip 
                          label={`To: ${new Date(toDate).toLocaleDateString()}`} 
                          size="small" 
                          onDelete={() => setToDate('')}
                        />
                      )}
                      {client && (
                        <Chip 
                          label={`Client: ${client}`} 
                          size="small" 
                          onDelete={() => setClient('')}
                        />
                      )}
                      {assetType && (
                        <Chip 
                          label={`Type: ${assetType}`} 
                          size="small" 
                          onDelete={() => setAssetType('')}
                        />
                      )}
                      <Button 
                        size="small" 
                        onClick={handleResetFilters}
                        sx={{ ml: 1 }}
                      >
                        Clear All
                      </Button>
                    </Box>
                  )}
                </CardContent>
              </Card>
            </Grid>

            {/* Customizable PDF/CSV Reports Section */}
            <Grid item xs={12}>
              <Card sx={reportingExportSection}>
                <CardContent>
                  <Typography variant="h5" sx={reportingExportSectionTitle}>
                    <DownloadIcon sx={{ mr: 1, verticalAlign: 'middle' }} />
                    Customizable PDF/CSV Reports
                  </Typography>
                  <Typography variant="body1" sx={reportingExportSectionDescription}>
                    Generate detailed reports with flexible filtering options. Export delivery logs, license statuses, and audit summaries by date range, client, or asset type.
                  </Typography>
                  
                  {/* Report Filters and Actions */}
                  <Grid container spacing={3} sx={{ mt: 2 }}>
                    {/* Date Range Filters */}
                    <Grid item xs={12} sm={6} md={3}>
                      <TextField
                        label="From Date"
                        type="date"
                        fullWidth
                        InputLabelProps={{ shrink: true }}
                        value={fromDate}
                        onChange={(e) => setFromDate(e.target.value)}
                        error={fromDate && toDate && new Date(fromDate) > new Date(toDate)}
                        helperText={fromDate && toDate && new Date(fromDate) > new Date(toDate) ? 'From date cannot be after To date' : 'Start date for report data'}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                      <TextField
                        label="To Date"
                        type="date"
                        fullWidth
                        InputLabelProps={{ shrink: true }}
                        value={toDate}
                        onChange={(e) => setToDate(e.target.value)}
                        error={fromDate && toDate && new Date(fromDate) > new Date(toDate)}
                        helperText="End date for report data"
                      />
                    </Grid>
                    
                    {/* Client Filter */}
                    <Grid item xs={12} sm={6} md={3}>
                      <FormControl fullWidth sx={reportingExportFormControl}>
                        <InputLabel>Client</InputLabel>
                        <Select 
                          label="Client" 
                          value={client} 
                          onChange={(e) => setClient(e.target.value)} 
                          sx={reportingExportSelect}
                        >
                          <MenuItem value="">All Clients</MenuItem>
                          {isLoadingOptions ? (
                            <MenuItem disabled>
                              Loading clients...
                            </MenuItem>
                          ) : (
                            reportOptions?.clients?.map((c) => (
                              <MenuItem key={c.id} value={c.name}>
                                {c.name}
                              </MenuItem>
                            )) || []
                          )}
                        </Select>
                      </FormControl>
                    </Grid>
                    
                    {/* Asset Type Filter */}
                    <Grid item xs={12} sm={6} md={3}>
                      <FormControl fullWidth sx={reportingExportFormControl}>
                        <InputLabel id="asset-type-label">Asset Type</InputLabel>
                        <Select 
                          labelId="asset-type-label" 
                          label="Asset Type" 
                          value={assetType} 
                          onChange={(e) => setAssetType(e.target.value)} 
                          sx={reportingExportSelect}
                        >
                          <MenuItem value="">All Types</MenuItem>
                          {isLoadingOptions ? (
                            <MenuItem disabled>
                              Loading asset types...
                            </MenuItem>
                          ) : (
                            reportOptions?.assetTypes?.map((type) => (
                              <MenuItem key={type.id} value={type.name}>
                                {type.name}
                              </MenuItem>
                            )) || []
                          )}
                        </Select>
                      </FormControl>
                    </Grid>
                    
                    {/* Export Actions */}
                    <Grid item xs={12} sm={6}>
                      <Button
                        onClick={handleExportPdfEnhanced}
                        variant="contained"
                        startIcon={isExportingPdf ? <LinearProgress size={16} /> : <PdfIcon />}
                        disabled={isExportingPdf || isExportingCsv}
                        sx={reportingExportButton.contained}
                        fullWidth
                        size="large"
                      >
                        {isExportingPdf ? 'Generating PDF...' : 'Export PDF Report'}
                      </Button>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Button
                        onClick={handleExportCsvEnhanced}
                        variant="contained"
                        startIcon={isExportingCsv ? <LinearProgress size={16} /> : <CsvIcon />}
                        disabled={isExportingPdf || isExportingCsv}
                        sx={{
                          ...reportingExportButton.contained,
                          backgroundColor: '#2e7d32',
                          '&:hover': {
                            backgroundColor: '#1b5e20',
                          }
                        }}
                        fullWidth
                        size="large"
                      >
                        {isExportingCsv ? 'Exporting CSV...' : 'Export CSV Data'}
                      </Button>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </Grid>

            {/* Scheduled Report Delivery Section */}
            <Grid item xs={12} md={6}>
              <Card sx={reportingExportSection}>
                <CardContent>
                  <Typography variant="h5" sx={reportingExportSectionTitle}>
                    <ScheduleIcon sx={{ mr: 1, verticalAlign: 'middle' }} />
                    Scheduled Report Delivery
                  </Typography>
                  <Typography variant="body1" sx={reportingExportSectionDescription}>
                    Automate report distribution to stakeholders. Set up regular deliveries via email or SharePoint with custom scheduling options.
                  </Typography>
                  
                  <Grid container spacing={3} sx={{ mt: 2 }}>
                    <Grid item xs={12}>
                      <FormControl fullWidth sx={reportingExportFormControl}>
                        <InputLabel id="schedule-frequency-label">Delivery Frequency</InputLabel>
                        <Select 
                          labelId="schedule-frequency-label" 
                          label="Delivery Frequency" 
                          value={scheduleFrequency} 
                          onChange={(e) => setScheduleFrequency(e.target.value)} 
                          sx={reportingExportSelect}
                        >
                          <MenuItem value="weekly">Weekly</MenuItem>
                          <MenuItem value="monthly">Monthly</MenuItem>
                          <MenuItem value="quarterly">Quarterly</MenuItem>
                          <MenuItem value="yearly">Yearly</MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        label="Recipient Email or SharePoint URL"
                        placeholder="team@company.com or https://sharepoint.com/sites/reports"
                        fullWidth
                        value={sendTo}
                        onChange={(e) => setSendTo(e.target.value)}
                        helperText="Enter email address or SharePoint location"
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <Button
                        onClick={handleSetScheduleEnhanced}
                        variant="contained"
                        startIcon={isSettingSchedule ? <LinearProgress size={16} /> : <ScheduleIcon />}
                        disabled={isSettingSchedule}
                        sx={reportingExportButton.contained}
                        fullWidth
                        size="large"
                      >
                        {isSettingSchedule ? 'Configuring Schedule...' : 'Activate Scheduled Delivery'}
                      </Button>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </Grid>

            {/* On-Demand Audit Snapshots Section */}
            <Grid item xs={12} md={6}>
              <Card sx={reportingExportSection}>
                <CardContent>
                  <Typography variant="h5" sx={reportingExportSectionTitle}>
                    <SnapshotIcon sx={{ mr: 1, verticalAlign: 'middle' }} />
                    On-Demand Audit Snapshots
                  </Typography>
                  <Typography variant="body1" sx={reportingExportSectionDescription}>
                    Generate comprehensive snapshots of the entire asset register for any historical date. Perfect for compliance audits and historical analysis.
                  </Typography>
                  
                  <Grid container spacing={3} sx={{ mt: 2 }}>
                    <Grid item xs={12}>
                      <TextField
                        label="Historical Cut-Off Date"
                        type="date"
                        fullWidth
                        InputLabelProps={{ shrink: true }}
                        value={cutOffDate}
                        onChange={(e) => setCutOffDate(e.target.value)}
                        helperText="Select the date for which you want the asset register snapshot"
                        inputProps={{ 
                          max: new Date().toISOString().split('T')[0] // Prevent future dates
                        }}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <Button
                        onClick={handleGenerateSnapshotEnhanced}
                        variant="contained"
                        startIcon={isGeneratingSnapshot ? <LinearProgress size={16} /> : <SnapshotIcon />}
                        disabled={isGeneratingSnapshot}
                        sx={reportingExportButton.contained}
                        fullWidth
                        size="large"
                      >
                        {isGeneratingSnapshot ? 'Creating Snapshot...' : 'Generate Audit Snapshot'}
                      </Button>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Box>
      </Box>

      {/* Global Snackbar for Notifications */}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert 
          severity={snackbarSeverity}
          sx={{
            width: '100%',
            fontWeight: 'bold',
            fontSize: '1rem',
            boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
          }}
          onClose={handleCloseSnackbar}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>

      {/* Logout Snackbar */}
      <Snackbar
        open={logoutSnackbar}
        autoHideDuration={1500}
        onClose={handleCloseLogoutSnackbar}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert 
          severity="success" 
          sx={{ 
            width: '100%', 
            fontWeight: 'bold', 
            fontSize: '1.2rem',
            backgroundColor: '#a6f0daff',
            color: 'black'
          }}
        >
          Logging out...
        </Alert>
      </Snackbar>
    </Box>
  );
}