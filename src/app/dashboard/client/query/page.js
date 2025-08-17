/* The file that combines the logic with the styles and displays it as a screen. 
Rendering takes place here to make the screen respond fast when it is being clicked*/

'use client';

import React from 'react';
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

import { useRaiseQuery } from './useRaiseQuery/page';
import * as styles from './styles';
import {
  rootBox,
  drawerPaper,
  drawerHeader,
  listItemButton,
  activeListItemButton
} from '../common/styles';

// Import global styles for layout and navigation
import * as globalStyles from '../common/styles';
import { useClientStore } from '../common/clientStore';
import { clientMenu } from '../common/clientStore';

export default function ClientQuery() {
  const {
    activeQuery,
    setActiveQuery,
    newQuery,
    setNewQuery,
    fileToUpload,
    handleFileChange,
    handleRemoveFile,
    handleSubmitQuery,
    queries,
    auditorMenu,
    isLoadingQueries
  } = useRaiseQuery();

  return (
    <Box sx={globalStyles.rootBox}>
          {/* --- Sidebar Navigation --- */}
          <Drawer
           variant="permanent"
                  anchor="left"
                  sx={{ '& .MuiDrawer-paper': globalStyles.drawerPaper }}
                >
                  <Box sx={globalStyles.drawerHeader}>
                    <Typography variant="h5">Auditor Portal</Typography>
                  </Box>
                  {clientMenu.map((item) => (
                    <ListItem key={item.path} disablePadding>
                      <ListItemButton
                        component={Link}
                        href={item.path}
                        sx={globalStyles.listItemButton}
                      >
                        <ListItemText primary={item.name} />
                      </ListItemButton>
                    </ListItem>
                  ))}       
           </Drawer>

      {/* #region MAIN_CONTENT */}
      <Box component="main" sx={styles.mainContentBox}>
        {/* #region HEADER */}
        <Box sx={styles.pageHeader}>
          <Typography variant="h4" sx={styles.pageHeaderText}>
            <QueryIcon sx={styles.pageHeaderIcon} />
            {activeQuery ? 'Query Details' : 'Raise a Query'}
          </Typography>
          <Typography variant="body1" sx={styles.pageHeaderSubtitle}>
            {activeQuery ? 'View and manage your query' : 'Submit questions or issues about your project'}
          </Typography>
        </Box>
        {/* #endregion */}

        {/* #region CONTENT_VIEWS */}
        {activeQuery ? (
          /* Query Detail View */
          <Card sx={styles.detailCard}>
            <CardContent>
              <Button
                startIcon={<BackIcon />}
                onClick={() => setActiveQuery(null)}
                sx={styles.detailBackButton}
              >
                Back to queries
              </Button>

              <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 3 }}>
                <Typography variant="h5" sx={styles.detailTitle}>
                  {activeQuery.title}
                </Typography>
                <Chip
                  label={activeQuery.status === 'resolved' ? 'Resolved' :
                          activeQuery.status === 'in-progress' ? 'In Progress' : 'Pending'}
                  sx={styles.detailChip(activeQuery.status).sx}
                />
              </Stack>

              <Box sx={{ mb: 3 }}>
                <Typography variant="body2" sx={styles.detailSectionTitle}>Category</Typography>
                <Typography variant="body1" sx={styles.detailSectionText}>{activeQuery.category}</Typography>

                <Typography variant="body2" sx={styles.detailSectionTitle}>Submitted on</Typography>
                <Typography variant="body1" sx={styles.detailSectionText}>{activeQuery.date}</Typography>

                <Typography variant="body2" sx={styles.detailSectionTitle}>Description</Typography>
                <Typography variant="body1" sx={styles.detailSectionText}>{activeQuery.description}</Typography>
              </Box>

              {activeQuery.attachments.length > 0 && (
                <Box sx={{ mb: 3 }}>
                  <Typography variant="body2" sx={styles.detailSectionTitle}>Attachments</Typography>
                  <TableContainer component={Paper} sx={styles.attachmentsTableContainer}>
                    <Table>
                      <TableBody>
                        {activeQuery.attachments.map((file, index) => (
                          <TableRow key={index}>
                            <TableCell sx={styles.attachmentsTableFileText}>
                              <Stack direction="row" alignItems="center" spacing={1}>
                                <AttachIcon fontSize="small" sx={{ color: '#f3722c' }} />
                                <Typography>{file.name}</Typography>
                              </Stack>
                            </TableCell>
                            <TableCell sx={styles.attachmentsTableFileSize}>{file.size}</TableCell>
                            <TableCell>
                              <Button
                                variant="outlined"
                                size="small"
                                sx={styles.attachmentsDownloadButton}
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
                <Box sx={styles.responseBox}>
                  <Typography variant="body2" sx={styles.responseTitle}>Response from Team</Typography>
                  <Typography variant="body1" sx={styles.responseText}>{activeQuery.response}</Typography>
                </Box>
              )}
            </CardContent>
          </Card>
        ) : (
          /* Main Query View (List + Form) */
          <Grid container spacing={3}>
            {/* New Query Form */}
            <Grid item xs={12} md={5}>
              <Card sx={styles.formCard}>
                <CardContent>
                  <Typography variant="h6" sx={styles.formHeader}>Submit New Query</Typography>
                  <Box component="form" onSubmit={handleSubmitQuery}>
                    <Stack spacing={2}>
                      <TextField
                        fullWidth
                        label="Query Title"
                        variant="outlined"
                        value={newQuery.title}
                        onChange={(e) => setNewQuery({...newQuery, title: e.target.value})}
                        required
                        sx={styles.formTextField}
                      />
                      <FormControl fullWidth>
                        <InputLabel sx={{ color: '#525252' }}>Category</InputLabel>
                        <Select
                          value={newQuery.category}
                          onChange={(e) => setNewQuery({...newQuery, category: e.target.value})}
                          label="Category"
                          required
                          sx={styles.formSelect}
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
                        sx={styles.formTextField}
                      />
                      <Box>
                        <Button
                          component="label"
                          variant="outlined"
                          startIcon={<AttachIcon />}
                          sx={styles.attachButton}
                        >
                          Attach File
                          <input
                            type="file"
                            hidden
                            onChange={handleFileChange}
                          />
                        </Button>
                        {fileToUpload && (
                          <Box sx={styles.attachedFileBox}>
                            <Typography variant="body2" sx={styles.attachedFileText}>
                              {fileToUpload.name} ({fileToUpload.size})
                            </Typography>
                            <IconButton
                              size="small"
                              onClick={handleRemoveFile}
                              sx={styles.attachedFileDeleteButton}
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
                        sx={styles.submitButton}
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
              <Card sx={styles.queriesCard}>
                <CardContent>
                  <Typography variant="h6" sx={styles.queriesHeader}>Your Previous Queries</Typography>
                  {queries.length > 0 ? (
                    <TableContainer component={Paper} sx={styles.queriesTableContainer}>
                      <Table>
                        <TableHead>
                          <TableRow>
                            <TableCell sx={styles.queriesTableCellHeader}>Query</TableCell>
                            <TableCell sx={styles.queriesTableCellHeader}>Category</TableCell>
                            <TableCell sx={styles.queriesTableCellHeader}>Status</TableCell>
                            <TableCell sx={styles.queriesTableCellHeader}>Date</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {queries.map((query) => (
                            <TableRow
                              key={query.id}
                              hover
                              onClick={() => setActiveQuery(query)}
                              sx={styles.queriesTableRow}
                            >
                              <TableCell sx={styles.queriesTableCell}>{query.title}</TableCell>
                              <TableCell sx={styles.queriesTableCell}>{query.category}</TableCell>
                              <TableCell>
                                <Chip
                                  label={query.status === 'resolved' ? 'Resolved' :
                                          query.status === 'in-progress' ? 'In Progress' : 'Pending'}
                                  sx={styles.queriesStatusChip(query.status).sx}
                                />
                              </TableCell>
                              <TableCell sx={styles.queriesTableCell}>{query.date}</TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </TableContainer>
                  ) : (
                    <Box sx={styles.noQueriesBox}>
                      <Typography variant="body1" sx={styles.noQueriesText}>
                        You haven't submitted any queries yet.
                      </Typography>
                    </Box>
                  )}
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        )}
        {/* #endregion */}
      </Box>
      {/* #endregion */}
    </Box>
  );
}