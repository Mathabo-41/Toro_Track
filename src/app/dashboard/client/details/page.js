'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Stack,
  Avatar,
  List,
  ListItem,
  ListItemText,
  Divider,
  Button,
  Drawer,
  ListItemButton,
  Chip,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tabs,
  Tab,
  TextField,
  IconButton,
} from '@mui/material';
import {
  Assignment as ProjectIcon,
  People as TeamIcon,
  Timeline as TimelineIcon,
  AttachFile as FilesIcon,
  Chat as DiscussionIcon,
  CheckCircle as CompletedIcon,
  Pending as PendingIcon,
  Edit as EditIcon,
  Download as DownloadIcon,
  MoreVert as MoreVertIcon,
} from '@mui/icons-material';
import {
  mainBox,
  drawerPaper,
  drawerHeader,
  listItemButton,
  mainContentBox,
  projectHeader,
  projectTitle,
  projectIcon,
  statusChip,
  projectDescription,
  progressCard,
  progressCardContent,
  progressBarContainer,
  progressBar,
  deadlineBox,
  tabs,
  tab,
  tabContentBox,
  infoCard,
  infoCardContent,
  infoLabel,
  infoValue,
  recentActivityItem,
  milestonesTableContainer,
  tableCellHeader,
  tableCell,
  statusChipCompleted,
  statusChipInProgress,
  statusChipPending,
  teamCard,
  teamCardContent,
  memberRole,
  filesTableContainer,
  fileNameStack,
  fileNameIcon,
  discussionList,
  discussionDivider,
  commentUser,
  commentText,
  commentTime,
  commentForm,
  commentInput,
  postButton,
} from '.client_styles./styles';

/**
 * Client Project Details Screen
 */

const clientMenu = [
  { name: 'Project Details', path: '/dashboard/client/details' },
  { name: 'Raise Query', path: '/dashboard/client/query' },
  { name: 'Meetings & Messages', path: '/dashboard/client/messages' },
  { name: 'Settings', path: '/dashboard/client/settings' },
];

// Sample project data
const projectData = {
  id: 'PRJ-2023-045',
  name: 'E-commerce Website Redesign',
  description:
    'Complete redesign of the existing e-commerce platform with modern UI/UX and improved checkout flow.',
  status: 'active',
  progress: 65,
  startDate: '2023-11-15',
  deadline: '2024-03-20',
  budget: 'R 28,500',
  team: [
    {
      id: 1,
      name: 'Thabo Johnson',
      role: 'Project Manager',
      avatar: '/avatars/1.jpg',
    },
    {
      id: 2,
      name: 'Sarah Mokoena',
      role: 'UI/UX Designer',
      avatar: '/avatars/2.jpg',
    },
    {
      id: 3,
      name: 'Michael B.Jordan',
      role: 'Frontend Developer',
      avatar: '/avatars/3.jpg',
    },
    {
      id: 4,
      name: 'David Wilson',
      role: 'Backend Developer',
      avatar: '/avatars/4.jpg',
    },
  ],
  milestones: [
    { id: 1, name: 'Discovery Phase', status: 'completed', dueDate: '2023-12-01' },
    { id: 2, name: 'UI/UX Design', status: 'completed', dueDate: '2024-01-15' },
    { id: 3, name: 'Frontend Development', status: 'in-progress', dueDate: '2024-02-28' },
    { id: 4, name: 'Backend Integration', status: 'pending', dueDate: '2024-03-10' },
    { id: 5, name: 'Testing & Launch', status: 'pending', dueDate: '2024-03-20' },
  ],
  files: [
    { id: 1, name: 'Project Scope.pdf', type: 'pdf', size: '2.4 MB', date: '2023-11-10' },
    { id: 2, name: 'Wireframes.sketch', type: 'sketch', size: '5.1 MB', date: '2023-12-05' },
    { id: 3, name: 'Style Guide.pdf', type: 'pdf', size: '3.2 MB', date: '2024-01-20' },
  ],
};

