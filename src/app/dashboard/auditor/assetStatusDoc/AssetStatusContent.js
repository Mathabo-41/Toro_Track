// MODIFIED: ./auditor/assetStaDoc/AssetStatusContent.js
'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import {
  Box, Typography, List, ListItem,
  ListItemText, Drawer, ListItemButton,
  Paper, TextField, Button, IconButton,
  // NEW: Import Table components
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow
} from '@mui/material';

//dashboard icon import 
import DashboardIcon from '@mui/icons-material/Dashboard';
import { Logout as LogoutIcon } from '@mui/icons-material';
import { Snackbar, Alert } from '@mui/material';

import useAssetStatusDoc from './useAssetStaDoc/page';
// Import global styles for layout and navigation
import * as globalStyles from '../common/styles';
// NEW: Import local styles for the new table
import * as styles from './styles';
import { useAuditorStore, auditorMenu } from '../common/auditorStore';

// Sidebar component (unchanged)
const Sidebar = ({ handleLogout }) => {
  const [sidebarOpen] = React.useState(true);
  const router = useRouter();

  return (
    <Drawer
      variant="permanent"
      anchor="left"
      sx={{ '& .MuiDrawer-paper': globalStyles.drawerPaper }}
    >
      <Box sx={{ p: 1, borderBottom: '2px solid #6b705c', display: 'flex', alignItems: 'center', gap: 1 }}>
        <Link href="/dashboard" passHref>
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
        <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: '1rem', overflow: 'hidden', gap: '0.75rem' }}>
          <Box sx={{ width: '40px', height: '40px', borderRadius: '50%', overflow: 'hidden', position: 'relative', flexShrink: 0, border: '2px solid #f3722c' }}>
            <Image src="/toroLogo.jpg" alt="User Profile" fill style={{ objectFit: 'cover' }} />
          </Box>
          {sidebarOpen && (
            <Box sx={{ minWidth: 0 }}>
              <Typography sx={{ fontWeight: '600', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', color: '#fefae0' }}>
                John Doe
              </Typography>
              <Typography sx={{ fontSize: '0.8rem', opacity: 0.8, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', color: 'rgba(254, 250, 224, 0.7)' }}>
                user@toro.com
              </Typography>
            </Box>
          )}
        </Box>
        <Button onClick={handleLogout} fullWidth sx={{ padding: '0.75rem', background: 'transparent', border: '1px solid #fefae0', borderRadius: '8px', color: '#fefae0', cursor: 'pointer', transition: 'all 0.3s ease', fontWeight: '600', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', '&:hover': { background: '#6b705c' } }}>
          {sidebarOpen ? 'Logout' : <LogoutIcon />}
        </Button>
      </Box>
    </Drawer>
  );
};

// Header component with updated styles
const Header = ({ search, handleSearchChange }) => {
  return (
    <Box sx={globalStyles.pageHeader}>
      <Box sx={{ flexGrow: 1 }}>
        <Typography variant="h4" sx={styles.assetStatusTitle}>
          Asset Status & Documentation
        </Typography>
        <Typography variant="subtitle1" sx={styles.assetStatusSubtitle}>
          A clear view of each asset's lifecycle and associated paperwork.
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

// REMOVED: Generic DataSection component

// Main page component
export default function AssetStatusContent() {
  const router = useRouter();
  const [openSnackbar, setOpenSnackbar] = React.useState(false);

  const handleLogout = () => {
    setOpenSnackbar(true);
    setTimeout(() => { router.push('/login'); }, 1500);
  };

  const { state, handlers } = useAssetStatusDoc();

  return (
    <Box sx={globalStyles.rootBox}>
      <Sidebar handleLogout={handleLogout} />

      <Box component="main" sx={globalStyles.mainContentBox}>
        <Header search={state.search} handleSearchChange={handlers.handleSearchChange} />

        {/* MODIFIED: Replaced DataSection with specific, styled tables */}
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
                    <TableCell sx={styles.tableHeaderCellStyles}>Asset</TableCell>
                    <TableCell sx={styles.tableHeaderCellStyles}>Current Status</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {state.filteredStatusData.map((item, idx) => (
                    <TableRow key={idx} hover>
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
                  </TableRow>
                </TableHead>
                <TableBody>
                  {state.filteredDocumentsData.map((doc, idx) => (
                    <TableRow key={idx} hover>
                      <TableCell>{doc}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>

          {/* Digital Signature Table */}
          <Paper elevation={3} sx={{ p: 2, backgroundColor: '#fefae0' }}>
            <Typography variant="h6" sx={styles.assetStatusSectionTitle}>
              Digital Signature Capture
            </Typography>
            <TableContainer component={Paper} sx={styles.tableContainerStyles}>
              <Table aria-label="digital signature table">
                <TableHead>
                  <TableRow>
                    <TableCell sx={styles.tableHeaderCellStyles}>Client - Date</TableCell>
                    <TableCell sx={styles.tableHeaderCellStyles}>Status</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {state.filteredSignatures.map((sig, idx) => (
                    <TableRow key={idx} hover>
                      <TableCell>{`${sig.client} - ${sig.date}`}</TableCell>
                      <TableCell>{sig.status}</TableCell>
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