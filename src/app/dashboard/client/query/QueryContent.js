// This is the main UI component for the Raise Query screen.
'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import {
  Box, Typography, Card, CardContent,
  Stack, Button, Drawer, ListItemButton,
  List, Grid, ListItem, ListItemText,
  TextField, Select, MenuItem,
  FormControl, InputLabel, Chip,
  Paper, Table, TableBody, TableCell,
  TableContainer, TableHead, TableRow,
  IconButton, Snackbar, Alert, AppBar, Toolbar
} from '@mui/material';
import {
  Help as QueryIcon,
  Send as SendIcon,
  ArrowBack as BackIcon,
  AttachFile as AttachIcon,
  Delete as DeleteIcon,
  Logout as LogoutIcon,
  Menu as MenuIcon
} from '@mui/icons-material';
import DashboardIcon from '@mui/icons-material/Dashboard';

import { createSupabaseClient } from '@/lib/supabase/client';
import { useRaiseQuery } from './useRaiseQuery/useRaiseQuery';
import * as styles from './styles';
import * as globalStyles from '../common/styles';
import { useClientStore, clientMenu } from '../common/clientStore';

// Define drawer width for responsiveness
const drawerWidth = 260;

export default function QueryContent() {
  const supabase = createSupabaseClient();
  const router = useRouter();

  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'info' });

  const {
    activeQuery,
    setActiveQuery,
    newQuery,
    setNewQuery,
    fileToUpload,
    handleFileChange,
    handleRemoveFile,
    handleSubmitQuery,
    queries,
    isSubmitting,
  } = useRaiseQuery({
    onSuccess: (message) => showSnackbar(message, 'success'),
    onError: (message) => showSnackbar(message, 'error'),
  });

  const { profile, fetchProfile } = useClientStore();
  const [currentUser, setCurrentUser] = useState(null);

  // State for responsive drawer
  const [mobileOpen, setMobileOpen] = useState(false);

  /**
   * Toggles the mobile drawer
   */
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  /**
   * Displays a snackbar notification
   */
  const showSnackbar = (message, severity = 'success') => {
    setSnackbar({ open: true, message, severity });
  };

  /**
   * Fetches the current authenticated user
   */
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const { data: { user }, error } = await supabase.auth.getUser();
        if (error) throw error;
        setCurrentUser(user);
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };
    fetchUser();
  }, [supabase]);

  /**
   * Fetches the client profile if it doesn't exist
   */
  useEffect(() => {
    // Handle failure case first
    if (profile) {
      return;
    }
    
    try {
      fetchProfile();
    } catch (error) {
      console.error("Error fetching profile:", error);
      showSnackbar('Could not load profile data', 'error');
    }
  }, [profile, fetchProfile]);

  /**
   * Handles user logout
   */
  const handleLogout = async () => {
    showSnackbar('Logging out...', 'success');
    setTimeout(async () => {
      try {
        await supabase.auth.signOut();
        router.push('/login');
      } catch (error) {
        console.error("Error during logout:", error);
        showSnackbar('Logout failed. Please try again.', 'error');
      }
    }, 1500);
  };

  /**
   * Closes the snackbar
   */
  const handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbar({ ...snackbar, open: false });
  };

  /**
   * Renders a status chip with appropriate styling
   */
  const renderChip = (status) => {
    const props = styles.detailChip(status);
    return <Chip label={status} sx={props.sx} icon={props.icon} size="small" />;
  };

  /**
   * Reusable Drawer Content
   */
  const drawerContent = (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <Box sx={{ p: 1, borderBottom: '2px solid #6b705c', display: 'flex', alignItems: 'center', gap: 1 }}>
        <Link href="/dashboard/client/details" passHref>
          <IconButton sx={{ color: 'green' }} aria-label="Go to Dashboard">
            <DashboardIcon />
          </IconButton>
        </Link>
        <Typography variant="h5" sx={{ color: '#fefae0' }}>Client Portal</Typography>
      </Box>
      <List>
        {clientMenu.map((item) => (
          <ListItem key={item.path} disablePadding>
            <ListItemButton 
              component={Link} 
              href={item.path} 
              sx={globalStyles.listItemButton}
              onClick={() => mobileOpen && handleDrawerToggle()} // Close mobile drawer on nav
            >
              <ListItemText primary={item.name} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>

      {/* Profile Section */}
      <Box sx={{ padding: '1rem', borderTop: '2px solid #6b705c', marginTop: 'auto' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: '1rem', overflow: 'hidden', gap: '0.75rem' }}>
          <Box sx={{ width: '40px', height: '40px', borderRadius: '50%', overflow: 'hidden', position: 'relative', flexShrink: 0, border: '2px solid #f3722c' }}>
            <Image
              src={profile?.avatar_url || currentUser?.user_metadata?.avatar_url || "/toroLogo.jpg"}
              alt="User Profile"
              fill
              style={{ objectFit: 'cover' }}
              onError={(e) => { e.target.src = "/toroLogo.jpg"; }} // Fallback
            />
          </Box>
          <Box sx={{ minWidth: 0 }}>
            <Typography noWrap sx={{ fontWeight: '600', color: '#fefae0' }}>
              {profile?.name || currentUser?.user_metadata?.full_name || 'Client Name'}
            </Typography>
            <Typography noWrap sx={{ fontSize: '0.8rem', opacity: 0.8, color: 'rgba(254, 250, 224, 0.7)' }}>
              {profile?.email || currentUser?.email || 'client@email.com'}
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
    </Box>
  );

  return (
    <Box sx={{ ...globalStyles.rootBox, display: 'flex' }}>
      {/* Sidebar Navigation */}
      <Box
        component="nav"
        sx={{ width: { md: drawerWidth }, flexShrink: { md: 0 } }}
        aria-label="client menu"
      >
        {/* Temporary Drawer for Mobile */}
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', md: 'none' },
            '& .MuiDrawer-paper': {
              ...globalStyles.drawerPaper,
              boxSizing: 'border-box',
              width: drawerWidth,
            }
          }}
        >
          {drawerContent}
        </Drawer>
        
        {/* Permanent Drawer for Desktop */}
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', md: 'block' },
            '& .MuiDrawer-paper': {
              ...globalStyles.drawerPaper,
              boxSizing: 'border-box',
              width: drawerWidth,
            }
          }}
          open
        >
          {drawerContent}
        </Drawer>
      </Box>

      {/* Main Content */}
      <Box
        component="main"
        sx={{
          ...styles.mainContentBox, // Keep original styles
          flexGrow: 1,
          width: { xs: '100%', md: `calc(100% - ${drawerWidth}px)` },
          ml: { xs: 0, md: `${drawerWidth}px` }, // No margin on mobile
          p: 0 // Remove default padding
        }}
      >
        {/* Responsive App Bar for Mobile */}
        <AppBar
          position="static"
          sx={{
            display: { xs: 'flex', md: 'none' }, // Only show on mobile
            backgroundColor: '#283618', // Match drawer header
            paddingTop: 'env(safe-area-inset-top)'
          }}
        >
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" noWrap component="div" sx={{ color: '#fefae0' }}>
              {activeQuery ? 'Query Details' : 'Raise a Query'}
            </Typography>
          </Toolbar>
        </AppBar>

        {/* Page Header for Desktop */}
        <Box sx={{ ...styles.pageHeader, display: { xs: 'none', md: 'flex' } }}>
          <Typography variant="h4" sx={styles.pageHeaderText}>
            <QueryIcon sx={styles.pageHeaderIcon} />
            {activeQuery ? 'Query Details' : 'Raise a Query'}
          </Typography>
          <Typography variant="body1" sx={styles.pageHeaderSubtitle}>
            {activeQuery ? 'View and manage your query' : 'Submit questions or issues'}
          </Typography>
        </Box>

        {/* Responsive Content Area */}
        <Box sx={{ p: { xs: 2, md: 3 } }}>
          {activeQuery ? (
            /* Query Detail View */
            <Card sx={styles.detailCard}>
              <CardContent sx={{ p: { xs: 2, sm: 3 } }}>
                <Button startIcon={<BackIcon />} onClick={() => setActiveQuery(null)} sx={styles.detailBackButton}>
                  Back to queries
                </Button>
                <Stack 
                  direction={{ xs: 'column-reverse', sm: 'row' }} // Stack chip below on mobile
                  justifyContent="space-between" 
                  alignItems={{ xs: 'flex-start', sm: 'center' }} 
                  sx={{ mb: 3 }}
                  spacing={1}
                >
                  <Typography variant="h5" sx={styles.detailTitle}>{activeQuery.title}</Typography>
                  {renderChip(activeQuery.status)}
                </Stack>
                <Box sx={{ mb: 3 }}>
                  <Typography variant="body2" sx={styles.detailSectionTitle}>Category</Typography>
                  <Typography variant="body1" sx={styles.detailSectionText}>{activeQuery.category}</Typography>
                  <Typography variant="body2" sx={styles.detailSectionTitle}>Submitted on</Typography>
                  <Typography variant="body1" sx={styles.detailSectionText}>{activeQuery.date}</Typography>
                  <Typography variant="body2" sx={styles.detailSectionTitle}>Description</Typography>
                  <Typography variant="body1" sx={{ ...styles.detailSectionText, whiteSpace: 'pre-wrap' }}>{activeQuery.description}</Typography>
                </Box>
                {activeQuery.attachments && activeQuery.attachments.length > 0 && (
                  <Box sx={{ mb: 3 }}>
                    <Typography variant="body2" sx={styles.detailSectionTitle}>Attachments</Typography>
                    <TableContainer component={Paper} sx={styles.attachmentsTableContainer}>
                      <Table size="small">
                        <TableBody>
                          {activeQuery.attachments.map((file, index) => (
                            <TableRow key={index}>
                              <TableCell sx={{ ...styles.attachmentsTableFileText, p: 1 }}>
                                <Stack direction="row" alignItems="center" spacing={1}>
                                  <AttachIcon fontSize="small" sx={{ color: '#f3722c' }} />
                                  <Typography variant="body2">{file.name}</Typography>
                                </Stack>
                              </TableCell>
                              <TableCell sx={{ ...styles.attachmentsTableFileSize, p: 1, display: { xs: 'none', sm: 'table-cell' } }}>
                                {file.size}
                              </TableCell>
                              <TableCell sx={{ p: 1, textAlign: 'right' }}>
                                <Button variant="outlined" size="small" sx={styles.attachmentsDownloadButton}>Download</Button>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </Box>
                )}
                {activeQuery.response && (
                  <Box sx={styles.responseBox}>
                    <Typography variant="body2" sx={styles.responseTitle}>Response from Team</Typography>
                    <Typography variant="body1" sx={{ ...styles.responseText, whiteSpace: 'pre-wrap' }}>
                      {activeQuery.response}
                    </Typography>
                  </Box>
                )}
              </CardContent>
            </Card>
          ) : (
            /* Main Query View (List + Form) */
            <Grid container spacing={3}>
              {/* New Query Form */}
              <Grid item xs={12} md={5}>
                <Card sx={styles.formCard}>
                  <CardContent>
                    <Typography variant="h6" sx={styles.formHeader}>Submit New Query</Typography>
                    <Box component="form" onSubmit={handleSubmitQuery}>
                      <Stack spacing={2.5}>
                        <TextField fullWidth label="Query Title" variant="outlined" value={newQuery.title} onChange={(e) => setNewQuery({ ...newQuery, title: e.target.value })} required sx={styles.formTextField} />
                        <FormControl fullWidth>
                          <InputLabel sx={{ color: '#525252' }}>Category</InputLabel>
                          <Select value={newQuery.category} onChange={(e) => setNewQuery({ ...newQuery, category: e.target.value })} label="Category" required sx={styles.formSelect}>
                            <MenuItem value="Technical">Technical</MenuItem>
                            <MenuItem value="Design">Design</MenuItem>
                            <MenuItem value="Billing">Billing</MenuItem>
                            <MenuItem value="Documentation">Documentation</MenuItem>
                            <MenuItem value="Other">Other</MenuItem>
                          </Select>
                        </FormControl>
                        <TextField fullWidth label="Description" variant="outlined" multiline rows={4} value={newQuery.description} onChange={(e) => setNewQuery({ ...newQuery, description: e.target.value })} required sx={styles.formTextField} />
                        <Box>
                          <Button component="label" variant="outlined" startIcon={<AttachIcon />} sx={styles.attachButton}>
                            Attach File
                            <input type="file" hidden onChange={handleFileChange} />
                          </Button>
                          {fileToUpload && (
                            <Box sx={styles.attachedFileBox}>
                              <Typography variant="body2" sx={styles.attachedFileText} noWrap>
                                {fileToUpload.name} ({Math.round(fileToUpload.size / 1024)} KB)
                              </Typography>
                              <IconButton size="small" onClick={handleRemoveFile} sx={styles.attachedFileDeleteButton}><DeleteIcon fontSize="small" /></IconButton>
                            </Box>
                          )}
                        </Box>
                        <Button type="submit" variant="contained" startIcon={<SendIcon />} fullWidth sx={styles.submitButton} disabled={isSubmitting}>
                          {isSubmitting ? 'Submitting...' : 'Submit Query'}
                        </Button>
                      </Stack>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
              {/* Previous Queries */}
              <Grid item xs={12} md={7}>
                <Card sx={styles.queriesCard}>
                  <CardContent>
                    <Typography variant="h6" sx={styles.queriesHeader}>Your Previous Queries</Typography>
                    {queries.length > 0 ? (
                      <TableContainer component={Paper} sx={styles.queriesTableContainer}>
                        <Table>
                          <TableHead>
                            <TableRow>
                              <TableCell sx={styles.queriesTableCellHeader}>Query</TableCell>
                              <TableCell sx={{...styles.queriesTableCellHeader, display: { xs: 'none', sm: 'table-cell' } }}>Category</TableCell>
                              <TableCell sx={styles.queriesTableCellHeader}>Status</TableCell>
                              <TableCell sx={{...styles.queriesTableCellHeader, display: { xs: 'none', md: 'table-cell' } }}>Date</TableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            {queries.map((query) => (
                              <TableRow key={query.id} hover onClick={() => setActiveQuery(query)} sx={styles.queriesTableRow}>
                                <TableCell sx={styles.queriesTableCell}>{query.title}</TableCell>
                                <TableCell sx={{...styles.queriesTableCell, display: { xs: 'none', sm: 'table-cell' } }}>{query.category}</TableCell>
                                <TableCell><Chip label={query.status} sx={styles.queriesStatusChip(query.status)} size="small" /></TableCell>
                                <TableCell sx={{...styles.queriesTableCell, display: { xs: 'none', md: 'table-cell' } }}>{query.date}</TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </TableContainer>
                    ) : (
                      <Box sx={styles.noQueriesBox}>
                        <Typography variant="body1" sx={styles.noQueriesText}>You haven&apos;t submitted any queries yet.</Typography>
                      </Box>
                    )}
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          )}
        </Box>
      </Box>

      {/* Snackbar for notifications */}
      <Snackbar 
        open={snackbar.open} 
        autoHideDuration={4000} 
        onClose={handleSnackbarClose} 
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert 
          onClose={handleSnackbarClose} 
          severity={snackbar.severity} 
          sx={{ 
            width: '100%', 
            fontWeight: 'bold',
            fontSize: '1.2rem',
            // Match color scheme from other screens
            backgroundColor: 
              snackbar.severity === 'success' ? '#2e7d32' :
              snackbar.severity === 'error' ? '#d32f2f' :
              snackbar.severity === 'info' ? '#283618' : 
              snackbar.severity === 'warning' ? '#ed6c02' : '#606c38',
            color: '#fefae0'
          }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
}