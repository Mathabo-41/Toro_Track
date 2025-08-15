'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import {
  Box,
  Typography,
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
import { AccountCircle as AccountCircleIcon } from '@mui/icons-material';

import { useAuditorStore } from '../common/auditorStore';
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
} from '../common/styles';
import {
  tablePaperStyles,
  tableCellHeaderStyles,
  tableCellBodyStyles
} from './styles';
import { useAuditTrail } from './useAuditTrail';

export default function AuditTrailPage() {
  const {
    currentPath,
    auditTrailMenu,
    searchQuery,
    setSearchQuery,
    setCurrentPath
  } = useAuditorStore();

  // Highlight this feature in sidebar
  useEffect(() => {
    setCurrentPath('/dashboard/auditor/audit-trail');
  }, [setCurrentPath]);

  // Fetch rows
  const { data: rows = [], isLoading, isError } = useAuditTrail();

  // Filter by orderId
  const filteredRows = rows.filter((r) =>
    r.orderId.toLowerCase().includes(searchQuery.toLowerCase())
  );

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

      {/* Main */}
      <Box component="main" sx={mainContentBoxStyles}>
        <Box sx={headerBoxStyles}>
          <Typography variant="h4" sx={pageTitleStyles}>
            Audit Trail & Logging
          </Typography>
          <Box sx={headerRightSectionStyles}>
            <TextField
              variant="outlined"
              placeholder="Search Order ID"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
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

        {/* Table */}
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
              {isLoading && (
                <TableRow>
                  <TableCell colSpan={7} align="center">
                    Loading…
                  </TableCell>
                </TableRow>
              )}
              {isError && (
                <TableRow>
                  <TableCell colSpan={7} align="center">
                    Failed to load data
                  </TableCell>
                </TableRow>
              )}
              {!isLoading &&
                !isError &&
                filteredRows.map((r) => (
                  <TableRow
                    key={r.orderId}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
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
}
