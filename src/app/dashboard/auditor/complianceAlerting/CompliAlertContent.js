// ./auditor/complianceAlerting/CompliAlertContent.js
'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { createSupabaseClient } from '@/lib/supabase/client';
import {
  Box, Typography, List, ListItem, ListItemText, Drawer,
  ListItemButton, Paper, TextField, Button, IconButton, Grid,
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Chip,
  Card, CardContent
} from '@mui/material';

// Import icons
import DashboardIcon from '@mui/icons-material/Dashboard';
import { 
  Logout as LogoutIcon, 
  FileDownload as FileDownloadIcon,
  Search as SearchIcon 
} from '@mui/icons-material';
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import BackupIcon from '@mui/icons-material/Backup';

// Snackbar
import { Snackbar, Alert } from '@mui/material';

// Import styles
import {
  mainContentBoxStyles, headerBoxStyles, pageTitleStyles, headerRightSectionStyles,
  searchFieldStyles, compliancePaperStyles, complianceFeatureTitleStyles,
  exportButtonStyles, activeAlertsTableContainerStyles, tableHeaderCellStyles,
  getSeverityChipColor, securityComplianceSectionStyles, securityListItemStyles
} from './styles';
import { useCompliance } from './useCompliance/page';

// Import global styles for layout and navigation
import * as globalStyles from '../common/styles';
import { auditorMenu } from '../common/auditorStore';

