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
  IconButton
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
  MoreVert as MoreVertIcon
} from '@mui/icons-material';

/**
 * Client Project Details Screen
 */

const clientMenu = [
  { name: 'Project Details', path: '/dashboard/client/details' },
  { name: 'Raise Query', path: '/dashboard/client/query' },
  { name: 'Meetings & Messages', path: '/dashboard/client/messages' },
  { name: 'Settings', path: '/dashboard/client/settings' }
];

// Sample project data
const projectData = {
  id: 'PRJ-2023-045',
  name: 'E-commerce Website Redesign',
  description: 'Complete redesign of the existing e-commerce platform with modern UI/UX and improved checkout flow.',
  status: 'active',
  progress: 65,
  startDate: '2023-11-15',
  deadline: '2024-03-20',
  budget: 'R 28,500',
  team: [
    { id: 1, name: 'Thabo Johnson', role: 'Project Manager', avatar: '/avatars/1.jpg' },
    { id: 2, name: 'Sarah Mokoena', role: 'UI/UX Designer', avatar: '/avatars/2.jpg' },
    { id: 3, name: 'Michael B.Jordan', role: 'Frontend Developer', avatar: '/avatars/3.jpg' },
    { id: 4, name: 'David Wilson', role: 'Backend Developer', avatar: '/avatars/4.jpg' }
  ],
  milestones: [
    { id: 1, name: 'Discovery Phase', status: 'completed', dueDate: '2023-12-01' },
    { id: 2, name: 'UI/UX Design', status: 'completed', dueDate: '2024-01-15' },
    { id: 3, name: 'Frontend Development', status: 'in-progress', dueDate: '2024-02-28' },
    { id: 4, name: 'Backend Integration', status: 'pending', dueDate: '2024-03-10' },
    { id: 5, name: 'Testing & Launch', status: 'pending', dueDate: '2024-03-20' }
  ],
  files: [
    { id: 1, name: 'Project Scope.pdf', type: 'pdf', size: '2.4 MB', date: '2023-11-10' },
    { id: 2, name: 'Wireframes.sketch', type: 'sketch', size: '5.1 MB', date: '2023-12-05' },
    { id: 3, name: 'Style Guide.pdf', type: 'pdf', size: '3.2 MB', date: '2024-01-20' }
  ]
};

