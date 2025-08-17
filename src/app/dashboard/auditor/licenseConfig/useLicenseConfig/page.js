// Contains all the logic and instructions for this feature. We can also display error messages to the user interface from this file.
'use client';

import { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  IconButton,
  Tooltip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Chip,
  List,
  ListItem,
  Card,
} from '@mui/material';
import { Download as DownloadIcon, Close as CloseIcon } from '@mui/icons-material';
import dynamic from 'next/dynamic';

// Service file for hardcode data.
import {
  licenseData,
  licenseRows,
  sidebarMenu,
  renewalData,
} from '../licenseConfigService/page';

// Dynamic import for DataGrid to ensure it's client-side only.
const DataGrid = dynamic(
  () => import('@mui/x-data-grid').then((datagrid) => datagrid.DataGrid),
  { ssr: false }
);

// manage state and logic for this screen
export function RenewalCard() {
  const chipGroups = renewalData;

  return (
    <Card
      sx={{
        p: 2,
        height: '100%',
        backgroundColor: '#fefae0',
        color: '#525252',
        border: '1px solid #6b705c',
      }}
    >
      <Typography variant="h6" sx={{ mb: 2 }}>
        Upcoming Renewals
      </Typography>

      {chipGroups.map((group) => {
        const showKeys = group.keys.slice(0, 3);
        const remaining = group.keys.length - showKeys.length;

        return (
          <Box key={group.label} sx={{ mb: 2 }}>
            <Chip
              label={group.label}
              color={group.color}
              variant="outlined"
              sx={{ mb: 1 }}
            />
            <List dense disablePadding>
              {showKeys.map((key, idx) => (
                <ListItem
                  key={idx}
                  sx={{
                    px: 1.5,
                    py: 0.5,
                    cursor: 'pointer',
                    color: 'primary.main',
                    '&:hover': { textDecoration: 'underline' },
                  }}
                  onClick={() => console.log(`Filter by key: ${key}`)}
                >
                  • {key}
                </ListItem>
              ))}
              {remaining > 0 && (
                <ListItem
                  sx={{
                    px: 1.5,
                    py: 0.5,
                    cursor: 'pointer',
                    color: 'text.secondary',
                    fontStyle: 'italic',
                  }}
                  onClick={() => console.log(`View all ${group.label} renewals`)}
                >
                  + {remaining} more
                </ListItem>
              )}
            </List>
          </Box>
        );
      })}
    </Card>
  );
}

/**
 * Renders the Per-Client License Register component, including the data grid and detail dialog.
 */
export function PerClientLicenseRegister({ clientName = 'Client ABC' }) {
  const [selectedLicense, setSelectedLicense] = useState(null);

  const handleRowClick = (params) => {
    setSelectedLicense(params.row);
  };

  const handleClose = () => setSelectedLicense(null);

  const handleExportCsv = () => {
    const csvContent =
      'data:text/csv;charset=utf-8,' +
      ['License Name,License Key,Status']
        .concat(
          licenseRows.map((r) => `${r.licenseName},${r.licenseKey},${r.status}`)
        )
        .join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `${clientName}_licenses.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Columns for DataGrid
  const columns = [
    { field: 'licenseName', headerName: 'License Name', flex: 1, sortable: true },
    { field: 'licenseKey', headerName: 'License Key', flex: 1, sortable: true },
    { field: 'status', headerName: 'Status', flex: 1, sortable: true },
  ];
  // End of Columns for DataGrid

  return (
    <Box
      sx={{
        flexGrow: 1,
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: '#fefae0',
        color: '#525252',
      }}
    >
      <Box
        sx={{
          mb: 2,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Typography variant="subtitle1">
          Showing {licenseRows.length} licenses for {clientName}
        </Typography>

        <Tooltip title="Export CSV">
          <IconButton onClick={handleExportCsv} size="small" color="primary">
            <DownloadIcon />
          </IconButton>
        </Tooltip>
      </Box>

      <Box sx={{ flexGrow: 1, width: '100%', minHeight: 0 }}>
        <DataGrid
          rows={licenseRows}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5, 10]}
          pagination
          sortingOrder={['asc', 'desc']}
          onRowClick={handleRowClick}
          sx={{ backgroundColor: '#fefae0', border: '1px solid #6b705c' }}
        />
      </Box>

      {/* License Details Dialog */}
      <Dialog open={!!selectedLicense} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle
          sx={{ backgroundColor: '#fefae0', border: '1px solid #6b705c' }}
        >
          License Details
          <IconButton
            aria-label="close"
            onClick={handleClose}
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>

        <DialogContent dividers sx={{ backgroundColor: '#fefae0' }}>
          {selectedLicense && (
            <>
              <Typography>
                <strong>License Name:</strong> {selectedLicense.licenseName}
              </Typography>
              <Typography>
                <strong>License Key:</strong> {selectedLicense.licenseKey}
              </Typography>
              <Typography>
                <strong>Status:</strong> {selectedLicense.status}
              </Typography>
            </>
          )}
        </DialogContent>

        <DialogActions sx={{ backgroundColor: '#fefae0' }}>
          <Button onClick={handleClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
      {/* End of License Details Dialog */}
    </Box>
  );
}

/**
 * manage all state and handlers for the License Configuration page.
 */
export function useLicenseConfig() {
  const [isClient, setIsClient] = useState(false);
  const [client, setClient] = useState('all');
  const currentPath = '/dashboard/auditor/licenseConfig';

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleClientChange = (event) => {
    setClient(event.target.value);
  };

  const totals = licenseData.reduce(
    (acc, cur) => ({
      assigned: acc.assigned + cur.assigned,
      purchased: acc.purchased + cur.purchased,
    }),
    { assigned: 0, purchased: 0 }
  );

  return {
    isClient,
    client,
    handleClientChange,
    licenseData,
    totals,
    sidebarMenu,
    currentPath,
  };
}