export default function ProjectDetails() {
  const [activeTab, setActiveTab] = useState(0);
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState([
    {
      id: 1,
      user: 'Thabo Johnson',
      text: 'The initial designs have been approved by the client. Moving to development phase.',
      time: '2 days ago',
    },
    {
      id: 2,
      user: 'You',
      text: 'The checkout flow needs some adjustments based on our last discussion.',
      time: '1 day ago',
    },
  ]);

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (comment.trim()) {
      setComments([
        ...comments,
        {
          id: comments.length + 1,
          user: 'You',
          text: comment,
          time: 'Just now',
        },
      ]);
      setComment('');
    }
  };

  return (
    <Box sx={mainBox}>
      {/* Sidebar Navigation */}
      <Drawer
        variant="permanent"
        anchor="left"
        sx={{
          width: 240,
          flexShrink: 0,
          '& .MuiDrawer-paper': drawerPaper,
        }}
      >
        <Box sx={drawerHeader}>
          <Typography variant="h5">Client Portal</Typography>
        </Box>
        <List>
          {clientMenu.map((item, index) => (
            <ListItem key={index} disablePadding>
              <ListItemButton
                component={Link}
                href={item.path}
                sx={{
                  ...listItemButton,
                  ...(item.name === 'Project Details' && {
                    backgroundColor: '#6b705c',
                  }),
                }}
              >
                <ListItemText primary={item.name} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>

      {/* Main Content */}
      <Box component="main" sx={mainContentBox}>
        {/* Project Header */}
        <Box sx={projectHeader}>
          <Stack direction="row" justifyContent="space-between" alignItems="center">
            <Typography variant="h4" sx={projectTitle}>
              <ProjectIcon sx={projectIcon} />
              {projectData.name}
            </Typography>
            <Chip
              label={projectData.status === 'active' ? 'In Progress' : 'Completed'}
              sx={statusChip(projectData.status)}
            />
          </Stack>
          <Typography variant="body1" sx={projectDescription}>
            Project ID: {projectData.id} | {projectData.description}
          </Typography>
        </Box>

        {/* Project Progress */}
        <Card sx={progressCard}>
          <CardContent>
            <Typography variant="h6" sx={progressCardContent}>
              Project Progress
            </Typography>
            <Stack direction="row" alignItems="center" spacing={2}>
              <Box sx={{ width: '100%' }}>
                <Box sx={progressBarContainer}>
                  <Box sx={progressBar(projectData.progress)} />
                </Box>
                <Typography variant="body2" sx={projectDescription}>
                  {projectData.progress}% completed
                </Typography>
              </Box>
              <Box sx={deadlineBox}>
                <Typography variant="body2" sx={projectDescription}>
                  Deadline
                </Typography>
                <Typography variant="h6" sx={infoValue}>
                  {projectData.deadline}
                </Typography>
              </Box>
            </Stack>
          </CardContent>
        </Card>

        {/* Project Tabs */}
        <Tabs value={activeTab} onChange={handleTabChange} sx={tabs}>
          <Tab label="Overview" sx={tab} />
          <Tab label="Milestones" sx={tab} />
          <Tab label="Team" sx={tab} />
          <Tab label="Files" sx={tab} />
          <Tab label="Discussion" sx={tab} />
        </Tabs>

        {/* Tab Content */}
        <Box sx={tabContentBox}>
          {activeTab === 0 && (
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <Card sx={infoCard}>
                  <CardContent>
                    <Typography variant="h6" sx={infoCardContent}>
                      Project Details
                    </Typography>
                    <Stack spacing={2}>
                      <Box>
                        <Typography variant="body2" sx={infoLabel}>
                          Start Date
                        </Typography>
                        <Typography variant="body1" sx={infoValue}>
                          {projectData.startDate}
                        </Typography>
                      </Box>
                      <Box>
                        <Typography variant="body2" sx={infoLabel}>
                          Budget
                        </Typography>
                        <Typography variant="body1" sx={infoValue}>
                          {projectData.budget}
                        </Typography>
                      </Box>
                      <Box>
                        <Typography variant="body2" sx={infoLabel}>
                          Description
                        </Typography>
                        <Typography variant="body1" sx={infoValue}>
                          {projectData.description}
                        </Typography>
                      </Box>
                    </Stack>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} md={6}>
                <Card sx={infoCard}>
                  <CardContent>
                    <Typography variant="h6" sx={infoCardContent}>
                      Recent Activity
                    </Typography>
                    <List>
                      {['Project status updated', 'New files uploaded', 'Meeting scheduled'].map(
                        (activity, index) => (
                          <ListItem key={index} sx={recentActivityItem}>
                            <ListItemText
                              primary={activity}
                              secondary={
                                <Typography component="span" sx={infoLabel}>
                                  {index === 0 ? 'Today' : index === 1 ? 'Yesterday' : '2 days ago'}
                                </Typography>
                              }
                            />
                          </ListItem>
                        )
                      )}
                    </List>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          )}

          {activeTab === 1 && (
            <Card sx={infoCard}>
              <CardContent>
                <Typography variant="h6" sx={infoCardContent}>
                  Project Milestones
                </Typography>
                <TableContainer component={Paper} sx={milestonesTableContainer}>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell sx={tableCellHeader}>Milestone</TableCell>
                        <TableCell sx={tableCellHeader}>Status</TableCell>
                        <TableCell sx={tableCellHeader}>Due Date</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {projectData.milestones.map((milestone) => (
                        <TableRow key={milestone.id}>
                          <TableCell sx={tableCell}>{milestone.name}</TableCell>
                          <TableCell>
                            <Chip
                              icon={
                                milestone.status === 'completed' ? (
                                  <CompletedIcon />
                                ) : milestone.status === 'in-progress' ? (
                                  <PendingIcon color="warning" />
                                ) : (
                                  <PendingIcon color="disabled" />
                                )
                              }
                              label={
                                milestone.status === 'completed'
                                  ? 'Completed'
                                  : milestone.status === 'in-progress'
                                  ? 'In Progress'
                                  : 'Pending'
                              }
                              sx={
                                milestone.status === 'completed'
                                  ? statusChipCompleted
                                  : milestone.status === 'in-progress'
                                  ? statusChipInProgress
                                  : statusChipPending
                              }
                            />
                          </TableCell>
                          <TableCell sx={tableCell}>{milestone.dueDate}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </CardContent>
            </Card>
          )}

          {activeTab === 2 && (
            <Card sx={infoCard}>
              <CardContent>
                <Typography variant="h6" sx={infoCardContent}>
                  Team Members
                </Typography>
                <Grid container spacing={2}>
                  {projectData.team.map((member) => (
                    <Grid item xs={12} sm={6} key={member.id}>
                      <Card sx={teamCard}>
                        <CardContent>
                          <Stack direction="row" spacing={2} alignItems="center">
                            <Avatar src={member.avatar} sx={{ width: 56, height: 56 }} />
                            <Box>
                              <Typography variant="body1" sx={infoValue}>
                                {member.name}
                              </Typography>
                              <Typography variant="body2" sx={memberRole}>
                                {member.role}
                              </Typography>
                            </Box>
                          </Stack>
                        </CardContent>
                      </Card>
                    </Grid>
                  ))}
                </Grid>
              </CardContent>
            </Card>
          )}

          {activeTab === 3 && (
            <Card sx={infoCard}>
              <CardContent>
                <Typography variant="h6" sx={infoCardContent}>
                  Project Files
                </Typography>
                <TableContainer component={Paper} sx={filesTableContainer}>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell sx={tableCellHeader}>File Name</TableCell>
                        <TableCell sx={tableCellHeader}>Type</TableCell>
                        <TableCell sx={tableCellHeader}>Size</TableCell>
                        <TableCell sx={tableCellHeader}>Date</TableCell>
                        <TableCell sx={tableCellHeader}>Actions</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {projectData.files.map((file) => (
                        <TableRow key={file.id}>
                          <TableCell sx={tableCell}>
                            <Stack direction="row" alignItems="center" spacing={1} sx={fileNameStack}>
                              <FilesIcon fontSize="small" sx={fileNameIcon} />
                              <Typography>{file.name}</Typography>
                            </Stack>
                          </TableCell>
                          <TableCell sx={tableCell}>{file.type.toUpperCase()}</TableCell>
                          <TableCell sx={tableCell}>{file.size}</TableCell>
                          <TableCell sx={tableCell}>{file.date}</TableCell>
                          <TableCell>
                            <IconButton sx={fileNameIcon}>
                              <DownloadIcon />
                            </IconButton>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </CardContent>
            </Card>
          )}

          {activeTab === 4 && (
            <Card sx={infoCard}>
              <CardContent>
                <Typography variant="h6" sx={infoCardContent}>
                  Project Discussion
                </Typography>
                <List sx={discussionList}>
                  {comments.map((comment) => (
                    <div key={comment.id}>
                      <ListItem alignItems="flex-start">
                        <ListItemText
                          primary={
                            <Typography sx={commentUser}>{comment.user}</Typography>
                          }
                          secondary={
                            <>
                              <Typography component="span" sx={commentText}>
                                {comment.text}
                              </Typography>
                              <Typography component="span" sx={commentTime}>
                                {comment.time}
                              </Typography>
                            </>
                          }
                        />
                      </ListItem>
                      <Divider sx={discussionDivider} />
                    </div>
                  ))}
                </List>
                <Box component="form" onSubmit={handleCommentSubmit}>
                  <Stack direction="row" spacing={1} sx={commentForm}>
                    <TextField
                      fullWidth
                      variant="outlined"
                      placeholder="Add a comment..."
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                      sx={commentInput}
                    />
                    <Button type="submit" variant="contained" sx={postButton}>
                      Post
                    </Button>
                  </Stack>
                </Box>
              </CardContent>
            </Card>
          )}
        </Box>
      </Box>
    </Box>
  );
}