export default function CompliAlertContent() {
  const supabase = createSupabaseClient();
  const {
    search,
    handleSearchChange,
    filteredAlerts,
    securityChecks,
    handleExport,
    isLoading,
    isError
  } = useCompliance();

  const router = useRouter();
  const [openSnackbar, setOpenSnackbar] = React.useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  /*
  Fetches the current user data from Supabase auth.
  */
  useEffect(() => {
    const fetchUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setCurrentUser(user);
    };
    fetchUser();
  }, []);

  /*
  Handles user logout and redirects to the login page.
  */
  const handleLogout = () => {
    setOpenSnackbar(true);
    setTimeout(async () => {
      await supabase.auth.signOut();
      router.push('/login');
    }, 1500);
  };

  const securityIcons = {
    'Firewall & VPN Audits': <VpnKeyIcon color="success" />,
    'Access Control': <AdminPanelSettingsIcon color="warning" />,
    'Backup Integrity': <BackupIcon color="info" />,
  };

  return (
    <Box sx={globalStyles.rootBox}>
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
        
        <Box sx={{ 
          mt: 'auto', 
          p: 2, 
          borderTop: '2px solid #6b705c' 
        }}>
          <Box sx={{ 
            display: 'flex', 
            alignItems: 'center', 
            mb: 2, 
            gap: 1.5 
          }}>
            <Image 
              src="/toroLogo.jpg" 
              alt="User Profile" 
              width={40} 
              height={40} 
              style={{ 
                borderRadius: '50%', 
                border: '2px solid #f3722c' 
              }} 
            />
            <Box sx={{ minWidth: 0 }}>
              <Typography noWrap sx={{ 
                fontWeight: '600', 
                color: '#fefae0' 
              }}>
                {currentUser?.email}
              </Typography>
              <Typography variant="caption" noWrap sx={{ 
                color: 'rgba(254, 250, 224, 0.7)' 
              }}>
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

      <Box component="main" sx={mainContentBoxStyles}>
        {/* Header Section */}
        <Box sx={headerBoxStyles}>
          <Box>
            <Typography variant="h4" sx={pageTitleStyles}>
              Compliance & Alerting
            </Typography>
            <Typography variant="subtitle1" sx={{ 
              color: '#606c38', 
              mt: 1,
              fontWeight: 500 
            }}>
              Monitor security compliance and manage active alerts
            </Typography>
          </Box>
          <Box sx={headerRightSectionStyles}>
            <TextField
              variant="outlined"
              placeholder="Search by client, alert, etc."
              value={search}
              onChange={handleSearchChange}
              sx={searchFieldStyles}
              InputProps={{
                startAdornment: <SearchIcon sx={{ color: '#6b705c', mr: 1 }} />
              }}
              size="small"
            />
            <Button
              variant="contained"
              startIcon={<FileDownloadIcon />}
              onClick={handleExport}
              sx={exportButtonStyles}
              size="large"
            >
              Export Report
            </Button>
          </Box>
        </Box>

        <Grid container spacing={4} sx={{ mt: 2 }}>
          {/* Active Alerts Section */}
          <Grid item xs={12}>
            <Card sx={compliancePaperStyles}>
              <CardContent>
                <Typography variant="h5" sx={complianceFeatureTitleStyles}>
                  Active Alerts
                </Typography>
                
                <TableContainer sx={activeAlertsTableContainerStyles}>
                  <Table aria-label="active alerts table">
                    <TableHead>
                      <TableRow>
                        <TableCell sx={tableHeaderCellStyles}>Severity</TableCell>
                        <TableCell sx={tableHeaderCellStyles}>Client Name</TableCell>
                        <TableCell sx={tableHeaderCellStyles}>Alert Details</TableCell>
                        <TableCell sx={tableHeaderCellStyles}>Timestamp</TableCell>
                        <TableCell sx={tableHeaderCellStyles}>Status</TableCell>
                        <TableCell sx={tableHeaderCellStyles}>Assigned To</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {isLoading && (
                        <TableRow>
                          <TableCell colSpan={6} align="center" sx={{ py: 3 }}>
                            <Typography variant="body2" sx={{ fontStyle: 'italic' }}>
                              Loading alerts...
                            </Typography>
                          </TableCell>
                        </TableRow>
                      )}
                      
                      {isError && (
                        <TableRow>
                          <TableCell colSpan={6} align="center" sx={{ 
                            py: 3, 
                            color: 'error.main' 
                          }}>
                            <Typography variant="body2" fontWeight="medium">
                              Error fetching alerts. Please try again.
                            </Typography>
                          </TableCell>
                        </TableRow>
                      )}
                      
                      {!isLoading && !isError && filteredAlerts.length === 0 && (
                        <TableRow>
                          <TableCell colSpan={6} align="center" sx={{ py: 4 }}>
                            <Typography variant="body1" sx={{ 
                              fontStyle: 'italic', 
                              color: 'text.secondary' 
                            }}>
                              {search ? 'No matching alerts found' : 'No active alerts'}
                            </Typography>
                          </TableCell>
                        </TableRow>
                      )}
                      
                      {filteredAlerts.map((alert) => (
                        <TableRow 
                          key={alert.id} 
                          hover
                          sx={{ 
                            '&:last-child td, &:last-child th': { border: 0 },
                            transition: 'background-color 0.2s ease-in-out'
                          }}
                        >
                          <TableCell>
                            <Chip 
                              label={alert.severity} 
                              color={getSeverityChipColor(alert.severity)} 
                              size="small" 
                              sx={{ 
                                fontWeight: 'bold',
                                textTransform: 'capitalize'
                              }}
                            />
                          </TableCell>
                          <TableCell>
                            <Typography variant="body2" fontWeight="medium">
                              {alert.client}
                            </Typography>
                          </TableCell>
                          <TableCell>
                            <Typography variant="body2" sx={{ 
                              maxWidth: 300,
                              overflow: 'hidden',
                              textOverflow: 'ellipsis',
                              whiteSpace: 'nowrap'
                            }}>
                              {alert.details}
                            </Typography>
                          </TableCell>
                          <TableCell>
                            <Typography variant="body2" color="text.secondary">
                              {alert.timestamp}
                            </Typography>
                          </TableCell>
                          <TableCell>
                            <Chip 
                              label={alert.status} 
                              variant="outlined"
                              size="small"
                              sx={{
                                textTransform: 'capitalize',
                                fontWeight: 'medium'
                              }}
                            />
                          </TableCell>
                          <TableCell>
                            <Typography variant="body2" sx={{
                              color: alert.assignedTo ? 'text.primary' : 'text.secondary',
                              fontStyle: alert.assignedTo ? 'normal' : 'italic'
                            }}>
                              {alert.assignedTo || 'Unassigned'}
                            </Typography>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </CardContent>
            </Card>
          </Grid>

          {/* Security & Compliance Section */}
          <Grid item xs={12}>
            <Card sx={compliancePaperStyles}>
              <CardContent>
                <Typography variant="h5" sx={complianceFeatureTitleStyles}>
                  Security & Data Compliance
                </Typography>
                
                <Paper sx={securityComplianceSectionStyles}>
                  <Grid container spacing={3}>
                    {securityChecks.map((check) => (
                      <Grid item xs={12} md={4} key={check.title}>
                        <Box sx={securityListItemStyles}>
                          <Box sx={{ 
                            display: 'flex', 
                            alignItems: 'flex-start', 
                            gap: 2 
                          }}>
                            <Box sx={{ 
                              display: 'flex', 
                              alignItems: 'center', 
                              justifyContent: 'center',
                              minWidth: 40 
                            }}>
                              {securityIcons[check.title]}
                            </Box>
                            <Box sx={{ flex: 1 }}>
                              <Typography variant="h6" sx={{ 
                                fontWeight: 'bold', 
                                color: '#283618',
                                mb: 1
                              }}>
                                {check.title}
                              </Typography>
                              <Typography variant="body2" sx={{ 
                                color: '#606c38',
                                lineHeight: 1.6,
                                mb: 2
                              }}>
                                {check.details}
                              </Typography>
                              <Chip 
                                label={check.status} 
                                size="small" 
                                color={check.status === 'Compliant' ? 'success' : 'warning'}
                                sx={{ 
                                  fontWeight: 'bold',
                                  fontSize: '0.75rem'
                                }}
                              />
                            </Box>
                          </Box>
                        </Box>
                      </Grid>
                    ))}
                  </Grid>
                </Paper>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>

      <Snackbar
        open={openSnackbar}
        autoHideDuration={1500}
        onClose={() => setOpenSnackbar(false)}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert 
          severity="success" 
          sx={{ 
            width: '100%', 
            fontWeight: 'bold', 
            fontSize: '1rem' 
          }}
        >
          Logging out...
        </Alert>
      </Snackbar>
    </Box>
  );
}