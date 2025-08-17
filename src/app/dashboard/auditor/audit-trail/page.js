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
  Paper,
  Table,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
  TextField
} from '@mui/material';
import {
  AccountCircle as AccountCircleIcon
} from '@mui/icons-material';

// Import global styles for layout and navigation
import * as commonStyles from '../common/styles';

// Import local styles for page-specific components
import {
  headerBoxStyles,
  pageTitleStyles,
  headerRightSectionStyles,
  searchFieldStyles,
  userProfileStyles,
  userInfoStyles,
  auditorTextStyles,
  tablePaperStyles,
  tableCellHeaderStyles,
  tableCellBodyStyles
} from './styles';

// Import hooks and data from the service file.
import useAuditTrail from './useAudit-Trail/page';

export default function AuditTrailPage() {
  // Use the custom hook to manage all state and handlers.
  const {
    auditTrailMenu,
    filteredRows,
    search,
    handleSearchChange,
    currentPath
  } = useAuditTrail();

  // #region Rendered UI
  return (
    <Box sx={commonStyles.rootBox}>
      {/* Sidebar Navigation */}
      <Drawer
       variant="permanent"
              anchor="left"
              sx={{ '& .MuiDrawer-paper': commonStyles.drawerPaper }}
            >
              <Box sx={commonStyles.drawerHeader}>
                <Typography variant="h5">Admin Portal</Typography>
              </Box>
              {auditTrailMenu.map((item) => (
                <ListItem key={item.path} disablePadding>
                  <ListItemButton
                    component={Link}
                    href={item.path}
                    sx={commonStyles.listItemButton}
                  >
                    <ListItemText primary={item.name} />
                  </ListItemButton>
                </ListItem>
              ))}       
       </Drawer>

      {/* Main Content */}
      <Box component="main" sx={commonStyles.mainContentBox}>
        {/* Page Header and Controls */}
        <Box sx={headerBoxStyles}>
          <Typography variant="h4" sx={pageTitleStyles}>
            Audit Trail & Logging
          </Typography>
          <Box sx={headerRightSectionStyles}>
            <TextField
              variant="outlined"
              placeholder="Search Order ID"
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

        {/* Audit trail table */}
        <Box component={Paper} sx={tablePaperStyles}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell sx={tableCellHeaderStyles}>Order ID</TableCell>
                <TableCell sx={tableCellHeaderStyles}>Order Sign-Off</TableCell>
                <TableCell sx={tableCellHeaderStyles}>Timestamp</TableCell>
                <TableCell sx={tableCellHeaderStyles}>Delivery Status</TableCell>
                <TableCell sx={tableCellHeaderStyles}>Order Receiver</TableCell>
                <TableCell sx={tableCellHeaderStyles}>Asset Type</TableCell>
                <TableCell sx={tableCellHeaderStyles}>Serial Number</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {filteredRows.map((r) => (
                <TableRow key={r.orderId} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                  <TableCell sx={tableCellBodyStyles}>{r.orderId}</TableCell>
                  <TableCell sx={tableCellBodyStyles}>{r.signOff}</TableCell>
                  <TableCell sx={tableCellBodyStyles}>{r.timestamp}</TableCell>
                  <TableCell sx={tableCellBodyStyles}>{r.status}</TableCell>
                  <TableCell sx={tableCellBodyStyles}>{r.receiver}</TableCell>
                  <TableCell sx={tableCellBodyStyles}>{r.type}</TableCell>
                  <TableCell sx={tableCellBodyStyles}>{r.serial}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
      </Box>
    </Box>
  );
  // #endregion
}