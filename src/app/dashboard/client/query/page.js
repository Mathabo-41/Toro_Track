'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Stack,
  Button,
  Drawer,
  ListItemButton,
  List,
  Grid,
  ListItem,
  ListItemText,
  Divider,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Chip,
  Avatar,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton
} from '@mui/material';
import {
  Help as QueryIcon,
  Send as SendIcon,
  CheckCircle as ResolvedIcon,
  Pending as PendingIcon,
  ArrowBack as BackIcon,
  AttachFile as AttachIcon,
  Delete as DeleteIcon
} from '@mui/icons-material';

/**
 * Client Query Screen

 */

const clientMenu = [
  { name: 'Project Details', path: '/dashboard/client/details' },
  { name: 'Raise Query', path: '/dashboard/client/query' },
  { name: 'Meetings & Messages', path: '/dashboard/client/messages' },
  { name: 'Settings', path: '/dashboard/client/settings' }
];

// Sample query data
const queryData = [
  {
    id: 'QRY-001',
    title: 'Checkout Page Issue',
    status: 'resolved',
    date: '2023-11-15',
    category: 'Technical',
    description: 'The checkout page is not loading properly on mobile devices. The payment button disappears when scrolling.',
    response: 'This has been fixed in the latest update. Please clear your cache and try again.',
    attachments: []
  },
  {
    id: 'QRY-002',
    title: 'Design Revision Request',
    status: 'in-progress',
    date: '2023-12-03',
    category: 'Design',
    description: 'Can we make the product images larger on the category pages? They seem too small compared to the mockups.',
    response: 'Our design team is reviewing this request. We\'ll get back to you by Friday.',
    attachments: [
      { name: 'mockup-v1.pdf', size: '2.4 MB' }
    ]
  },
  {
    id: 'QRY-003',
    title: 'API Documentation',
    status: 'pending',
    date: '2023-12-10',
    category: 'Documentation',
    description: 'Where can I find the updated API documentation for the new endpoints?',
    response: '',
    attachments: []
  }
];

