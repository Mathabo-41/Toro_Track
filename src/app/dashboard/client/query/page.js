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
  IconButton,
} from '@mui/material';
import {
  Help as QueryIcon,
  Send as SendIcon,
  CheckCircle as ResolvedIcon,
  Pending as PendingIcon,
  ArrowBack as BackIcon,
  AttachFile as AttachIcon,
  Delete as DeleteIcon,
} from '@mui/icons-material';
import {
  mainBox,
  drawerPaper,
  drawerHeader,
  listItemButton,
  activeListItemButton,
  mainContentBox,
  headerBox,
  headerTitle,
  headerIcon,
  headerSubtitle,
  queryCard,
  backButton,
  queryDetailTitle,
  queryStatusChip,
  queryInfoBox,
  queryInfoLabel,
  queryInfoValue,
  attachmentsBox,
  attachmentsTableContainer,
  attachmentFileIcon,
  downloadButton,
  responseBox,
  responseLabel,
  newQueryCard,
  newQueryTitle,
  newQueryTextField,
  newQueryInputLabel,
  newQuerySelect,
  newQuerySelectOutline,
  attachFileButton,
  attachedFileBox,
  attachedFileText,
  removeFileButton,
  submitButton,
  previousQueriesCard,
  previousQueriesTitle,
  previousQueriesTableContainer,
  previousQueriesTableCellHeader,
  previousQueriesTableCell,
  queryRow,
  noQueriesBox,
  noQueriesText,
} from '../styles';

/**
 * Client Query Screen
 */

const clientMenu = [
  { name: 'Project Details', path: '/dashboard/client/details' },
  { name: 'Raise Query', path: '/dashboard/client/query' },
  { name: 'Meetings & Messages', path: '/dashboard/client/messages' },
  { name: 'Settings', path: '/dashboard/client/settings' },
];

// Sample query data
const queryData = [
  {
    id: 'QRY-001',
    title: 'Checkout Page Issue',
    status: 'resolved',
    date: '2023-11-15',
    category: 'Technical',
    description:
      'The checkout page is not loading properly on mobile devices. The payment button disappears when scrolling.',
    response: 'This has been fixed in the latest update. Please clear your cache and try again.',
    attachments: [],
  },
  {
    id: 'QRY-002',
    title: 'Design Revision Request',
    status: 'in-progress',
    date: '2023-12-03',
    category: 'Design',
    description:
      'Can we make the product images larger on the category pages? They seem too small compared to the mockups.',
    response: 'Our design team is reviewing this request. We\'ll get back to you by Friday.',
    attachments: [{ name: 'mockup-v1.pdf', size: '2.4 MB' }],
  },
  {
    id: 'QRY-003',
    title: 'API Documentation',
    status: 'pending',
    date: '2023-12-10',
    category: 'Documentation',
    description: 'Where can I find the updated API documentation for the new endpoints?',
    response: '',
    attachments: [],
  },
];

