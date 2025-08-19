/* The file that combines the logic with the styles and displays it as a screen. 
Rendering takes place here to make the screen respond fast when it is being clicked*/
'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

// Import Material-UI components
import {
  Box, Typography, Grid,  Card,  CardContent, Avatar,
  Stack, List,  ListItem,  ListItemText,  Button,
  Drawer,  ListItemButton,  TextField,  Chip,
  IconButton,  Menu,  MenuItem,  Paper,  Table,  TableBody, Tooltip,
  TableCell, TableContainer,  TableHead, TableRow, DialogActions, Dialog, DialogTitle, DialogContent,
  Select, FormControl,  InputAdornment, activeCategory,
} from '@mui/material';

//copy icon imports 
import CheckIcon from '@mui/icons-material/Check';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';

// Import Material-UI icons
import {
  Copy as CopyIcon,
  Security as SecurityIcon,
  People as PeopleIcon,
  Groups as TeamsIcon,
  MoreVert as MoreVertIcon,
  Email as EmailIcon,
  Assignment as AssignmentIcon,
  GroupAdd as GroupAddIcon,
  Logout as LogoutIcon
} from '@mui/icons-material';

//snack bar 
import { Snackbar, Alert } from '@mui/material';

// Import local files
import { styles } from './styles';
import { useUsers } from './useUsers/page';
import { adminMenuData } from './usersService/page';

