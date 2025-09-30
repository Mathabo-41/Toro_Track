// This file combines the logic and styles for the audit trail screen.
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
  openSnackbar,
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
    feedback,
    handleCloseFeedback
  } = useAuditTrail();

  const router = useRouter();
  const [currentUser, setCurrentUser] = useState(null);
  const fileInputRef = useRef(null);
  const [uploadTargetLogId, setUploadTargetLogId] = useState(null);
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const initialFormState = {
      signOff: '', status: 'Pending', receiver: '', type: 'Hardware', serial: ''
  };
  const [formState, setFormState] = useState(initialFormState);

  /*
  Fetches the current user's data when the component loads.
  */
  useEffect(() => {
    const fetchUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setCurrentUser(user);
    };
    fetchUser();
  }, []);

  /*
  Populates the form with data when a log entry is being edited.
  */
  useEffect(() => {
      if (editingLog) {
          setFormState({
              signOff: editingLog.signOff, status: editingLog.status, receiver: editingLog.receiver,
              type: editingLog.type, serial: editingLog.serial
          });
      } else {
          setFormState(initialFormState);
      }
  }, [editingLog, isModalOpen]);

  const handleFormChange = (event) => {
      const { name, value } = event.target;
      setFormState(prevState => ({ ...prevState, [name]: value }));
  };

  const handleFormSubmit = async (event) => {
      event.preventDefault();
      if (editingLog) {
          await editLogEntry({ ...formState, id: editingLog.id });
      } else {
          await addLogEntry(formState);
      }
  };

  /*
  Signs out the current user and redirects to the login page.
  */
  const handleLogout = async () => {
  //  Show snackbar
  setOpenSnackbar(true);
  //Wait a moment so user sees it
  setTimeout(async () => {
    await supabase.auth.signOut();
    router.push('/login');
  }, 1500); 
};

  const handleAttachClick = (logId) => {
    setUploadTargetLogId(logId);
    fileInputRef.current.click();
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file && uploadTargetLogId) {
        handleDocumentUpload(uploadTargetLogId, file);
    }
    // Reset file input
    event.target.value = null;
  };

  return (
    <Box sx={commonStyles.rootBox}>
      <Drawer
        variant="permanent"
        anchor="left"
        sx={{ '& .MuiDrawer-paper': commonStyles.drawerPaper }}
      >
        <Box sx={{ p: 1, borderBottom: '2px solid #6b705c', display: 'flex', alignItems: 'center', gap: 1 }}>
          <Link href="/dashboard/auditor/audit-trail" passHref><IconButton sx={{ color: 'green' }}><DashboardIcon /></IconButton></Link>
          <Typography variant="h5" sx={{ color: '#fefae0'}}>Auditor Portal</Typography>
        </Box>
        <List>
          {auditTrailMenu.map((item) => (
            <ListItem key={item.path} disablePadding>
              <ListItemButton component={Link} href={item.path} sx={commonStyles.listItemButton}>
                <ListItemText primary={item.name} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Box sx={{ mt: 'auto', p: 2, borderTop: '2px solid #6b705c' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2, gap: 1.5 }}>
                <Image src="/toroLogo.jpg" alt="User Profile" width={40} height={40} style={{ borderRadius: '50%', border: '2px solid #f3722c' }} />
                <Box sx={{ minWidth: 0 }}>
                    <Typography noWrap sx={{ fontWeight: '600', color: '#fefae0' }}>{currentUser?.email}</Typography>
                    <Typography variant="caption" noWrap sx={{ color: 'rgba(254, 250, 224, 0.7)' }}>Auditor</Typography>
                </Box>
            </Box>
            <Button onClick={handleLogout} fullWidth variant="outlined" startIcon={<LogoutIcon />} sx={{ color: '#fefae0', borderColor: '#fefae0', '&:hover': { background: '#6b705c' } }}>
                Logout
            </Button>
        </Box>
      </Drawer>

      <Box component="main" sx={commonStyles.mainContentBox}>
        {/* Hidden file input for uploads */}
        <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            style={{ display: 'none' }}
            accept=".pdf,.png,.csv"
        />
        <Box sx={headerBoxStyles}>
          <Typography variant="h4" sx={pageTitleStyles}>Audit Trail & Logging</Typography>
          <Box sx={headerRightSectionStyles}>
            <TextField variant="outlined" placeholder="Search Order ID" value={search} onChange={handleSearchChange} sx={searchFieldStyles}/>
            <Button sx={addButtonStyles} onClick={() => handleOpenModal()}>Add New Entry</Button>
          </Box>
        </Box>

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
                <TableCell sx={tableCellHeaderStyles}>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredRows.map((row) => (
                <TableRow key={row.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                  <TableCell sx={tableCellBodyStyles}>{row.orderId}</TableCell>
                  <TableCell sx={tableCellBodyStyles}>{row.signOff}</TableCell>
                  <TableCell sx={tableCellBodyStyles}>{row.timestamp}</TableCell>
                  <TableCell sx={tableCellBodyStyles}>{row.status}</TableCell>
                  <TableCell sx={tableCellBodyStyles}>{row.receiver}</TableCell>
                  <TableCell sx={tableCellBodyStyles}>{row.type}</TableCell>
                  <TableCell sx={tableCellBodyStyles}>{row.serial}</TableCell>
                  <TableCell sx={tableCellBodyStyles}>
                      <IconButton onClick={() => handleAttachClick(row.id)}><AttachFileIcon /></IconButton>
                      <IconButton onClick={() => handleOpenModal(row)}><EditIcon /></IconButton>
                      <IconButton onClick={() => removeLogEntry(row.id)}><DeleteIcon /></IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
      </Box>

      <Modal open={isModalOpen} onClose={handleCloseModal}>
          <Box sx={modalStyles}>
              <Typography variant="h6" component="h2" sx={{ mb: 2 }}>{editingLog ? 'Edit Audit Log Entry' : 'Add New Audit Log Entry'}</Typography>
              <Box component="form" onSubmit={handleFormSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  <TextField name="signOff" label="Order Sign-Off" value={formState.signOff} onChange={handleFormChange} required />
                  <TextField name="serial" label="Asset Serial Number" value={formState.serial} onChange={handleFormChange} required />
                  <TextField name="receiver" label="Order Receiver" value={formState.receiver} onChange={handleFormChange} required />
                  <TextField select name="status" label="Delivery Status" value={formState.status} onChange={handleFormChange}>
                      <MenuItem value="Pending">Pending</MenuItem>
                      <MenuItem value="In Transit">In Transit</MenuItem>
                      <MenuItem value="Delivered">Delivered</MenuItem>
                      <MenuItem value="Failed">Failed</MenuItem>
                      <MenuItem value="Processing">Processing</MenuItem>
                  </TextField>
                  <TextField select name="type" label="Asset Type" value={formState.type} onChange={handleFormChange} disabled={!!editingLog}>
                      <MenuItem value="Hardware">Hardware</MenuItem>
                      <MenuItem value="Software">Software</MenuItem>
                  </TextField>
                  <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1, mt: 2 }}>
                      <Button onClick={handleCloseModal}>Cancel</Button>
                      <Button type="submit" variant="contained" sx={addButtonStyles}>{editingLog ? 'Save Changes' : 'Submit'}</Button>
                  </Box>
              </Box>
          </Box>
      </Modal>

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