export default function ClientQuery() {
  const [activeQuery, setActiveQuery] = useState(null);
  const [newQuery, setNewQuery] = useState({
    title: '',
    category: '',
    description: '',
    attachments: []
  });
  const [fileToUpload, setFileToUpload] = useState(null);

  const handleFileChange = (e) => {
    if (e.target.files.length > 0) {
      const file = e.target.files[0];
      setFileToUpload({
        name: file.name,
        size: `${(file.size / (1024 * 1024)).toFixed(1)} MB`
      });
    }
  };

  const handleRemoveFile = () => {
    setFileToUpload(null);
  };

  const handleSubmitQuery = (e) => {
    e.preventDefault();
    // this is where we are going to send the data/user input to our backend
    alert('Query submitted successfully!');
    setNewQuery({
      title: '',
      category: '',
      description: '',
      attachments: []
    });
    setFileToUpload(null);
  };

  return (
    <Box sx={{ 
      display: 'flex', 
      minHeight: '100vh', 
      backgroundColor: '#000000' 
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
            backgroundColor: '#000000', 
            borderRight: '1px solid #222', // Subtle border
            color: '#fff' // White text
          }
        }}
      >
        <Box sx={{ p: 2, borderBottom: '1px solid #222' }}>
          <Typography variant="h6">
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
                  backgroundColor: item.name === 'Raise Query' ? '#1a1a1a' : 'transparent',
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
        backgroundColor: '#000000' // black background
      }}>
        {/* Header */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="h4" sx={{ 
            color: '#fff',
            fontWeight: 500
          }}>
            <QueryIcon sx={{ 
              mr: 1, 
              verticalAlign: 'middle',
              color: '#f4c10f' // Gold accent
            }} />
            {activeQuery ? 'Query Details' : 'Raise a Query'}
          </Typography>
          <Typography variant="body1" sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
            {activeQuery ? 'View and manage your query' : 'Submit questions or issues about your project'}
          </Typography>
        </Box>

        {activeQuery ? (
          /* Query Detail View */
          <Card sx={{ 
            backgroundColor: '#0a0a0a',
            border: '1px solid #222'
          }}>
            <CardContent>
              <Button 
                startIcon={<BackIcon />}
                onClick={() => setActiveQuery(null)}
                sx={{ 
                  color: '#f4c10f',
                  mb: 2
                }}
              >
                Back to queries
              </Button>

              <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 3 }}>
                <Typography variant="h5" sx={{ color: '#fff' }}>
                  {activeQuery.title}
                </Typography>
                <Chip
                  label={activeQuery.status === 'resolved' ? 'Resolved' : 
                        activeQuery.status === 'in-progress' ? 'In Progress' : 'Pending'}
                  icon={activeQuery.status === 'resolved' ? <ResolvedIcon /> : <PendingIcon />}
                  sx={{
                    backgroundColor: activeQuery.status === 'resolved' ? 'rgba(46, 125, 50, 0.2)' : 
                                  activeQuery.status === 'in-progress' ? 'rgba(255, 152, 0, 0.2)' : 
                                  'rgba(97, 97, 97, 0.2)',
                    color: activeQuery.status === 'resolved' ? '#81c784' : 
                          activeQuery.status === 'in-progress' ? '#ffb74d' : '#bdbdbd',
                    border: activeQuery.status === 'resolved' ? '1px solid #2e7d32' : 
                           activeQuery.status === 'in-progress' ? '1px solid #ff9800' : 
                           '1px solid #616161'
                  }}
                />
              </Stack>

              <Box sx={{ mb: 3 }}>
                <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                  Category
                </Typography>
                <Typography variant="body1" sx={{ color: '#fff', mb: 2 }}>
                  {activeQuery.category}
                </Typography>

                <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                  Submitted on
                </Typography>
                <Typography variant="body1" sx={{ color: '#fff', mb: 2 }}>
                  {activeQuery.date}
                </Typography>

                <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                  Description
                </Typography>
                <Typography variant="body1" sx={{ color: '#fff' }}>
                  {activeQuery.description}
                </Typography>
              </Box>

              {activeQuery.attachments.length > 0 && (
                <Box sx={{ mb: 3 }}>
                  <Typography variant="body2" sx={{ 
                    color: 'rgba(255, 255, 255, 0.7)',
                    mb: 1
                  }}>
                    Attachments
                  </Typography>
                  <TableContainer component={Paper} sx={{ 
                    backgroundColor: 'transparent',
                    border: '1px solid #333'
                  }}>
                    <Table>
                      <TableBody>
                        {activeQuery.attachments.map((file, index) => (
                          <TableRow key={index}>
                            <TableCell sx={{ color: '#fff' }}>
                              <Stack direction="row" alignItems="center" spacing={1}>
                                <AttachIcon fontSize="small" />
                                <Typography>{file.name}</Typography>
                              </Stack>
                            </TableCell>
                            <TableCell sx={{ color: '#fff' }}>{file.size}</TableCell>
                            <TableCell>
                              <Button 
                                variant="outlined" 
                                size="small"
                                sx={{
                                  color: '#f4c10f',
                                  borderColor: '#f4c10f',
                                  '&:hover': {
                                    borderColor: '#d1a20b'
                                  }
                                }}
                              >
                                Download
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Box>
              )}

              {activeQuery.response && (
                <Box sx={{ 
                  backgroundColor: '#1a1a1a',
                  p: 3,
                  borderRadius: 1,
                  border: '1px solid #333'
                }}>
                  <Typography variant="body2" sx={{ 
                    color: 'rgba(255, 255, 255, 0.7)',
                    mb: 1
                  }}>
                    Response from Team
                  </Typography>
                  <Typography variant="body1" sx={{ color: '#fff' }}>
                    {activeQuery.response}
                  </Typography>
                </Box>
              )}
            </CardContent>
          </Card>
        ) : (
          /* Main Query View (List + Form) */
          <Grid container spacing={3}>
            {/* New Query Form */}
            <Grid item xs={12} md={5}>
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
                    Submit New Query
                  </Typography>

                  <Box component="form" onSubmit={handleSubmitQuery}>
                    <Stack spacing={2}>
                      <TextField
                        fullWidth
                        label="Query Title"
                        variant="outlined"
                        value={newQuery.title}
                        onChange={(e) => setNewQuery({...newQuery, title: e.target.value})}
                        required
                        sx={{
                          '& .MuiInputLabel-root': { color: 'rgba(255, 255, 255, 0.7)' },
                          '& .MuiOutlinedInput-root': {
                            '& fieldset': {
                              borderColor: 'rgba(255, 255, 255, 0.23)',
                            },
                            '&:hover fieldset': {
                              borderColor: 'rgba(255, 255, 255, 0.5)',
                            },
                          },
                          '& .MuiInputBase-input': { color: '#fff' }
                        }}
                      />

                      <FormControl fullWidth>
                        <InputLabel sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>Category</InputLabel>
                        <Select
                          value={newQuery.category}
                          onChange={(e) => setNewQuery({...newQuery, category: e.target.value})}
                          label="Category"
                          required
                          sx={{
                            color: '#fff',
                            '& .MuiOutlinedInput-notchedOutline': {
                              borderColor: 'rgba(255, 255, 255, 0.23)',
                            },
                            '&:hover .MuiOutlinedInput-notchedOutline': {
                              borderColor: 'rgba(255, 255, 255, 0.5)',
                            },
                          }}
                        >
                          <MenuItem value="Technical">Technical</MenuItem>
                          <MenuItem value="Design">Design</MenuItem>
                          <MenuItem value="Billing">Billing</MenuItem>
                          <MenuItem value="Documentation">Documentation</MenuItem>
                          <MenuItem value="Other">Other</MenuItem>
                        </Select>
                      </FormControl>

                      <TextField
                        fullWidth
                        label="Description"
                        variant="outlined"
                        multiline
                        rows={4}
                        value={newQuery.description}
                        onChange={(e) => setNewQuery({...newQuery, description: e.target.value})}
                        required
                        sx={{
                          '& .MuiInputLabel-root': { color: 'rgba(255, 255, 255, 0.7)' },
                          '& .MuiOutlinedInput-root': {
                            '& fieldset': {
                              borderColor: 'rgba(255, 255, 255, 0.23)',
                            },
                            '&:hover fieldset': {
                              borderColor: 'rgba(255, 255, 255, 0.5)',
                            },
                          },
                          '& .MuiInputBase-input': { color: '#fff' }
                        }}
                      />

                      <Box>
                        <Button
                          component="label"
                          variant="outlined"
                          startIcon={<AttachIcon />}
                          sx={{
                            color: '#f4c10f',
                            borderColor: '#f4c10f',
                            '&:hover': {
                              borderColor: '#d1a20b'
                            }
                          }}
                        >
                          Attach File
                          <input
                            type="file"
                            hidden
                            onChange={handleFileChange}
                          />
                        </Button>
                        {fileToUpload && (
                          <Box sx={{ 
                            mt: 1,
                            display: 'flex',
                            alignItems: 'center',
                            backgroundColor: '#1a1a1a',
                            p: 1,
                            borderRadius: 1
                          }}>
                            <Typography variant="body2" sx={{ 
                              color: '#fff',
                              flexGrow: 1
                            }}>
                              {fileToUpload.name} ({fileToUpload.size})
                            </Typography>
                            <IconButton 
                              size="small"
                              onClick={handleRemoveFile}
                              sx={{ color: '#f44336' }}
                            >
                              <DeleteIcon fontSize="small" />
                            </IconButton>
                          </Box>
                        )}
                      </Box>

                      <Button
                        type="submit"
                        variant="contained"
                        startIcon={<SendIcon />}
                        fullWidth
                        sx={{
                          backgroundColor: '#f4c10f',
                          color: '#000',
                          '&:hover': {
                            backgroundColor: '#d1a20b'
                          }
                        }}
                      >
                        Submit Query
                      </Button>
                    </Stack>
                  </Box>
                </CardContent>
              </Card>
            </Grid>

            {/* Previous Queries */}
            <Grid item xs={12} md={7}>
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
                    Your Previous Queries
                  </Typography>

                  {queryData.length > 0 ? (
                    <TableContainer component={Paper} sx={{ 
                      backgroundColor: 'transparent',
                      border: '1px solid #333'
                    }}>
                      <Table>
                        <TableHead>
                          <TableRow>
                            <TableCell sx={{ color: '#fff', fontWeight: 'bold' }}>Query</TableCell>
                            <TableCell sx={{ color: '#fff', fontWeight: 'bold' }}>Category</TableCell>
                            <TableCell sx={{ color: '#fff', fontWeight: 'bold' }}>Status</TableCell>
                            <TableCell sx={{ color: '#fff', fontWeight: 'bold' }}>Date</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {queryData.map((query) => (
                            <TableRow 
                              key={query.id}
                              hover
                              onClick={() => setActiveQuery(query)}
                              sx={{ 
                                cursor: 'pointer',
                                '&:hover': {
                                  backgroundColor: 'rgba(255, 255, 255, 0.05)'
                                }
                              }}
                            >
                              <TableCell sx={{ color: '#fff' }}>{query.title}</TableCell>
                              <TableCell sx={{ color: '#fff' }}>{query.category}</TableCell>
                              <TableCell>
                                <Chip
                                  label={query.status === 'resolved' ? 'Resolved' : 
                                        query.status === 'in-progress' ? 'In Progress' : 'Pending'}
                                  size="small"
                                  sx={{
                                    backgroundColor: query.status === 'resolved' ? 'rgba(46, 125, 50, 0.2)' : 
                                 query.status === 'in-progress' ? 'rgba(255, 152, 0, 0.2)' : 
                                 'rgba(97, 97, 97, 0.2)',
                                    color: query.status === 'resolved' ? '#81c784' : 
                                          query.status === 'in-progress' ? '#ffb74d' : '#bdbdbd',
                                    border: query.status === 'resolved' ? '1px solid #2e7d32' : 
                                           query.status === 'in-progress' ? '1px solid #ff9800' : 
                                           '1px solid #616161'
                                  }}
                                />
                              </TableCell>
                              <TableCell sx={{ color: '#fff' }}>{query.date}</TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </TableContainer>
                  ) : (
                    <Box sx={{ 
                      p: 3,
                      textAlign: 'center',
                      backgroundColor: '#1a1a1a',
                      borderRadius: 1
                    }}>
                      <Typography variant="body1" sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                        You haven't submitted any queries yet.
                      </Typography>
                    </Box>
                  )}
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        )}
      </Box>
    </Box>
  );
}