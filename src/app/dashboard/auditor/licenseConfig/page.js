'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import dynamic from 'next/dynamic'
import {
  Grid,
  MenuItem,
  Button,
  Select,
  Box,
  Typography,
  Paper,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Tooltip,
  Chip,
  List,
  ListItem,
  Drawer,
  ListItemButton,
  ListItemText,
  Card
} from '@mui/material'
import {
  AccountCircle as AccountCircleIcon,
  WarningAmber as WarningAmberIcon,
  Download as DownloadIcon,
  Close as CloseIcon,
  Add as AddIcon
} from '@mui/icons-material'

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
  userProfileStyles,
  userInfoStyles,
  auditorTextStyles
} from '../common/styles'
import {
  perClientLicenseRegisterStyles,
  expiryRenewalAlertsStyles,
  licenseUsageEntitlementDashboardStyles,
  licenseUsageChartContainerStyles,
  licenseTotalsBoxStyles,
  overUsageAlertStyles
} from './styles'
import { useLicenseConfig } from './useLicenseConfig'

// Dynamically imported chart & grid components
const ResponsiveContainer = dynamic(
  () => import('recharts').then((m) => m.ResponsiveContainer),
  { ssr: false }
)
const BarChart = dynamic(() => import('recharts').then((m) => m.BarChart), {
  ssr: false
})
const Bar = dynamic(() => import('recharts').then((m) => m.Bar), { ssr: false })
const XAxis = dynamic(() => import('recharts').then((m) => m.XAxis), {
  ssr: false
})
const YAxis = dynamic(() => import('recharts').then((m) => m.YAxis), {
  ssr: false
})
const TooltipChart = dynamic(() => import('recharts').then((m) => m.Tooltip), {
  ssr: false
})
const Legend = dynamic(() => import('recharts').then((m) => m.Legend), {
  ssr: false
})
const LabelList = dynamic(() => import('recharts').then((m) => m.LabelList), {
  ssr: false
})
const DataGrid = dynamic(
  () => import('@mui/x-data-grid').then((m) => m.DataGrid),
  { ssr: false }
)