export default function ProjectDetails() {
  const [activeTab, setActiveTab] = useState(0);
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState([
    { id: 1, user: 'Thabo Johnson', text: 'The initial designs have been approved by the client. Moving to development phase.', time: '2 days ago' },
    { id: 2, user: 'You', text: 'The checkout flow needs some adjustments based on our last discussion.', time: '1 day ago' }
  ]);

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (comment.trim()) {
      setComments([...comments, {
        id: comments.length + 1,
        user: 'You',
        text: comment,
        time: 'Just now'
      }]);
      setComment('');
    }
  };

  return (
    <Box sx={{ 
      display: 'flex', 
      minHeight: '100vh', 
      backgroundColor: '#000000' // Pure black background
    }}>
      {/* Sidebar Navigation */}
      <Drawer
        variant="permanent"
        anchor="left"
        sx={{
          width: 240,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: 240,
            boxSizing: 'border-box',
            backgroundColor: '#000000', // Pure black
            borderRight: '1px solid #222', // Subtle border
            color: '#fff' // White text
          }
        }}
      >
        <Box sx={{ p: 2, borderBottom: '1px solid #222' }}>
          <Typography variant="h6" > 
            👔 Client Portal
          </Typography>
        </Box>
        <List>
          {clientMenu.map((item, index) => (
            <ListItem key={index} disablePadding>
              <ListItemButton 
                component={Link} 
                href={item.path}
                sx={{ 
                  color: '#fff',
                  backgroundColor: item.name === 'Project Details' ? '#1a1a1a' : 'transparent',
                  '&:hover': {
                    backgroundColor: '#1a1a1a' // Darker background on hover
                  }
                }}
              >
                <ListItemText primary={item.name} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>

      {/* Main Content */}
      <Box component="main" sx={{ 
        flexGrow: 1, 
        p: 3,
        backgroundColor: '#000000' // Pure black background
      }}>
        {/* Project Header */}
        <Box sx={{ mb: 4 }}>
          <Stack direction="row" justifyContent="space-between" alignItems="center">
            <Typography variant="h4" sx={{ 
              color: '#fff',
              fontWeight: 500
            }}>
              <ProjectIcon sx={{ 
                mr: 1, 
                verticalAlign: 'middle',
                color: '#f4c10f' // Gold accent
              }} />
              {projectData.name}
            </Typography>
            <Chip
              label={projectData.status === 'active' ? 'In Progress' : 'Completed'}
              sx={{
                backgroundColor: projectData.status === 'active' ? 'rgba(2, 136, 209, 0.2)' : 'rgba(46, 125, 50, 0.2)',
                color: projectData.status === 'active' ? '#4fc3f7' : '#81c784',
                border: projectData.status === 'active' ? '1px solid #0288d1' : '1px solid #2e7d32',
                fontWeight: 'bold'
              }}
            />
          </Stack>
          <Typography variant="body1" sx={{ 
            color: 'rgba(255, 255, 255, 0.7)',
            mt: 1
          }}>
            Project ID: {projectData.id} | {projectData.description}
          </Typography>
        </Box>

        {/* Project Progress */}
        <Card sx={{ 
          backgroundColor: '#0a0a0a',
          mb: 3,
          border: '1px solid #222'
        }}>
          <CardContent>
            <Typography variant="h6" sx={{ 
              color: '#fff',
              mb: 2,
              fontWeight: 500
            }}>
              Project Progress
            </Typography>
            <Stack direction="row" alignItems="center" spacing={2}>
              <Box sx={{ width: '100%' }}>
                <Box sx={{ 
                  width: '100%',
                  height: 10,
                  backgroundColor: '#333',
                  borderRadius: 5,
                  overflow: 'hidden'
                }}>
                  <Box sx={{ 
                    width: `${projectData.progress}%`,
                    height: '100%',
                    backgroundColor: '#f4c10f'
                  }} />
                </Box>
                <Typography variant="body2" sx={{ 
                  color: 'rgba(255, 255, 255, 0.7)',
                  mt: 1
                }}>
                  {projectData.progress}% completed
                </Typography>
              </Box>
              <Box sx={{ 
                backgroundColor: '#1a1a1a',
                p: 2,
                borderRadius: 1,
                border: '1px solid #333',
                minWidth: 120
              }}>
                <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                  Deadline
                </Typography>
                <Typography variant="h6" sx={{ color: '#fff' }}>
                  {projectData.deadline}
                </Typography>
              </Box>
            </Stack>
          </CardContent>
        </Card>

        {/* Project Tabs */}
        <Tabs 
          value={activeTab} 
          onChange={handleTabChange}
          sx={{
            '& .MuiTabs-indicator': {
              backgroundColor: '#f4c10f' // Gold indicator
            },
            mb: 3
          }}
        >
          <Tab label="Overview" sx={{ color: '#fff' }} />
          <Tab label="Milestones" sx={{ color: '#fff' }} />
          <Tab label="Team" sx={{ color: '#fff' }} />
          <Tab label="Files" sx={{ color: '#fff' }} />
          <Tab label="Discussion" sx={{ color: '#fff' }} />
        </Tabs>

        {/* Tab Content */}
        <Box sx={{ mt: 2 }}>
          {activeTab === 0 && (
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <Card sx={{ 
                  backgroundColor: '#0a0a0a',
                  border: '1px solid #222',
                  height: '100%'
                }}>
                  <CardContent>
                    <Typography variant="h6" sx={{ 
                      color: '#fff',
                      mb: 2,
                      fontWeight: 500
                    }}>
                      Project Details
                    </Typography>
                    <Stack spacing={2}>
                      <Box>
                        <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                          Start Date
                        </Typography>
                        <Typography variant="body1" sx={{ color: '#fff' }}>
                          {projectData.startDate}
                        </Typography>
                      </Box>
                      <Box>
                        <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                          Budget
                        </Typography>
                        <Typography variant="body1" sx={{ color: '#fff' }}>
                          {projectData.budget}
                        </Typography>
                      </Box>
                      <Box>
                        <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                          Description
                        </Typography>
                        <Typography variant="body1" sx={{ color: '#fff' }}>
                          {projectData.description}
                        </Typography>
                      </Box>
                    </Stack>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} md={6}>
                <Card sx={{ 
                  backgroundColor: '#0a0a0a',
                  border: '1px solid #222'
                }}>
                  <CardContent>
                    <Typography variant="h6" sx={{ 
                      color: '#fff',
                      mb: 2,
                      fontWeight: 500
                    }}>
                      Recent Activity
                    </Typography>
                    <List>
                      {['Project status updated', 'New files uploaded', 'Meeting scheduled'].map((activity, index) => (
                        <ListItem key={index} sx={{ color: '#fff' }}>
                          <ListItemText
                            primary={activity}
                            secondary={
                              <Typography sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                                {index === 0 ? 'Today' : index === 1 ? 'Yesterday' : '2 days ago'}
                              </Typography>
                            }
                          />
                        </ListItem>
                      ))}
                    </List>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          )}

          {activeTab === 1 && (
            <Card sx={{ 
              backgroundColor: '#0a0a0a',
              border: '1px solid #222'
            }}>
              <CardContent>
                <Typography variant="h6" sx={{ 
                  color: '#fff',
                  mb: 2,
                  fontWeight: 500
                }}>
                  Project Milestones
                </Typography>
                <TableContainer component={Paper} sx={{ 
                  backgroundColor: 'transparent',
                  border: '1px solid #333'
                }}>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell sx={{ color: '#fff', fontWeight: 'bold' }}>Milestone</TableCell>
                        <TableCell sx={{ color: '#fff', fontWeight: 'bold' }}>Status</TableCell>
                        <TableCell sx={{ color: '#fff', fontWeight: 'bold' }}>Due Date</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {projectData.milestones.map((milestone) => (
                        <TableRow key={milestone.id}>
                          <TableCell sx={{ color: '#fff' }}>{milestone.name}</TableCell>
                          <TableCell>
                            <Chip
                              icon={milestone.status === 'completed' ? <CompletedIcon /> : 
                                   milestone.status === 'in-progress' ? <PendingIcon color="warning" /> : 
                                   <PendingIcon color="disabled" />}
                              label={milestone.status === 'completed' ? 'Completed' : 
                                    milestone.status === 'in-progress' ? 'In Progress' : 'Pending'}
                              sx={{
                                backgroundColor: milestone.status === 'completed' ? 'rgba(46, 125, 50, 0.2)' : 
                                               milestone.status === 'in-progress' ? 'rgba(255, 152, 0, 0.2)' : 
                                               'rgba(97, 97, 97, 0.2)',
                                color: milestone.status === 'completed' ? '#81c784' : 
                                      milestone.status === 'in-progress' ? '#ffb74d' : '#bdbdbd',
                                border: milestone.status === 'completed' ? '1px solid #2e7d32' : 
                                       milestone.status === 'in-progress' ? '1px solid #ff9800' : 
                                       '1px solid #616161'
                              }}
                            />
                          </TableCell>
                          <TableCell sx={{ color: '#fff' }}>{milestone.dueDate}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </CardContent>
            </Card>
          )}

          {activeTab === 2 && (
            <Card sx={{ 
              backgroundColor: '#0a0a0a',
              border: '1px solid #222'
            }}>
              <CardContent>
                <Typography variant="h6" sx={{ 
                  color: '#fff',
                  mb: 2,
                  fontWeight: 500
                }}>
                  Team Members
                </Typography>
                <Grid container spacing={2}>
                  {projectData.team.map((member) => (
                    <Grid item xs={12} sm={6} key={member.id}>
                      <Card sx={{ 
                        backgroundColor: '#1a1a1a',
                        border: '1px solid #333'
                      }}>
                        <CardContent>
                          <Stack direction="row" spacing={2} alignItems="center">
                            <Avatar 
                              src={member.avatar} 
                              sx={{ width: 56, height: 56 }}
                            />
                            <Box>
                              <Typography variant="body1" sx={{ color: '#fff' }}>
                                {member.name}
                              </Typography>
                              <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
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
            <Card sx={{ 
              backgroundColor: '#0a0a0a',
              border: '1px solid #222'
            }}>
              <CardContent>
                <Typography variant="h6" sx={{ 
                  color: '#fff',
                  mb: 2,
                  fontWeight: 500
                }}>
                  Project Files
                </Typography>
                <TableContainer component={Paper} sx={{ 
                  backgroundColor: 'transparent',
                  border: '1px solid #333'
                }}>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell sx={{ color: '#fff', fontWeight: 'bold' }}>File Name</TableCell>
                        <TableCell sx={{ color: '#fff', fontWeight: 'bold' }}>Type</TableCell>
                        <TableCell sx={{ color: '#fff', fontWeight: 'bold' }}>Size</TableCell>
                        <TableCell sx={{ color: '#fff', fontWeight: 'bold' }}>Date</TableCell>
                        <TableCell sx={{ color: '#fff', fontWeight: 'bold' }}>Actions</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {projectData.files.map((file) => (
                        <TableRow key={file.id}>
                          <TableCell sx={{ color: '#fff' }}>
                            <Stack direction="row" alignItems="center" spacing={1}>
                              <FilesIcon fontSize="small" />
                              <Typography>{file.name}</Typography>
                            </Stack>
                          </TableCell>
                          <TableCell sx={{ color: '#fff' }}>{file.type.toUpperCase()}</TableCell>
                          <TableCell sx={{ color: '#fff' }}>{file.size}</TableCell>
                          <TableCell sx={{ color: '#fff' }}>{file.date}</TableCell>
                          <TableCell>
                            <IconButton sx={{ color: '#f4c10f' }}>
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
            <Card sx={{ 
              backgroundColor: '#0a0a0a',
              border: '1px solid #222'
            }}>
              <CardContent>
                <Typography variant="h6" sx={{ 
                  color: '#fff',
                  mb: 2,
                  fontWeight: 500
                }}>
                  Project Discussion
                </Typography>
                <List sx={{ mb: 3, maxHeight: 400, overflow: 'auto' }}>
                  {comments.map((comment) => (
                    <div key={comment.id}>
                      <ListItem alignItems="flex-start">
                        <ListItemText
                          primary={
                            <Typography sx={{ color: '#fff', fontWeight: 500 }}>
                              {comment.user}
                            </Typography>
                          }
                          secondary={
                            <>
                              <Typography sx={{ color: '#fff', mt: 0.5 }}>
                                {comment.text}
                              </Typography>
                              <Typography sx={{ color: 'rgba(255, 255, 255, 0.5)', fontSize: '0.75rem', mt: 0.5 }}>
                                {comment.time}
                              </Typography>
                            </>
                          }
                        />
                      </ListItem>
                      <Divider sx={{ backgroundColor: '#333' }} />
                    </div>
                  ))}
                </List>
                <Box component="form" onSubmit={handleCommentSubmit}>
                  <Stack direction="row" spacing={1}>
                    <TextField
                      fullWidth
                      variant="outlined"
                      placeholder="Add a comment..."
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                      sx={{
                        '& .MuiInputBase-input': { color: '#fff' },
                        '& .MuiOutlinedInput-root': {
                          '& fieldset': {
                            borderColor: 'rgba(255, 255, 255, 0.23)',
                          },
                        },
                      }}
                    />
                    <Button 
                      type="submit"
                      variant="contained"
                      sx={{
                        backgroundColor: '#f4c10f',
                        color: '#000',
                        '&:hover': {
                          backgroundColor: '#d1a20b'
                        }
                      }}
                    >
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