export default function ClientQuery() {
  const [activeQuery, setActiveQuery] = useState(null);
  const [newQuery, setNewQuery] = useState({
    title: '',
    category: '',
    description: '',
    attachments: [],
  });
  const [fileToUpload, setFileToUpload] = useState(null);

  const handleFileChange = (e) => {
    if (e.target.files.length > 0) {
      const file = e.target.files[0];
      setFileToUpload({
        name: file.name,
        size: `${(file.size / (1024 * 1024)).toFixed(1)} MB`,
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
      attachments: [],
    });
    setFileToUpload(null);
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
                  ...(item.name === 'Raise Query' && activeListItemButton),
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
        {/* Header */}
        <Box sx={headerBox}>
          <Typography variant="h4" sx={headerTitle}>
            <QueryIcon sx={headerIcon} />
            {activeQuery ? 'Query Details' : 'Raise a Query'}
          </Typography>
          <Typography variant="body1" sx={headerSubtitle}>
            {activeQuery ? 'View and manage your query' : 'Submit questions or issues about your project'}
          </Typography>
        </Box>

        {activeQuery ? (
          /* Query Detail View */
          <Card sx={queryCard}>
            <CardContent>
              <Button startIcon={<BackIcon />} onClick={() => setActiveQuery(null)} sx={backButton}>
                Back to queries
              </Button>

              <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 3 }}>
                <Typography variant="h5" sx={queryDetailTitle}>
                  {activeQuery.title}
                </Typography>
                <Chip
                  label={
                    activeQuery.status === 'resolved'
                      ? 'Resolved'
                      : activeQuery.status === 'in-progress'
                      ? 'In Progress'
                      : 'Pending'
                  }
                  icon={activeQuery.status === 'resolved' ? <ResolvedIcon /> : <PendingIcon />}
                  sx={queryStatusChip(activeQuery.status)}
                />
              </Stack>

              <Box sx={queryInfoBox}>
                <Typography variant="body2" sx={queryInfoLabel}>
                  Category
                </Typography>
                <Typography variant="body1" sx={queryInfoValue}>
                  {activeQuery.category}
                </Typography>

                <Typography variant="body2" sx={queryInfoLabel}>
                  Submitted on
                </Typography>
                <Typography variant="body1" sx={queryInfoValue}>
                  {activeQuery.date}
                </Typography>

                <Typography variant="body2" sx={queryInfoLabel}>
                  Description
                </Typography>
                <Typography variant="body1" sx={queryInfoValue}>
                  {activeQuery.description}
                </Typography>
              </Box>

              {activeQuery.attachments.length > 0 && (
                <Box sx={attachmentsBox}>
                  <Typography variant="body2" sx={queryInfoLabel}>
                    Attachments
                  </Typography>
                  <TableContainer component={Paper} sx={attachmentsTableContainer}>
                    <Table>
                      <TableBody>
                        {activeQuery.attachments.map((file, index) => (
                          <TableRow key={index}>
                            <TableCell sx={queryInfoValue}>
                              <Stack direction="row" alignItems="center" spacing={1}>
                                <AttachIcon fontSize="small" sx={attachmentFileIcon} />
                                <Typography>{file.name}</Typography>
                              </Stack>
                            </TableCell>
                            <TableCell sx={queryInfoValue}>{file.size}</TableCell>
                            <TableCell>
                              <Button variant="outlined" size="small" sx={downloadButton}>
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
                <Box sx={responseBox}>
                  <Typography variant="body2" sx={responseLabel}>
                    Response from Team
                  </Typography>
                  <Typography variant="body1" sx={queryInfoValue}>
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
              <Card sx={newQueryCard}>
                <CardContent>
                  <Typography variant="h6" sx={newQueryTitle}>
                    Submit New Query
                  </Typography>

                  <Box component="form" onSubmit={handleSubmitQuery}>
                    <Stack spacing={2}>
                      <TextField
                        fullWidth
                        label="Query Title"
                        variant="outlined"
                        value={newQuery.title}
                        onChange={(e) => setNewQuery({ ...newQuery, title: e.target.value })}
                        required
                        sx={newQueryTextField}
                      />

                      <FormControl fullWidth>
                        <InputLabel sx={newQueryInputLabel}>Category</InputLabel>
                        <Select
                          value={newQuery.category}
                          onChange={(e) => setNewQuery({ ...newQuery, category: e.target.value })}
                          label="Category"
                          required
                          sx={{
                            ...newQuerySelect,
                            '& .MuiOutlinedInput-notchedOutline': newQuerySelectOutline,
                            '&:hover .MuiOutlinedInput-notchedOutline': newQuerySelectOutline,
                            '& .MuiSvgIcon-root': {
                              color: '#6b705c',
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
                        onChange={(e) => setNewQuery({ ...newQuery, description: e.target.value })}
                        required
                        sx={newQueryTextField}
                      />

                      <Box>
                        <Button
                          component="label"
                          variant="outlined"
                          startIcon={<AttachIcon />}
                          sx={attachFileButton}
                        >
                          Attach File
                          <input type="file" hidden onChange={handleFileChange} />
                        </Button>
                        {fileToUpload && (
                          <Box sx={attachedFileBox}>
                            <Typography variant="body2" sx={attachedFileText}>
                              {fileToUpload.name} ({fileToUpload.size})
                            </Typography>
                            <IconButton size="small" onClick={handleRemoveFile} sx={removeFileButton}>
                              <DeleteIcon fontSize="small" />
                            </IconButton>
                          </Box>
                        )}
                      </Box>

                      <Button type="submit" variant="contained" startIcon={<SendIcon />} fullWidth sx={submitButton}>
                        Submit Query
                      </Button>
                    </Stack>
                  </Box>
                </CardContent>
              </Card>
            </Grid>

            {/* Previous Queries */}
            <Grid item xs={12} md={7}>
              <Card sx={previousQueriesCard}>
                <CardContent>
                  <Typography variant="h6" sx={previousQueriesTitle}>
                    Your Previous Queries
                  </Typography>

                  {queryData.length > 0 ? (
                    <TableContainer component={Paper} sx={previousQueriesTableContainer}>
                      <Table>
                        <TableHead>
                          <TableRow>
                            <TableCell sx={previousQueriesTableCellHeader}>Query</TableCell>
                            <TableCell sx={previousQueriesTableCellHeader}>Category</TableCell>
                            <TableCell sx={previousQueriesTableCellHeader}>Status</TableCell>
                            <TableCell sx={previousQueriesTableCellHeader}>Date</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {queryData.map((query) => (
                            <TableRow
                              key={query.id}
                              hover
                              onClick={() => setActiveQuery(query)}
                              sx={queryRow}
                            >
                              <TableCell sx={previousQueriesTableCell}>{query.title}</TableCell>
                              <TableCell sx={previousQueriesTableCell}>{query.category}</TableCell>
                              <TableCell>
                                <Chip
                                  label={
                                    query.status === 'resolved'
                                      ? 'Resolved'
                                      : query.status === 'in-progress'
                                      ? 'In Progress'
                                      : 'Pending'
                                  }
                                  size="small"
                                  sx={queryStatusChip(query.status)}
                                />
                              </TableCell>
                              <TableCell sx={previousQueriesTableCell}>{query.date}</TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </TableContainer>
                  ) : (
                    <Box sx={noQueriesBox}>
                      <Typography variant="body1" sx={noQueriesText}>
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