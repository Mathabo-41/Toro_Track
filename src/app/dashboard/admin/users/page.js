/* The file that combines the logic with the styles and displays it as a screen. 
Rendering takes place here to make the screen respond fast when it is being clicked*/
'use client';

import React from 'react';
import Link from 'next/link';

// Import Material-UI components
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Stack,
  List,
  ListItem,
  ListItemText,
  Button,
  Drawer,
  ListItemButton,
  TextField,
  Chip,
  IconButton,
  Menu,
  MenuItem,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Select,
  FormControl,
  InputAdornment
} from '@mui/material';

// Import Material-UI icons
import {
  People as PeopleIcon,
  Groups as TeamsIcon,
  MoreVert as MoreVertIcon,
  Email as EmailIcon,
  Assignment as AssignmentIcon,
  GroupAdd as GroupAddIcon,
} from '@mui/icons-material';

// Import local files
import { styles } from './styles';
import { useUsers } from './useUsers/page';
import { adminMenuData } from './usersService/page';

// Main Component
// ------------------------------------------------
export default function TeamsAndUsers() {
  // Region: Hooks and State
  // ------------------------------------------------
  const {
    inviteEmail,
    setInviteEmail,
    users,
    teams,
    selectedUser,
    newTask,
    setNewTask,
    anchorEl,
    isMenuOpen,
    handleInviteUser,
    handleAddTask,
    handleMenuOpen,
    handleMenuClose,
    handleAssignTask,
    handleRemoveUser,
    handleUpdateRole,
    handleUpdateTeam
  } = useUsers();

  // Region: Render
  // ------------------------------------------------
  return (
    <Box sx={styles.mainContainer}>
      {/* Region: Sidebar Navigation */}
      <Drawer variant="permanent" anchor="left" sx={styles.sidebarDrawer}>
        <Box sx={styles.sidebarHeader}>
          <Typography variant="h5">
            Admin Panel
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
                  <Button
                    variant="contained"
                    startIcon={<GroupAddIcon />}
                    onClick={handleInviteUser}
                    sx={styles.inviteButton}
                  >
                    Invite
                  </Button>
                </Stack>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* Users Table */}
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
                      <TableCell sx={styles.tableBodyCell}>{user.name}</TableCell>
                      <TableCell sx={styles.tableBodyCell}>{user.email}</TableCell>
                      <TableCell sx={styles.tableBodyCell}>
                        <FormControl fullWidth size="small">
                          <Select
                            value={user.role}
                            onChange={(e) => handleUpdateRole(user.id, e.target.value)}
                            sx={styles.selectInput}
                          >
                            <MenuItem value="Admin" sx={styles.selectMenuItem}>Admin</MenuItem>
                            <MenuItem value="Project Manager" sx={styles.selectMenuItem}>Project Manager</MenuItem>
                            <MenuItem value="Developer" sx={styles.selectMenuItem}>Developer</MenuItem>
                            <MenuItem value="Designer" sx={styles.selectMenuItem}>Designer</MenuItem>
                            <MenuItem value="Member" sx={styles.selectMenuItem}>Member</MenuItem>
                          </Select>
                        </FormControl>
                      </TableCell>
                      <TableCell sx={styles.tableBodyCell}>
                        <FormControl fullWidth size="small">
                          <Select
                            value={user.team}
                            onChange={(e) => handleUpdateTeam(user.id, e.target.value)}
                            sx={styles.selectInput}
                          >
                            {teams.map((team) => (
                              <MenuItem key={team} value={team} sx={styles.selectMenuItem}>
                                {team}
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                      </TableCell>
                      <TableCell sx={styles.tableBodyCell}>
                        <Stack direction="row" spacing={1} sx={{ mb: 1, flexWrap: 'wrap' }}>
                          {user.tasks.map((task, index) => (
                            <Chip
                              key={index}
                              label={task}
                              size="small"
                              sx={styles.taskChip}
                            />
                          ))}
                        </Stack>
                        {selectedUser === user.id && (
                          <Stack direction="row" spacing={1}>
                            <TextField
                              size="small"
                              placeholder="Add task"
                              value={newTask}
                              onChange={(e) => setNewTask(e.target.value)}
                              sx={styles.taskInput}
                            />
                            <Button
                              size="small"
                              variant="contained"
                              onClick={() => handleAddTask(user.id)}
                              sx={styles.addTaskButton}
                            >
                              Add
                            </Button>
                          </Stack>
                        )}
                      </TableCell>
                      <TableCell>
                        <IconButton
                          onClick={(e) => handleMenuOpen(e, user.id)}
                          sx={styles.menuIconButton}
                        >
                          <MoreVertIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </CardContent>
        </Card>
      </Box>

      {/* Action Menu (dropdown) */}
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
    </Box>
  );
}