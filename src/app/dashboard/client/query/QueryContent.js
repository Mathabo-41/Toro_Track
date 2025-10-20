// This is the main UI component for the Raise Query screen.
'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import {
  Box, Typography, Card, CardContent,
  Stack, Button, Drawer, ListItemButton,
  List, Grid, ListItem, ListItemText,
  Divider, TextField, Select, MenuItem,
  FormControl, InputLabel, Chip,
  Paper, Table, TableBody, TableCell,
  TableContainer, TableHead, TableRow,
  IconButton, Snackbar, Alert
} from '@mui/material';
import {
  Help as QueryIcon,
  Send as SendIcon,
  ArrowBack as BackIcon,
  AttachFile as AttachIcon,
  Delete as DeleteIcon,
  Logout as LogoutIcon
} from '@mui/icons-material';
import DashboardIcon from '@mui/icons-material/Dashboard';

import { createSupabaseClient } from '@/lib/supabase/client';
import { useRaiseQuery } from './useRaiseQuery/page';
import * as styles from './styles';
import * as globalStyles from '../common/styles';
import { useClientStore, clientMenu } from '../common/clientStore';

export default function QueryContent() {
  const supabase = createSupabaseClient();
  const router = useRouter();

  const [snackbar, setSnackbar] = React.useState({ open: false, message: '', severity: 'info' });

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
    onSuccess: (message) => setSnackbar({ open: true, message, severity: 'success' }),
    onError: (message) => setSnackbar({ open: true, message, severity: 'error' }),
  });

  const { profile, fetchProfile } = useClientStore();
  const [sidebarOpen] = React.useState(true);
  const [currentUser, setCurrentUser] = React.useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setCurrentUser(user);
    };
    fetchUser();
  }, [supabase]);

  useEffect(() => {
    if (!profile) {
      fetchProfile();
    }
  }, [profile, fetchProfile]);

  const handleLogout = async () => {
    setSnackbar({ open: true, message: 'Logging out...', severity: 'success' });
    setTimeout(async () => {
      await supabase.auth.signOut();
      router.push('/login');
    }, 1500);
  };

  const handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbar({ ...snackbar, open: false });
  };
  
  const renderChip = (status) => {
    const props = styles.detailChip(status);
    return <Chip label={status} sx={props.sx} icon={props.icon} size="small" />;
  };

  return (
    <Box sx={globalStyles.rootBox}>
      {/* Sidebar Navigation */}
      <Drawer
        variant="permanent"
        anchor="left"
        sx={{ '& .MuiDrawer-paper': globalStyles.drawerPaper }}
      >
        <Box sx={{ p: 1, borderBottom: '2px solid #6b705c', display: 'flex', alignItems: 'center', gap: 1 }}>
          <Link href="/dashboard/client/details" passHref>
            <IconButton sx={{ color: 'green' }} aria-label="Go to Dashboard">
              <DashboardIcon />
            </IconButton>
          </Link>
          <Typography variant="h5" sx={{ color: '#fefae0'}}>Client Portal</Typography>
        </Box>
        <List>
          {clientMenu.map((item) => (
            <ListItem key={item.path} disablePadding>
              <ListItemButton component={Link} href={item.path} sx={globalStyles.listItemButton}>
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
              />
            </Box>
            {sidebarOpen && (
              <Box sx={{ minWidth: 0 }}>
                <Typography sx={{ fontWeight: '600', margin: 0, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', color: '#fefae0' }}>
                  {profile?.name || currentUser?.user_metadata?.full_name || 'Client Name'}
                </Typography>
                <Typography sx={{ fontSize: '0.8rem', opacity: 0.8, margin: 0, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', color: 'rgba(254, 250, 224, 0.7)' }}>
                  {profile?.email || currentUser?.email || 'client@email.com'}
                </Typography>
              </Box>
            )}
          </Box>
          <Button
            onClick={handleLogout}
            fullWidth
            sx={{ padding: '0.75rem', background: 'transparent', border: '1px solid #fefae0', borderRadius: '8px', color: '#fefae0', cursor: 'pointer', transition: 'all 0.3s ease', fontWeight: '600', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', '&:hover': { background: '#6b705c' } }}
          >
            {sidebarOpen ? 'Logout' : <LogoutIcon />}
          </Button>
        </Box>
      </Drawer>

      {/* Main Content */}
      <Box component="main" sx={styles.mainContentBox}>
        <Box sx={styles.pageHeader}>
          <Typography variant="h4" sx={styles.pageHeaderText}>
            <QueryIcon sx={styles.pageHeaderIcon} />
            {activeQuery ? 'Query Details' : 'Raise a Query'}
          </Typography>
          <Typography variant="body1" sx={styles.pageHeaderSubtitle}>
            {activeQuery ? 'View and manage your query' : 'Submit questions or issues about your project'}
          </Typography>
        </Box>
        {activeQuery ? (
          /* Query Detail View */
          <Card sx={styles.detailCard}>
            <CardContent>
              <Button startIcon={<BackIcon />} onClick={() => setActiveQuery(null)} sx={styles.detailBackButton}>
                Back to queries
              </Button>
              <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 3 }}>
                <Typography variant="h5" sx={styles.detailTitle}>{activeQuery.title}</Typography>
                {renderChip(activeQuery.status)}
              </Stack>
              <Box sx={{ mb: 3 }}>
                <Typography variant="body2" sx={styles.detailSectionTitle}>Category</Typography>
                <Typography variant="body1" sx={styles.detailSectionText}>{activeQuery.category}</Typography>
                <Typography variant="body2" sx={styles.detailSectionTitle}>Submitted on</Typography>
                <Typography variant="body1" sx={styles.detailSectionText}>{activeQuery.date}</Typography>
                <Typography variant="body2" sx={styles.detailSectionTitle}>Description</Typography>
                <Typography variant="body1" sx={styles.detailSectionText}>{activeQuery.description}</Typography>
              </Box>
              {activeQuery.attachments && activeQuery.attachments.length > 0 && (
                <Box sx={{ mb: 3 }}>
                  <Typography variant="body2" sx={styles.detailSectionTitle}>Attachments</Typography>
                  <TableContainer component={Paper} sx={styles.attachmentsTableContainer}>
                    <Table>
                      <TableBody>
                        {activeQuery.attachments.map((file, index) => (
                          <TableRow key={index}>
                            <TableCell sx={styles.attachmentsTableFileText}>
                              <Stack direction="row" alignItems="center" spacing={1}>
                                <AttachIcon fontSize="small" sx={{ color: '#f3722c' }} />
                                <Typography>{file.name}</Typography>
                              </Stack>
                            </TableCell>
                            <TableCell sx={styles.attachmentsTableFileSize}>{file.size}</TableCell>
                            <TableCell>
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
                  <Typography variant="body1" sx={styles.responseText}>{activeQuery.response}</Typography>
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
                    <Stack spacing={2}>
                      <TextField fullWidth label="Query Title" variant="outlined" value={newQuery.title} onChange={(e) => setNewQuery({ ...newQuery, title: e.target.value })} required sx={styles.formTextField}/>
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
                      <TextField fullWidth label="Description" variant="outlined" multiline rows={4} value={newQuery.description} onChange={(e) => setNewQuery({ ...newQuery, description: e.target.value })} required sx={styles.formTextField}/>
                      <Box>
                        <Button component="label" variant="outlined" startIcon={<AttachIcon />} sx={styles.attachButton}>
                          Attach File
                          <input type="file" hidden onChange={handleFileChange}/>
                        </Button>
                        {fileToUpload && (
                          <Box sx={styles.attachedFileBox}>
                            <Typography variant="body2" sx={styles.attachedFileText}>{fileToUpload.name} ({Math.round(fileToUpload.size / 1024)} KB)</Typography>
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
                            <TableCell sx={styles.queriesTableCellHeader}>Category</TableCell>
                            <TableCell sx={styles.queriesTableCellHeader}>Status</TableCell>
                            <TableCell sx={styles.queriesTableCellHeader}>Date</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {queries.map((query) => (
                            <TableRow key={query.id} hover onClick={() => setActiveQuery(query)} sx={styles.queriesTableRow}>
                              <TableCell sx={styles.queriesTableCell}>{query.title}</TableCell>
                              <TableCell sx={styles.queriesTableCell}>{query.category}</TableCell>
                              <TableCell><Chip label={query.status} sx={styles.queriesStatusChip(query.status)} size="small"/></TableCell>
                              <TableCell sx={styles.queriesTableCell}>{query.date}</TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </TableContainer>
                  ) : (
                    <Box sx={styles.noQueriesBox}>
                      <Typography variant="body1" sx={styles.noQueriesText}>You haven't submitted any queries yet.</Typography>
                    </Box>
                  )}
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        )}
      </Box>
      <Snackbar open={snackbar.open} autoHideDuration={4000} onClose={handleSnackbarClose} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
        <Alert onClose={handleSnackbarClose} severity={snackbar.severity} sx={{ width: '100%', fontWeight: 'bold' }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
}