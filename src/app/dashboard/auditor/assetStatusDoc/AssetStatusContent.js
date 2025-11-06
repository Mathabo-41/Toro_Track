// MODIFIED: ./auditor/assetStaDoc/AssetStatusContent.js
'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { createSupabaseClient } from '@/lib/supabase/client';
import {
  Box, Typography, List, ListItem,
  ListItemText, Drawer, ListItemButton,
  Paper, TextField, Button, IconButton,
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow
} from '@mui/material';

import DashboardIcon from '@mui/icons-material/Dashboard';
import { Logout as LogoutIcon } from '@mui/icons-material';
import { Snackbar, Alert } from '@mui/material';

import useAssetStatusDoc from './useAssetStaDoc/useAssetStaDoc';
import * as globalStyles from '../common/styles';
import * as styles from './styles';
import { auditorMenu } from '../common/auditorStore';

const Sidebar = ({ handleLogout, currentUser }) => {
  const router = useRouter();
  return (
    <Drawer
      variant="permanent"
      anchor="left"
      sx={{ '& .MuiDrawer-paper': globalStyles.drawerPaper }}
    >
      <Box sx={{ p: 1, borderBottom: '2px solid #6b705c', display: 'flex', alignItems: 'center', gap: 1 }}>
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
            <ListItemButton component={Link} href={item.path} sx={globalStyles.listItemButton} onMouseEnter={() => router.prefetch(item.path)}>
              <ListItemText primary={item.name} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Box sx={{ padding: '1rem', borderTop: '2px solid #6b705c', marginTop: 'auto' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2, gap: 1.5 }}>
            <Image src="/toroLogo.jpg" alt="User Profile" width={40} height={40} style={{ borderRadius: '50%', border: '2px solid #f3722c' }} />
            <Box sx={{ minWidth: 0 }}>
                <Typography noWrap sx={{ fontWeight: '600', color: '#fefae0' }}>{currentUser?.email}</Typography>
                <Typography variant="caption" noWrap sx={{ color: 'rgba(254, 250, 224, 0.7)' }}>Auditor</Typography>
            </Box>
        </Box>
        <Button onClick={handleLogout} fullWidth sx={{ padding: '0.75rem', background: 'transparent', border: '1px solid #fefae0', borderRadius: '8px', color: '#fefae0', cursor: 'pointer', transition: 'all 0.3s ease', fontWeight: '600', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', '&:hover': { background: '#6b705c' } }}>
          <LogoutIcon /> Logout
        </Button>
      </Box>
    </Drawer>
  );
};

const Header = ({ search, handleSearchChange }) => {
  return (
    <Box sx={globalStyles.pageHeader}>
      <Box sx={{ flexGrow: 1 }}>
        <Typography variant="h4" sx={styles.assetStatusTitle}>
          Asset Status & Documentation
        </Typography>
        <Typography variant="subtitle1" sx={styles.assetStatusSubtitle}>
          A clear view of each asset&apos;s lifecycle and associated paperwork.
        </Typography>
      </Box>
      <Box sx={styles.headerRightSectionStyles}>
        <TextField
          variant="outlined"
          placeholder="Search records..."
          value={search}
          onChange={handleSearchChange}
          sx={styles.searchFieldStyles}
        />
      </Box>
    </Box>
  );
};

export default function AssetStatusContent() {
  const supabase = createSupabaseClient();
  const router = useRouter();
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  /*
  Fetches the current user's data when the component loads.
  */
  useEffect(() => {
    const fetchUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setCurrentUser(user);
    };
    fetchUser();
  }, [supabase.auth]);

  const handleLogout = () => {
    setOpenSnackbar(true);
    setTimeout(() => { router.push('/login'); }, 1500);
  };

  const { state, handlers } = useAssetStatusDoc();

  return (
    <Box sx={globalStyles.rootBox}>
      <Sidebar handleLogout={handleLogout} currentUser={currentUser} />

      <Box component="main" sx={globalStyles.mainContentBox}>
        <Header search={state.search} handleSearchChange={handlers.handleSearchChange} />

        <Box sx={{ display: 'grid', gap: 4 }}>
          {/* Status Dashboard Table */}
          <Paper elevation={3} sx={{ p: 2, backgroundColor: '#fefae0' }}>
            <Typography variant="h6" sx={styles.assetStatusSectionTitle}>
              Status Dashboard
            </Typography>
            <TableContainer component={Paper} sx={styles.tableContainerStyles}>
              <Table aria-label="status dashboard table">
                <TableHead>
                  <TableRow>
                    <TableCell sx={styles.tableHeaderCellStyles}>Order ID</TableCell>
                    <TableCell sx={styles.tableHeaderCellStyles}>Asset Type & Serial Number</TableCell>
                    <TableCell sx={styles.tableHeaderCellStyles}>Delivery Status</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {state.filteredStatusData.map((item, idx) => (
                    <TableRow key={idx} hover>
                      <TableCell>{item.orderId}</TableCell>
                      <TableCell>{item.asset}</TableCell>
                      <TableCell>{item.status}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>

          {/* Document Attachment Table */}
          <Paper elevation={3} sx={{ p: 2, backgroundColor: '#fefae0' }}>
            <Typography variant="h6" sx={styles.assetStatusSectionTitle}>
              Document Attachment Support
            </Typography>
            <TableContainer component={Paper} sx={styles.tableContainerStyles}>
              <Table aria-label="document attachment table">
                <TableHead>
                  <TableRow>
                    <TableCell sx={styles.tableHeaderCellStyles}>Document Name</TableCell>
                    <TableCell sx={styles.tableHeaderCellStyles}>Document Type</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {state.filteredDocumentsData.map((doc, idx) => (
                    <TableRow key={idx} hover>
                      <TableCell>{doc.name}</TableCell>
                      <TableCell>{doc.type}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>

          {/* Client Information Table */}
          <Paper elevation={3} sx={{ p: 2, backgroundColor: '#fefae0' }}>
            <Typography variant="h6" sx={styles.assetStatusSectionTitle}>
              Client Information
            </Typography>
            <TableContainer component={Paper} sx={styles.tableContainerStyles}>
              <Table aria-label="client information table">
                <TableHead>
                  <TableRow>
                    <TableCell sx={styles.tableHeaderCellStyles}>Order ID</TableCell>
                    <TableCell sx={styles.tableHeaderCellStyles}>Date & Time</TableCell>
                    <TableCell sx={styles.tableHeaderCellStyles}>Receiver Full Name</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {state.filteredClientInfo.map((info, idx) => (
                    <TableRow key={idx} hover>
                      <TableCell>{info.orderId}</TableCell>
                      <TableCell>{new Date(info.timestamp).toLocaleString()}</TableCell>
                      <TableCell>{info.receiver}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Box>
      </Box>

      {/* Snackbar (unchanged) */}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={1500}
        onClose={() => setOpenSnackbar(false)}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert severity="success" sx={{ width: '100%', fontWeight: 'bold', fontSize: '1.2rem' }}>
          Logging out...
        </Alert>
      </Snackbar>
    </Box>
  );
}