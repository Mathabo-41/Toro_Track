'use client'

import React, { useEffect, useState } from 'react'
import Link from 'next/link'
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
  FormControl,
  InputLabel,
  Select,
  MenuItem
} from '@mui/material'
import { AccountCircle as AccountCircleIcon } from '@mui/icons-material'

import { useAuditorStore } from '../common/auditorStore'
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
  auditorTextStyles
} from '../common/styles'
import {
  reportingExportContainerStyles,
  reportingExportTitle,
  reportingExportSubtitle,
  reportingExportSection,
  reportingExportSectionTitle,
  reportingExportSectionDescription,
  reportingExportFormControl,
  reportingExportSelect,
  reportingExportButton
} from './styles'
import { useReportingExportOptions } from './useReportingExport'

export default function ReportingExportPage() {
  const { auditTrailMenu, currentPath, setCurrentPath } = useAuditorStore()
  const [search, setSearch] = useState('')
  const [fromDate, setFromDate] = useState('')
  const [toDate, setToDate] = useState('')
  const [client, setClient] = useState('')
  const [assetType, setAssetType] = useState('')
  const [frequency, setFrequency] = useState('')
  const [snapshotDate, setSnapshotDate] = useState('')

  const {
    data: options = { clients: [], assetTypes: [], frequencies: [] },
    isLoading,
    isError
  } = useReportingExportOptions()

  // Activate sidebar highlight
  useEffect(() => {
    setCurrentPath('/dashboard/auditor/reportingExport')
  }, [setCurrentPath])

  return (
    <Box sx={fullScreenContainerStyles}>
      {/* Sidebar */}
      <Drawer variant="permanent" anchor="left" sx={drawerStyles}>
        <Box sx={drawerHeaderStyles}>
          <Typography variant="h5">Auditor Portal</Typography>
        </Box>
        <List>
          {auditTrailMenu.map((item) => (
            <ListItem key={item.path} disablePadding>
              <ListItemButton
                component={Link}
                href={item.path}
                selected={item.path === currentPath}
                sx={listItemButtonStyles(item.path, currentPath)}
              >
                <ListItemText primary={item.name} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>

      {/* Main Content */}
      <Box component="main" sx={mainContentBoxStyles}>
        {/* Header */}
        <Box sx={headerBoxStyles}>
          <Typography variant="h4" sx={pageTitleStyles}>
            Reporting &amp; Export
          </Typography>
          <Box sx={headerRightSectionStyles}>
            <TextField
              variant="outlined"
              placeholder="Search reports or exports"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
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

        {/* Reporting & Export Sections */}
        <Box sx={reportingExportContainerStyles}>
          <Grid container maxWidth="md" sx={{ mx: 'auto' }}>
            {/* Main Header */}
            <Grid item xs={12}>
              <Typography variant="h4" sx={reportingExportTitle}>
                Reporting &amp; Export
              </Typography>
              <Typography variant="subtitle1" sx={reportingExportSubtitle}>
                Flexible, exportable views for internal reviews and external compliance checks.
              </Typography>
            </Grid>

            {/* Custom Reports */}
            <Grid item xs={12}>
              <Box sx={reportingExportSection}>
                <Typography variant="h6" sx={reportingExportSectionTitle}>
                  Customizable PDF/CSV Reports
                </Typography>
                <Typography variant="body1" sx={reportingExportSectionDescription}>
                  Pre-built templates for delivery logs, license statuses, and audit summaries.
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
                      <Select
                        value={client}
                        onChange={(e) => setClient(e.target.value)}
                        sx={reportingExportSelect}
                      >
                        {isLoading
                          ? <MenuItem disabled>Loading…</MenuItem>
                          : isError
                            ? <MenuItem disabled>Error</MenuItem>
                            : options.clients.map((c) => (
                                <MenuItem key={c} value={c}>{c}</MenuItem>
                              ))
                        }
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <FormControl fullWidth sx={reportingExportFormControl}>
                      <InputLabel>Asset Type</InputLabel>
                      <Select
                        value={assetType}
                        onChange={(e) => setAssetType(e.target.value)}
                        sx={reportingExportSelect}
                      >
                        {options.assetTypes.map((t) => (
                          <MenuItem key={t} value={t}>{t}</MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <Box sx={reportingExportButton.contained}>
                      <Typography>Export PDF</Typography>
                    </Box>
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <Box sx={reportingExportButton.contained}>
                      <Typography>Export CSV</Typography>
                    </Box>
                  </Grid>
                </Grid>
              </Box>
            </Grid>

            {/* Scheduled Delivery */}
            <Grid item xs={12}>
              <Box sx={reportingExportSection}>
                <Typography variant="h6" sx={reportingExportSectionTitle}>
                  Scheduled Report Delivery
                </Typography>
                <Typography variant="body1" sx={reportingExportSectionDescription}>
                  Automate sending of monthly or quarterly audit packs to stakeholders.
                </Typography>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <FormControl fullWidth sx={reportingExportFormControl}>
                      <InputLabel>Frequency</InputLabel>
                      <Select
                        value={frequency}
                        onChange={(e) => setFrequency(e.target.value)}
                        sx={reportingExportSelect}
                      >
                        {options.frequencies.map((f) => (
                          <MenuItem key={f} value={f}>{f}</MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      label="Send To"
                      placeholder="email@example.com"
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Box sx={reportingExportButton.contained}>
                      <Typography>Set Schedule</Typography>
                    </Box>
                  </Grid>
                </Grid>
              </Box>
            </Grid>

            {/* On‐Demand Snapshots */}
            <Grid item xs={12}>
              <Box sx={reportingExportSection}>
                <Typography variant="h6" sx={reportingExportSectionTitle}>
                  On-Demand Audit Snapshots
                </Typography>
                <Typography variant="body1" sx={reportingExportSectionDescription}>
                  Generate instant snapshots of the asset register for any cut‐off date.
                </Typography>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      label="Cut-Off Date"
                      type="date"
                      fullWidth
                      InputLabelProps={{ shrink: true }}
                      value={snapshotDate}
                      onChange={(e) => setSnapshotDate(e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Box sx={reportingExportButton.contained}>
                      <Typography>Generate Snapshot</Typography>
                    </Box>
                  </Grid>
                </Grid>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Box>
  )
}