export default function LicenseConfigPage() {
  const { auditTrailMenu, currentPath, setCurrentPath } = useAuditorStore()
  const [client, setClient] = useState('all')
  const [search, setSearch] = useState('') // if needed for future filtering

  // activate sidebar link
  useEffect(() => {
    setCurrentPath('/dashboard/auditor/licenseConfig')
  }, [setCurrentPath])

  // fetch all data
  const { data, isLoading, isError } = useLicenseConfig(client)
  const { licenseRows = [], renewalGroups = [], usageData = [] } = data || {}

  // Dialog state
  const [selected, setSelected] = useState(null)
  const handleRowClick = (params) => setSelected(params.row)
  const closeDialog = () => setSelected(null)

  const exportCsv = () => {
    const csv =
      'data:text/csv;charset=utf-8,' +
      ['License Name,License Key,Status']
        .concat(
          licenseRows.map((r) => `${r.licenseName},${r.licenseKey},${r.status}`)
        )
        .join('\n')
    const link = document.createElement('a')
    link.href = encodeURI(csv)
    link.download = `licenses_${client}.csv`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  // Totals
  const totals = usageData.reduce(
    (acc, cur) => ({
      assigned: acc.assigned + cur.assigned,
      purchased: acc.purchased + cur.purchased
    }),
    { assigned: 0, purchased: 0 }
  )

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
            License & Configuration Tracking
          </Typography>
          <Box sx={headerRightSectionStyles}>
            <Select
              value={client}
              onChange={(e) => setClient(e.target.value)}
              size="small"
              sx={{
                minWidth: 140,
                backgroundColor: '#283618',
                borderColor: '#fefae0',
                color: '#fefae0',
                '&:hover': { backgroundColor: '#6b705c' }
              }}
            >
              <MenuItem value="all">All Clients</MenuItem>
              <MenuItem value="clientA">Client A</MenuItem>
              <MenuItem value="clientB">Client B</MenuItem>
            </Select>
            <Button
              variant="outlined"
              fullWidth
              startIcon={<AddIcon />}
              sx={{
                ml: 2,
                backgroundColor: '#283618',
                borderColor: '#fefae0',
                color: '#fefae0',
                '&:hover': { backgroundColor: '#6b705c' }
              }}
            >
              Add License
            </Button>
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

        {/* Grid Layout */}
        <Grid container spacing={6} sx={{ mt: 4, px: 2, alignItems: 'stretch' }}>
          {/* Per-Client Register */}
          <Grid item xs={12} md={6}>
            <Paper elevation={1} sx={{ ml: 6, p: 2, width: 500 }}>
              <Typography variant="h4" gutterBottom>
                Per-Client License Register
              </Typography>
              <Box sx={perClientLicenseRegisterStyles}>
                {isLoading && <Typography>Loading...</Typography>}
                {isError && <Typography color="error">Error loading</Typography>}
                {!isLoading && !isError && (
                  <>
                    <Box
                      sx={{
                        mb: 2,
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center'
                      }}
                    >
                      <Typography variant="subtitle1">
                        Showing {licenseRows.length} licenses for {client}
                      </Typography>
                      <Tooltip title="Export CSV">
                        <IconButton onClick={exportCsv} size="small" color="primary">
                          <DownloadIcon />
                        </IconButton>
                      </Tooltip>
                    </Box>
                    <Box sx={{ flexGrow: 1, width: '100%', minHeight: 0 }}>
                      <DataGrid
                        rows={licenseRows}
                        columns={[
                          { field: 'licenseName', headerName: 'License Name', flex: 1 },
                          { field: 'licenseKey', headerName: 'License Key', flex: 1 },
                          { field: 'status', headerName: 'Status', flex: 1 }
                        ]}
                        pageSize={5}
                        rowsPerPageOptions={[5, 10]}
                        onRowClick={handleRowClick}
                        sx={{ backgroundColor: '#fefae0', border: '1px solid #6b705c' }}
                      />
                    </Box>
                  </>
                )}
              </Box>

              {/* Details Dialog */}
              <Dialog open={!!selected} onClose={closeDialog} fullWidth maxWidth="sm">
                <DialogTitle sx={{ backgroundColor: '#fefae0', border: '1px solid #6b705c' }}>
                  License Details
                  <IconButton
                    onClick={closeDialog}
                    sx={{ position: 'absolute', right: 8, top: 8, color: 'grey.500' }}
                  >
                    <CloseIcon />
                  </IconButton>
                </DialogTitle>
                <DialogContent dividers sx={{ backgroundColor: '#fefae0' }}>
                  {selected && (
                    <>
                      <Typography>
                        <strong>License Name:</strong> {selected.licenseName}
                      </Typography>
                      <Typography>
                        <strong>License Key:</strong> {selected.licenseKey}
                      </Typography>
                      <Typography>
                        <strong>Status:</strong> {selected.status}
                      </Typography>
                    </>
                  )}
                </DialogContent>
                <DialogActions sx={{ backgroundColor: '#fefae0' }}>
                  <Button onClick={closeDialog}>Close</Button>
                </DialogActions>
              </Dialog>
            </Paper>
          </Grid>

          {/* Renewal Card */}
          <Grid item xs={12} md={6}>
            <Paper elevation={1} sx={{ ml: 2, p: 2, width: 500 }}>
              <Typography variant="h4" gutterBottom>
                License Expiry & Renewal
              </Typography>
              <Card sx={expiryRenewalAlertsStyles}>
                {isLoading && <Typography>Loading...</Typography>}
                {isError && <Typography color="error">Error loading</Typography>}
                {!isLoading &&
                  !isError &&
                  renewalGroups.map((group) => {
                    const preview = group.keys.slice(0, 3)
                    const extra = group.keys.length - preview.length
                    return (
                      <Box key={group.label} sx={{ mb: 2 }}>
                        <Chip label={group.label} color={group.color} variant="outlined" />
                        <List dense disablePadding>
                          {preview.map((k, i) => (
                            <ListItem
                              key={i}
                              sx={{
                                px: 1.5,
                                py: 0.5,
                                cursor: 'pointer',
                                color: 'primary.main',
                                '&:hover': { textDecoration: 'underline' }
                              }}
                            >
                              • {k}
                            </ListItem>
                          ))}
                          {extra > 0 && (
                            <ListItem
                              sx={{
                                px: 1.5,
                                py: 0.5,
                                cursor: 'pointer',
                                color: 'text.secondary',
                                fontStyle: 'italic'
                              }}
                            >
                              + {extra} more
                            </ListItem>
                          )}
                        </List>
                      </Box>
                    )
                  })}
              </Card>
            </Paper>
          </Grid>

          {/* Usage Dashboard */}
          <Grid item xs={12} sx={{ mt: 4 }}>
            <Paper elevation={1} sx={licenseUsageEntitlementDashboardStyles}>
              <Typography
                variant="h4"
                gutterBottom
                textAlign="center"
                sx={{ fontWeight: 300, color: '#525252' }}
              >
                License Usage
              </Typography>
              <ResponsiveContainer sx={licenseUsageChartContainerStyles}>
                <BarChart data={usageData} margin={{ top: 16, right: 16, left: 0, bottom: 40 }}>
                  <XAxis dataKey="software" />
                  <YAxis />
                  <TooltipChart />
                  <Legend verticalAlign="bottom" />
                  <Bar dataKey="assigned" fill="#1976d2" name="Assigned">
                    <LabelList dataKey="assigned" position="top" />
                  </Bar>
                  <Bar
                    dataKey="purchased"
                    fill="rgba(25, 118, 210, 0.3)"
                    stroke="#1976d2"
                    name="Purchased"
                  >
                    <LabelList dataKey="purchased" position="top" />
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
              <Box sx={licenseTotalsBoxStyles}>
                <Typography>
                  <strong>Total Assigned:</strong> {totals.assigned}
                </Typography>
                <Typography>
                  <strong>Total Purchased:</strong> {totals.purchased}
                </Typography>
                {totals.assigned > totals.purchased && (
                  <Box sx={overUsageAlertStyles}>
                    <WarningAmberIcon />
                    <Typography>Over Usage</Typography>
                  </Box>
                )}
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </Box>
  )
}