// Main Component
//handles user invites ,role assigning and team management
// ------------------------------------------------
export default function TeamsAndUsers() {
  // Region: Hooks and State
  // ------------------------------------------------



  const {
    inviteEmail,  setInviteEmail,
    users,  teams,   selectedUser,
    newTask,    setNewTask,    anchorEl,
    isMenuOpen,   handleInviteUser,   handleAddTask,
    handleMenuOpen,  handleMenuClose,
    handleAssignTask,   handleRemoveUser,
    handleUpdateRole, handleUpdateTeam
  } = useUsers();

  // State for sidebar
  const [sidebarOpen] = React.useState(true);

  //router for redirection/navigation
       const router = useRouter();
    
       //snack-bar state for the logout notification
       const [openSnackbar, setOpenSnackbar] = React.useState(false);
    
       //state for invitation success notification
         const [openInviteSuccess, setOpenInviteSuccess] = React.useState(false);


  // State to store the invited email for success message
  const [invitedEmail, setInvitedEmail] = React.useState('');

  // State for invitation dialog
         const [openInviteDialog, setOpenInviteDialog] = React.useState(false);
         const [generatedPassword, setGeneratedPassword] = React.useState('');
         const [copied, setCopied] = React.useState(false);
          const [selectedRole, setSelectedRole] = React.useState('Client'); // Default role

  // Region: Helper Functions
  // ------------------------------------------------

  /**
   * Generates a secure random password for new users
   */
  const generatePassword = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*';
    let password = '';
    for (let i = 0; i < 12; i++) {
      password += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setGeneratedPassword(password);
    return password;
  };

    // Function to handle the logout action  with snackbar and redirect to the login page
    const handleLogout = () => {
      setOpenSnackbar(true);//shows feedback for snackbar
      setTimeout(()=> {
         router.push('/login');
      }, 1500); //snackbar will redirect after 1.5 seconds.
     
    };


 /**
           * Opens the invitation dialog and generates a password
   */
  const handleOpenInviteDialog = () => {
    setGeneratedPassword(generatePassword());
    setOpenInviteDialog(true);
  };

  /**
         * Closes the invitation dialog and resets copy state
   */
  const handleCloseInviteDialog = () => {
    setOpenInviteDialog(false);
    setCopied(false);
  };

  /**
   * Copies the generated password to clipboard
   */
  const handleCopyPassword = () => {
    navigator.clipboard.writeText(generatedPassword);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  /**
   * Handles sending the invitation with selected role
   */
  const handleSendInvite = () => {
    //store the email for the success message before clearing it 
    setInvitedEmail(inviteEmail);

    // Pass the selected role to the invitation handler
    handleInviteUser(selectedRole, generatedPassword);

      // Close dialog
    setOpenInviteDialog(false);

    // Clear the email input field
  setInviteEmail('');

    // Show success notification
     setOpenInviteSuccess(true);
  };


  // Region: Render
  // ------------------------------------------------
  return (
    <Box sx={styles.mainContainer}>
      {/* Region: Sidebar Navigation */}
      <Drawer variant="permanent" anchor="left" sx={styles.sidebarDrawer}>
        <Box sx={styles.sidebarHeader}>
          <Typography variant="h5">
            Admin Portal
          </Typography>
        </Box>
        <List>
          {adminMenuData.map((item, index) => (
            <ListItem key={index} disablePadding>
              <ListItemButton
                component={Link}
                href={item.path}
                sx={styles.sidebarListItemButton(item.name)}
              >
                <ListItemText primary={item.name} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>

        {/* Region: User Profile Section */}
        <Box sx={{
          padding: '1rem',
          borderTop: '2px solid #6b705c',
          marginTop: 'auto'
        }}>
          {/* User Profile Container */}
          <Box sx={{ 
            display: 'flex', 
            alignItems: 'center', 
            marginBottom: '1rem',
            overflow: 'hidden',
            gap: '0.75rem'
          }}>
            {/* Profile Picture */}
            <Box sx={{
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              overflow: 'hidden',
              position: 'relative',
              flexShrink: 0,
              border: '2px solid #f3722c'
            }}>
              <Image
                src="/toroLogo.jpg"
                alt="User Profile"
                fill
                style={{ objectFit: 'cover' }}
              />
            </Box>

            {/* User Details (shown when sidebar is open) */}
            {sidebarOpen && (
              <Box sx={{ minWidth: 0 }}>
                {/* User Name */}
                <Typography sx={{ 
                  fontWeight: '600', 
                  margin: 0,
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  color: '#fefae0'
                }}>
                  John Doe
                </Typography>
                
                 {/* User Email (dynamic based on active category) */}
                  <Typography sx={{ 
                 fontSize: '0.8rem', 
                opacity: 0.8, 
                  margin: 0,
                  whiteSpace: 'nowrap',
           overflow: 'hidden',
                   textOverflow: 'ellipsis',
                  color: 'rgba(254, 250, 224, 0.7)' // Semi-transparent text
                    }}>
            {activeCategory ? `${activeCategory.replace(/([A-Z])/g, ' $1').trim()}@toro.com` : 'user@toro.com'}
                 </Typography>
              </Box>
            )}
          </Box>

          {/* Logout Button */}
          <Button 
            onClick={handleLogout}
            fullWidth
            sx={{
              padding: '0.75rem',
              background: 'transparent',
              border: '1px solid #fefae0',
              borderRadius: '8px',
              color: '#fefae0',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              fontWeight: '600',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.5rem',
              '&:hover': {
                background: '#6b705c'
              }
            }}
          >
            {sidebarOpen ? 'Logout' : <LogoutIcon />}
          </Button>
        </Box>
      </Drawer>

      {/* Region: Main Content Area */}
      <Box component="main" sx={styles.mainContent}>
        {/* Page Header */}
        <Box sx={styles.pageHeader}>
          <Typography variant="h4" sx={styles.pageTitle}>
            <TeamsIcon sx={styles.headerIcon} />
            Teams & Users
          </Typography>
          <Typography variant="body1" sx={styles.pageSubtitle}>
            Manage your team members and assign tasks
          </Typography>
        </Box>

        {/* Invite User Card */}
        <Grid container spacing={3} sx={{ mb: 4 }}>
          <Grid item xs={12} md={12}>
            <Card sx={styles.inviteCard}>
              <CardContent>
                <Typography variant="h6" sx={styles.inviteCardHeader}>
                  Invite New User
                </Typography>
                <Stack direction="row" spacing={2}>
                  <TextField
                    fullWidth
                    variant="outlined"
                    placeholder="Email address"
                    value={inviteEmail}
                    onChange={(e) => setInviteEmail(e.target.value)}
                    InputProps={{
                      style: { color: '#525252' },
                      startAdornment: (
                        <InputAdornment position="start">
                          <EmailIcon sx={styles.emailIcon} />
                        </InputAdornment>
                      ),
                      sx: styles.emailInput,
                    }}
                  />

                   {/* Role Selection */}
                  <FormControl sx={{ minWidth: 180 }}>
                    <Select
                      value={selectedRole}
                      onChange={(e) => setSelectedRole(e.target.value)}
                      sx={styles.selectInput}
                      startAdornment={
                        <InputAdornment position="start">
                          <SecurityIcon fontSize="small" />
                        </InputAdornment>
                      }
                    >
                      <MenuItem value="Admin">Admin</MenuItem>
                      <MenuItem value="Auditor">Auditor</MenuItem>
                      <MenuItem value="Client">Client</MenuItem>
                    </Select>
                  </FormControl>

                  <Button
                    variant="contained"
                    startIcon={<GroupAddIcon />}
                    onClick={handleOpenInviteDialog}
                
                    sx={styles.inviteButton}
                    disabled={!inviteEmail}
                  >
                    Invite
                  </Button>
                </Stack>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* Users Table section*/}
        <Card sx={styles.usersCard}>
          <CardContent>
            <Typography variant="h6" sx={styles.usersCardHeader}>
              Team Members
            </Typography>
            <TableContainer component={Paper} sx={styles.tableContainer}>
              <Table>
                <TableHead>
                  <TableRow sx={styles.tableHeaderRow}>
                    <TableCell sx={styles.tableHeaderCell}>Name</TableCell>
                    <TableCell sx={styles.tableHeaderCell}>Email</TableCell>
                    <TableCell sx={styles.tableHeaderCell}>Role</TableCell>
                    <TableCell sx={styles.tableHeaderCell}>Team</TableCell>
                    <TableCell sx={styles.tableHeaderCell}>Tasks</TableCell>
                    <TableCell sx={styles.tableHeaderCell}>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {users.map((user) => (
                    <TableRow key={user.id} sx={styles.tableBodyRow}>
                      <TableCell sx={styles.tableBodyCell}>
                        <Stack direction="row" alignItems="center" spacing={1.5}>
                          <Avatar sx={{ width: 32, height: 32, bgcolor: '#f3722c' }}>
                            {user.name.charAt(0)}
                          </Avatar>
                          <Typography>{user.name}</Typography>
                        </Stack>
                      </TableCell>
                      <TableCell sx={styles.tableBodyCell}>{user.email}</TableCell>
                      <TableCell sx={styles.tableBodyCell}>
                        <Chip 
                          label={user.role} 
                          size="small" 
                          color={
                            user.role === 'Admin' ? 'primary' : 
                            user.role === 'Auditor' ? 'secondary' : 
                            'default'
                          }
                          sx={{ fontWeight: 600 }}
                        />
                      </TableCell>
                      <TableCell sx={styles.tableBodyCell}>
                        {user.team || '-'}
                      </TableCell>
                      <TableCell sx={styles.tableBodyCell}>
                        <Chip 
                          label="Active" 
                          size="small" 
                          color="success"
                          variant="outlined"
                        />
                      </TableCell>
                      <TableCell>
                        <Tooltip title="More actions">
                          <IconButton
                            onClick={(e) => handleMenuOpen(e, user.id)}
                            sx={styles.menuIconButton}
                          >
                            <MoreVertIcon />
                          </IconButton>
                        </Tooltip>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </CardContent>
        </Card>
      </Box>

       {/* Region: Invitation Dialog */}
      <Dialog open={openInviteDialog} onClose={handleCloseInviteDialog} maxWidth="sm" fullWidth>
        <DialogTitle sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <GroupAddIcon color="primary" />
          <span>User Invitation Details</span>
        </DialogTitle>
        
        <DialogContent dividers>
          <Stack spacing={3}>

            {/* Email Section */}
            <Box>
              <Typography variant="subtitle2" color="text.secondary">Email</Typography>
              <Typography>{inviteEmail}</Typography>
            </Box>
            
            {/* Role Section */}
            <Box>
              <Typography variant="subtitle2" color="text.secondary">Assigned Role</Typography>
              <Typography textTransform="capitalize">{selectedRole}</Typography>
            </Box>
            
            {/* Password Section */}
            <Box>
              <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                Temporary Password
              </Typography>
              <Paper variant="outlined" sx={{ p: 1.5, position: 'relative' }}>
                <Typography fontFamily="monospace" fontSize={16}>
                  {generatedPassword}
                </Typography>
                <Tooltip title={copied ? 'Copied!' : 'Copy to clipboard'}>
                  <IconButton 
                    onClick={handleCopyPassword}
                    sx={{ 
                      position: 'absolute', 
                      right: 8, 
                      top: 8,
                      color: copied ? 'success.main' : 'inherit'
                    }}
                  >
                    {copied ? <CheckIcon fontSize="small" /> : <ContentCopyIcon fontSize="small" />}
                  </IconButton>
                </Tooltip>
              </Paper>
              <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: 'block' }}>
                This password will be required for the user's first login
              </Typography>
            </Box>
            
            {/* Instructions Section */}
            <Box>
              <Typography variant="subtitle2" color="text.secondary">Instructions</Typography>
              <Typography variant="body2">
                Share these credentials securely with the {selectedRole.toLowerCase()}. 
                They will be prompted to change their password upon first login.
              </Typography>
            </Box>
          </Stack>
        </DialogContent>
        
        <DialogActions sx={{ p: 2 }}>
          <Button onClick={handleCloseInviteDialog}>Cancel</Button>
          <Button 
            variant="contained" 
            onClick={handleSendInvite}
            startIcon={<EmailIcon />}
          >
            Send Invitation
          </Button>
        </DialogActions>
      </Dialog>

      {/* Region: Action Menu (dropdown) */}
      <Menu
        anchorEl={anchorEl}
        open={isMenuOpen}
        onClose={handleMenuClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        PaperProps={{ sx: styles.actionMenu }}
      >
        <MenuItem onClick={handleAssignTask} sx={styles.actionMenuItem}>
          <AssignmentIcon sx={styles.actionMenuIcon('#f3722c')} /> Assign Task
        </MenuItem>
        <MenuItem onClick={handleRemoveUser} sx={styles.actionMenuItem}>
          <PeopleIcon sx={styles.actionMenuIcon('#f44336')} /> Remove User
        </MenuItem>
      </Menu>

{/* Snackbar with message when the user logs out of the system /their portal */}

      <Snackbar
        open={openSnackbar}
        autoHideDuration={1500}
        onClose={() => setOpenSnackbar(false)}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert severity="success" 
        //we use SUCCESS instead of INFO so that we can have the power to switch colours
        sx={{ width: '100%', 
          fontWeight: 'bold',
          fontSize: '1.2rem'
        }}>
          Logging out...
        </Alert>
      </Snackbar>
{/* Snackbar with message when an invitation is sent successfully */}
      <Snackbar
        open={openInviteSuccess}
        autoHideDuration={3000}
        onClose={() => setOpenInviteSuccess(false)}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert severity="success" 
          sx={{ width: '100%', 
            fontWeight: 'bold',
            fontSize: '1.2rem'
          }}>
          Invitation has been sent to {invitedEmail}
        </Alert>
      </Snackbar>
    </Box>
  );
}
  