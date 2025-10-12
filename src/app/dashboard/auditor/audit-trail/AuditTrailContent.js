// ./auditor/audit-trail/AuditTrailContent.js
'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { createSupabaseClient } from '@/lib/supabase/client';
import {
  Box, Typography,
  List, ListItem, ListItemText,
  Drawer, ListItemButton, Paper,
  Table, TableBody, TableHead,
  TableRow, TableCell, TextField,
  Button, IconButton, Modal,
  MenuItem, Snackbar, Alert
} from '@mui/material';

import DashboardIcon from '@mui/icons-material/Dashboard';
import { Logout as LogoutIcon, Edit as EditIcon, Delete as DeleteIcon, AttachFile as AttachFileIcon } from '@mui/icons-material';
import * as commonStyles from '../common/styles';
import {
  headerBoxStyles,
  pageTitleStyles,
  headerRightSectionStyles,
  searchFieldStyles,
  addButtonStyles,
  tablePaperStyles,
  tableCellHeaderStyles,
  tableCellBodyStyles,
  modalStyles,
} from './styles';
import useAuditTrail from './useAudit-Trail/page';

export default function AuditTrailContent() {
  const supabase = createSupabaseClient();
  const {
    auditTrailMenu,
    filteredRows,
    search,
    handleSearchChange,
    isModalOpen,
    editingLog,
    handleOpenModal,
    handleCloseModal,
    addLogEntry,
    editLogEntry,
    removeLogEntry,
    handleDocumentUpload,
  } = useAuditTrail();

  const router = useRouter();
  const [currentUser, setCurrentUser] = useState(null);
  const fileInputRef = useRef(null);
  const [uploadTargetLogId, setUploadTargetLogId] = useState(null);
  
  // Snackbar states
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success'); // 'success', 'error', 'warning', 'info'
  
  // Logout snackbar state
  const [logoutSnackbar, setLogoutSnackbar] = useState(false);

  const initialFormState = {
    signOff: '',
    status: 'Pending',
    receiver: '',
    type: 'Hardware',
    serial: '',
  };
  const [formState, setFormState] = useState(initialFormState);
  const [isSubmitting, setIsSubmitting] = useState(false);

  /**
   * Shows a snackbar notification with the specified message and severity
   */
  const showSnackbar = (message, severity = 'success') => {
    setSnackbarMessage(message);
    setSnackbarSeverity(severity);
    setOpenSnackbar(true);
  };

  /**
   * Handles closing the snackbar
   */
  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenSnackbar(false);
  };

  /**
   * Handles closing the logout snackbar
   */
  const handleCloseLogoutSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setLogoutSnackbar(false);
  };

  /*
   * Fetches the current user's data when the component loads.
   */
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const { data: { user }, error } = await supabase.auth.getUser();
        if (error) throw error;
        setCurrentUser(user);
      } catch (error) {
        console.error('Error fetching user:', error);
        showSnackbar('Failed to load user data', 'error');
      }
    };
    fetchUser();
  }, []);

  /*
   * Populates the form with data when a log entry is being edited.
   */
  useEffect(() => {
    if (editingLog) {
      setFormState({
        signOff: editingLog.signOff || '',
        status: editingLog.status || 'Pending',
        receiver: editingLog.receiver || '',
        type: editingLog.type || 'Hardware',
        serial: editingLog.serial || '',
      });
    } else {
      setFormState(initialFormState);
    }
  }, [editingLog, isModalOpen]);

  /**
   * Handles form field changes
   */
  const handleFormChange = (event) => {
    const { name, value } = event.target;
    setFormState((prevState) => ({ ...prevState, [name]: value }));
  };

  /**
   * Handles form submission for both adding and editing log entries
   */
  const handleFormSubmit = async (event) => {
    event.preventDefault();
    
    // Basic validation
    if (!formState.signOff.trim() || !formState.serial.trim() || !formState.receiver.trim()) {
      showSnackbar('Please fill in all required fields', 'error');
      return;
    }

    setIsSubmitting(true);

    try {
      if (editingLog) {
        await editLogEntry({ ...formState, id: editingLog.id });
        showSnackbar('Log entry updated successfully!');
      } else {
        await addLogEntry(formState);
        showSnackbar('New log entry added successfully!');
      }
      handleCloseModal();
    } catch (error) {
      console.error('Error submitting form:', error);
      showSnackbar(
        editingLog ? 'Failed to update log entry' : 'Failed to add new log entry', 
        'error'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  /**
   * Handles log entry deletion with confirmation
   */
  const handleDeleteLog = async (logId) => {
    if (!logId) {
      showSnackbar('Invalid log entry', 'error');
      return;
    }

    // Confirmation dialog
    if (!window.confirm('Are you sure you want to delete this log entry? This action cannot be undone.')) {
      return;
    }

    try {
      await removeLogEntry(logId);
      showSnackbar('Log entry deleted successfully!');
    } catch (error) {
      console.error('Error deleting log entry:', error);
      showSnackbar('Failed to delete log entry', 'error');
    }
  };

  /*
   * Signs out the current user and redirects to the login page.
   */
  const handleLogout = async () => {
    setLogoutSnackbar(true);
    setTimeout(async () => {
      try {
        await supabase.auth.signOut();
        router.push('/login');
      } catch (error) {
        console.error('Error during logout:', error);
        showSnackbar('Error during logout', 'error');
      }
    }, 1500);
  };

  /**
   * Handles attachment icon click
   */
  const handleAttachClick = (logId) => {
    if (!logId) {
      showSnackbar('Invalid log entry for attachment', 'error');
      return;
    }
    setUploadTargetLogId(logId);
    fileInputRef.current.click();
  };

  /**
   * Handles file upload for documents
   */
  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    
    if (!file) {
      return;
    }

    // Validate file type
    const allowedTypes = ['.pdf', '.png', '.csv'];
    const fileExtension = '.' + file.name.split('.').pop().toLowerCase();
    
    if (!allowedTypes.includes(fileExtension)) {
      showSnackbar('Please select a PDF, PNG, or CSV file', 'error');
      event.target.value = null;
      return;
    }

    // Validate file size (5MB limit)
    if (file.size > 5 * 1024 * 1024) {
      showSnackbar('File size must be less than 5MB', 'error');
      event.target.value = null;
      return;
    }

    if (file && uploadTargetLogId) {
      try {
        await handleDocumentUpload(uploadTargetLogId, file);
        showSnackbar('File uploaded successfully!');
      } catch (error) {
        console.error('Error uploading file:', error);
        showSnackbar('Failed to upload file', 'error');
      }
    } else {
      showSnackbar('No log entry selected for attachment', 'error');
    }
    
    // Reset file input
    event.target.value = null;
  };

  return (
    <Box sx={commonStyles.rootBox}>
      {/* Sidebar */}
      <Drawer
        variant="permanent"
        anchor="left"
        sx={{ '& .MuiDrawer-paper': commonStyles.drawerPaper }}
      >
        <Box
          sx={{
            p: 1,
            borderBottom: '2px solid #6b705c',
            display: 'flex',
            alignItems: 'center',
            gap: 1,
          }}
        >
          <Link href="/dashboard/auditor/audit-trail" passHref>
            <IconButton sx={{ color: 'green' }}>
              <DashboardIcon />
            </IconButton>
          </Link>
          <Typography variant="h5" sx={{ color: '#fefae0' }}>
            Auditor Portal
          </Typography>
        </Box>

        <List>
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
        </List>

        <Box sx={{ mt: 'auto', p: 2, borderTop: '2px solid #6b705c' }}>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              mb: 2,
              gap: 1.5,
            }}
          >
            <Image
              src="/toroLogo.jpg"
              alt="User Profile"
              width={40}
              height={40}
              style={{ borderRadius: '50%', border: '2px solid #f3722c' }}
            />
            <Box sx={{ minWidth: 0 }}>
              <Typography
                noWrap
                sx={{ fontWeight: '600', color: '#fefae0' }}
              >
                {currentUser?.email}
              </Typography>
              <Typography
                variant="caption"
                noWrap
                sx={{ color: 'rgba(254, 250, 224, 0.7)' }}
              >
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
              },
            }}
          >
            Logout
          </Button>
        </Box>
      </Drawer>

      {/* Main content */}
      <Box component="main" sx={commonStyles.mainContentBox}>
        {/* Hidden file input for uploads */}
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          style={{ display: 'none' }}
          accept=".pdf,.png,.csv"
        />

        {/* Header */}
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
            <Button 
              sx={addButtonStyles} 
              onClick={() => handleOpenModal()}
              disabled={isSubmitting}
            >
              Add New Entry
            </Button>
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
                <TableCell sx={tableCellHeaderStyles}>
                  Delivery Status
                </TableCell>
                <TableCell sx={tableCellHeaderStyles}>Order Receiver</TableCell>
                <TableCell sx={tableCellHeaderStyles}>Asset Type</TableCell>
                <TableCell sx={tableCellHeaderStyles}>Serial Number</TableCell>
                <TableCell sx={tableCellHeaderStyles}>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredRows.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={8}
                    align="center"
                    sx={{ py: 3, fontStyle: 'italic', color: 'gray' }}
                  >
                    No matching records found
                  </TableCell>
                </TableRow>
              ) : (
                filteredRows.map((row) => (
                  <TableRow
                    key={row.id}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell sx={tableCellBodyStyles}>
                      {row.orderId}
                    </TableCell>
                    <TableCell sx={tableCellBodyStyles}>
                      {row.signOff}
                    </TableCell>
                    <TableCell sx={tableCellBodyStyles}>
                      {row.timestamp}
                    </TableCell>
                    <TableCell sx={tableCellBodyStyles}>
                      {row.status}
                    </TableCell>
                    <TableCell sx={tableCellBodyStyles}>
                      {row.receiver}
                    </TableCell>
                    <TableCell sx={tableCellBodyStyles}>
                      {row.type}
                    </TableCell>
                    <TableCell sx={tableCellBodyStyles}>
                      {row.serial}
                    </TableCell>
                    <TableCell sx={tableCellBodyStyles}>
                      <IconButton 
                        onClick={() => handleAttachClick(row.id)}
                        disabled={isSubmitting}
                      >
                        <AttachFileIcon />
                      </IconButton>
                      <IconButton 
                        onClick={() => handleOpenModal(row)}
                        disabled={isSubmitting}
                      >
                        <EditIcon />
                      </IconButton>
                      <IconButton 
                        onClick={() => handleDeleteLog(row.id)}
                        disabled={isSubmitting}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </Box>
      </Box>

      {/* Modal */}
      <Modal open={isModalOpen} onClose={handleCloseModal}>
        <Box sx={modalStyles}>
          <Typography variant="h6" component="h2" sx={{ mb: 2 }}>
            {editingLog ? 'Edit Audit Log Entry' : 'Add New Audit Log Entry'}
          </Typography>
          <Box
            component="form"
            onSubmit={handleFormSubmit}
            sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
          >
            <TextField
              name="signOff"
              label="Order Sign-Off"
              value={formState.signOff}
              onChange={handleFormChange}
              required
              disabled={isSubmitting}
              error={!formState.signOff.trim()}
              helperText={!formState.signOff.trim() ? "This field is required" : ""}
            />
            <TextField
              name="serial"
              label="Asset Serial Number"
              value={formState.serial}
              onChange={handleFormChange}
              required
              disabled={isSubmitting}
              error={!formState.serial.trim()}
              helperText={!formState.serial.trim() ? "This field is required" : ""}
            />
            <TextField
              name="receiver"
              label="Order Receiver"
              value={formState.receiver}
              onChange={handleFormChange}
              required
              disabled={isSubmitting}
              error={!formState.receiver.trim()}
              helperText={!formState.receiver.trim() ? "This field is required" : ""}
            />
            <TextField
              select
              name="status"
              label="Delivery Status"
              value={formState.status}
              onChange={handleFormChange}
              disabled={isSubmitting}
            >
              <MenuItem value="Pending">Pending</MenuItem>
              <MenuItem value="In Transit">In Transit</MenuItem>
              <MenuItem value="Delivered">Delivered</MenuItem>
              <MenuItem value="Failed">Failed</MenuItem>
            </TextField>
            <TextField
              select
              name="type"
              label="Asset Type"
              value={formState.type}
              onChange={handleFormChange}
              disabled={!!editingLog || isSubmitting}
            >
              <MenuItem value="Hardware">Hardware</MenuItem>
              <MenuItem value="Software">Software</MenuItem>
            </TextField>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1, mt: 2 }}>
              <Button 
                onClick={handleCloseModal}
                disabled={isSubmitting}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                variant="contained"
                sx={addButtonStyles}
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Processing...' : (editingLog ? 'Save Changes' : 'Submit')}
              </Button>
            </Box>
          </Box>
        </Box>
      </Modal>

      {/* Snackbar for notifications */}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={4000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert
          severity={snackbarSeverity}
          sx={{ width: '100%', fontWeight: 'bold', fontSize: '1rem' }}
          onClose={handleCloseSnackbar}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>

      {/* Logout Snackbar */}
      <Snackbar
        open={logoutSnackbar}
        autoHideDuration={1500}
        onClose={handleCloseLogoutSnackbar}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert 
          severity="success" 
          sx={{ 
            width: '100%', 
            fontWeight: 'bold', 
            fontSize: '1.2rem',
            backgroundColor: '#a6f0daff',
            color: 'black'
          }}
        >
          Logging out...
        </Alert>
      </Snackbar>
    </Box>
  );
}