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
  Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, useTheme, useMediaQuery, Tooltip
} from '@mui/material';

import DashboardIcon from '@mui/icons-material/Dashboard';
import { Logout as LogoutIcon, Menu as MenuIcon } from '@mui/icons-material';
import { Snackbar, Alert } from '@mui/material';

import useAssetStatusDoc from './useAssetStaDoc/useAssetStaDoc';
import * as globalStyles from '../common/styles';
import * as styles from './styles';
import { auditorMenu } from '../common/auditorStore';

const drawerWidth = 260; // Define drawer width

const Sidebar = ({ handleLogout, currentUser, isMobile, mobileOpen, handleDrawerToggle }) => {
  const router = useRouter();

  const drawerContent = (
    <>
      <Box sx={{ p: 1, borderBottom: '2px solid #6b705c', display: 'flex', alignItems: 'center', gap: 1 }}>
        <Tooltip title="Go to Audit Trail" arrow>
          <Link href="/dashboard/auditor/audit-trail" passHref>
            <IconButton sx={{ color: 'green' }} aria-label="Go to Dashboard">
              <DashboardIcon />
            </IconButton>
          </Link>
        </Tooltip>
        <Typography variant="h5" sx={{ color: '#fefae0' }}>
          Auditor Portal
        </Typography>
      </Box>
      <List>
        {auditorMenu.map((item) => (
          <ListItem key={item.path} disablePadding>
            <Tooltip title={item.name} arrow placement="right">
              <ListItemButton
                component={Link}
                href={item.path}
                sx={globalStyles.listItemButton}
                onMouseEnter={() => router.prefetch(item.path)}
                onClick={isMobile ? handleDrawerToggle : undefined} // Close drawer on mobile click
              >
                <ListItemText primary={item.name} />
              </ListItemButton>
            </Tooltip>
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
        <Tooltip title="Logout from auditor portal" arrow>
          <Button onClick={handleLogout} fullWidth sx={{ padding: '0.75rem', background: 'transparent', border: '1px solid #fefae0', borderRadius: '8px', color: '#fefae0', cursor: 'pointer', transition: 'all 0.3s ease', fontWeight: '600', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', '&:hover': { background: '#6b705c' } }}>
            <LogoutIcon /> Logout
          </Button>
        </Tooltip>
      </Box>
    </>
  );

  return (
    <Drawer
      variant={isMobile ? 'temporary' : 'permanent'}
      anchor="left"
      open={isMobile ? mobileOpen : true}
      onClose={handleDrawerToggle}
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          ...globalStyles.drawerPaper,
          width: drawerWidth,
          boxSizing: 'border-box',
        },
      }}
      ModalProps={{
        keepMounted: true, // Better open performance on mobile.
      }}
    >
      {drawerContent}
    </Drawer>
  );
};

const Header = ({ search, handleSearchChange, isMobile, handleDrawerToggle }) => {
  return (
    <Box
      sx={{
        ...globalStyles.pageHeader,
        flexDirection: { xs: 'column', md: 'row' }, // Stack on mobile
        alignItems: { xs: 'flex-start', md: 'center' }, // Align items
        gap: 2,
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', width: '100%' }}>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="start"
          onClick={handleDrawerToggle}
          sx={{
            mr: 2,
            color: '#fefae0',
            display: { md: 'none' }, // Only show on mobile
          }}
        >
          <MenuIcon />
        </IconButton>
        <Box sx={{ flexGrow: 1 }}>
          <Typography
            variant="h4"
            sx={{
              ...styles.assetStatusTitle,
              fontSize: { xs: '1.75rem', md: '2.125rem' }, // Smaller font on mobile
            }}
          >
            Asset Status & Documentation
          </Typography>
          <Typography variant="subtitle1" sx={styles.assetStatusSubtitle}>
            A clear view of each asset&apos;s lifecycle and associated paperwork.
          </Typography>
        </Box>
      </Box>
      <Box
        sx={{
          ...styles.headerRightSectionStyles,
          width: { xs: '100%', md: 'auto' }, // Full width on mobile
        }}
      >
        <TextField
          variant="outlined"
          placeholder="Search records..."
          value={search}
          onChange={handleSearchChange}
          sx={{
            ...styles.searchFieldStyles,
            width: '100%', // Make search field full-width
          }}
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

  // Responsive drawer state
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  /*
  Fetches the current user's data when the component loads.
  */
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const { data: { user }, error } = await supabase.auth.getUser();
        if (error) throw error;
        setCurrentUser(user);
      } catch (error) {
        console.error('Error fetching user:', error);
        // You could show a snackbar here
      }
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
      <Sidebar
        handleLogout={handleLogout}
        currentUser={currentUser}
        isMobile={isMobile}
        mobileOpen={mobileOpen}
        handleDrawerToggle={handleDrawerToggle}
      />

      <Box
        component="main"
        sx={{
          ...globalStyles.mainContentBox,
          ml: { xs: 0, md: `${drawerWidth}px` }, // Apply margin only on desktop
          width: { xs: '100%', md: `calc(100% - ${drawerWidth}px)` }, // Adjust width
        }}
      >
        <Header
          search={state.search}
          handleSearchChange={handlers.handleSearchChange}
          isMobile={isMobile}
          handleDrawerToggle={handleDrawerToggle}
        />

        <Box sx={{ display: 'grid', gap: 4, p: { xs: 2, md: 3 } }}>
          {/* Status Dashboard Table */}
          <Paper elevation={3} sx={{ p: 2, backgroundColor: '#fefae0' }}>
            <Typography variant="h6" sx={styles.assetStatusSectionTitle}>
              Status Dashboard
            </Typography>
            <TableContainer component={Paper} sx={{ ...styles.tableContainerStyles, overflowX: 'auto' }}>
              <Table aria-label="status dashboard table" stickyHeader>
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
            <TableContainer component={Paper} sx={{ ...styles.tableContainerStyles, overflowX: 'auto' }}>
              <Table aria-label="document attachment table" stickyHeader>
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
            <TableContainer component={Paper} sx={{ ...styles.tableContainerStyles, overflowX: 'auto' }}>
              <Table aria-label="client information table" stickyHeader>
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