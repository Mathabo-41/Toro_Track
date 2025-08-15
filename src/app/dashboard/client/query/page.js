'use client';

import React from 'react';
import Link from 'next/link';
import { Controller } from 'react-hook-form';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Stack,
  Button,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Grid,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  CircularProgress,
  Alert,
  Snackbar,
  Chip,
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
} from './styles';
import { useRaiseQuery } from './useRaiseQuery';
import { useClientStore } from '../common/clientStore';

// Sidebar Navigation
const Sidebar = () => {
  const clientMenu = [
    { name: 'Project Details', path: '/dashboard/client/details' },
    { name: 'Raise Query', path: '/dashboard/client/query' },
    { name: 'Meetings & Messages', path: '/dashboard/client/messages' },
    { name: 'Settings', path: '/dashboard/client/settings' },
  ];

  return (
    <Drawer
      variant="permanent"
      anchor="left"
      sx={{ width: 240, flexShrink: 0, '& .MuiDrawer-paper': drawerPaper }}
    >
      <Box sx={drawerHeader}>
        <Typography variant="h5">Client Portal</Typography>
      </Box>
      <List>
        {clientMenu.map((item) => (
          <ListItem key={item.name} disablePadding>
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
  );
};

// Page Header
const Header = ({ isDetailView }) => (
  <Box sx={headerBox}>
    <Typography variant="h4" sx={headerTitle}>
      <QueryIcon sx={headerIcon} />
      {isDetailView ? 'Query Details' : 'Raise a Query'}
    </Typography>
    <Typography variant="body1" sx={headerSubtitle}>
      {isDetailView
        ? 'View and manage your query'
        : 'Submit questions or issues about your project'}
    </Typography>
  </Box>
);

// Global Notification Snackbar
const Notification = () => {
  const { notification, hideNotification } = useClientStore();

  return (
    <Snackbar
      open={notification.isOpen}
      autoHideDuration={6000}
      onClose={hideNotification}
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
    >
      <Alert
        onClose={hideNotification}
        severity={notification.severity}
        sx={{ width: '100%' }}
      >
        {notification.message}
      </Alert>
    </Snackbar>
  );
};

// Main Page
export default function ClientQueryPage() {
  const {
    activeQuery,
    queries,
    isLoadingQueries,
    queriesError,
    isSubmittingQuery,
    fileToUpload,
    errors,
    control,
    register,
    handleSubmit,
    handleFileChange,
    handleRemoveFile,
    handleViewQuery,
    handleCloseQueryView,
  } = useRaiseQuery();

  return (
    <Box sx={mainBox}>
      <Sidebar />
      <Notification />

      <Box component="main" sx={mainContentBox}>
        <Header isDetailView={!!activeQuery} />

        {activeQuery ? (
          <QueryDetailView query={activeQuery} onClose={handleCloseQueryView} />
        ) : (
          <Grid container spacing={3}>
            <Grid item xs={12} md={5}>
              <NewQueryForm
                register={register}
                control={control}
                errors={errors}
                isSubmitting={isSubmittingQuery}
                fileToUpload={fileToUpload}
                onFileChange={handleFileChange}
                onRemoveFile={handleRemoveFile}
                handleSubmit={handleSubmit}
              />
            </Grid>
            <Grid item xs={12} md={7}>
              <PreviousQueriesList
                queries={queries}
                isLoading={isLoadingQueries}
                error={queriesError}
                onViewQuery={handleViewQuery}
              />
            </Grid>
          </Grid>
        )}
      </Box>
    </Box>
  );
}

// New Query Form
const NewQueryForm = ({
  register,
  control,
  errors,
  isSubmitting,
  fileToUpload,
  onFileChange,
  onRemoveFile,
  handleSubmit,
}) => (
  <Card sx={newQueryCard}>
    <CardContent>
      <Typography variant="h6" sx={newQueryTitle}>
        Submit New Query
      </Typography>
      <Box component="form" onSubmit={handleSubmit} noValidate>
        <Stack spacing={2}>
          <TextField
            fullWidth
            label="Query Title"
            variant="outlined"
            required
            {...register('title', { required: 'Title is required' })}
            error={!!errors.title}
            helperText={errors.title?.message}
            disabled={isSubmitting}
            sx={newQueryTextField}
          />

          <FormControl fullWidth error={!!errors.category}>
            <InputLabel sx={newQueryInputLabel}>Category</InputLabel>
            <Controller
              name="category"
              control={control}
              defaultValue=""
              rules={{ required: 'Please select a category' }}
              render={({ field }) => (
                <Select
                  {...field}
                  label="Category"
                  disabled={isSubmitting}
                  sx={{
                    ...newQuerySelect,
                    '& .MuiOutlinedInput-notchedOutline': newQuerySelectOutline,
                  }}
                >
                  <MenuItem value="Technical">Technical</MenuItem>
                  <MenuItem value="Design">Design</MenuItem>
                  <MenuItem value="Billing">Billing</MenuItem>
                  <MenuItem value="Documentation">Documentation</MenuItem>
                  <MenuItem value="Other">Other</MenuItem>
                </Select>
              )}
            />
            {errors.category && (
              <Typography
                color="error"
                variant="caption"
                sx={{ pl: 2, pt: 0.5 }}
              >
                {errors.category.message}
              </Typography>
            )}
          </FormControl>

          <TextField
            fullWidth
            label="Description"
            variant="outlined"
            multiline
            rows={4}
            required
            {...register('description', {
              required: 'Description is required',
            })}
            error={!!errors.description}
            helperText={errors.description?.message}
            disabled={isSubmitting}
            sx={newQueryTextField}
          />

          <Box>
            <Button
              component="label"
              variant="outlined"
              startIcon={<AttachIcon />}
              sx={attachFileButton}
              disabled={isSubmitting}
            >
              Attach File
              <input type="file" hidden onChange={onFileChange} />
            </Button>
            {fileToUpload && (
              <Box sx={attachedFileBox}>
                <Typography variant="body2" sx={attachedFileText}>
                  {fileToUpload.name} ({fileToUpload.size})
                </Typography>
                <IconButton
                  size="small"
                  onClick={onRemoveFile}
                  sx={removeFileButton}
                  disabled={isSubmitting}
                >
                  <DeleteIcon fontSize="small" />
                </IconButton>
              </Box>
            )}
          </Box>

          <Button
            type="submit"
            variant="contained"
            startIcon={
              isSubmitting ? <CircularProgress size={20} /> : <SendIcon />
            }
            fullWidth
            sx={submitButton}
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Submitting...' : 'Submit Query'}
          </Button>
        </Stack>
      </Box>
    </CardContent>
  </Card>
);

// Previous Queries List
const PreviousQueriesList = ({ queries, isLoading, error, onViewQuery }) => (
  <Card sx={previousQueriesCard}>
    <CardContent>
      <Typography variant="h6" sx={previousQueriesTitle}>
        Your Previous Queries
      </Typography>

      {isLoading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', p: 5 }}>
          <CircularProgress />
        </Box>
      ) : error ? (
        <Alert severity="error">
          Could not load queries. Please try again later.
        </Alert>
      ) : queries.length > 0 ? (
        <TableContainer component={Paper} sx={previousQueriesTableContainer}>
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell sx={previousQueriesTableCellHeader}>
                  Query
                </TableCell>
                <TableCell sx={previousQueriesTableCellHeader}>
                  Category
                </TableCell>
                <TableCell sx={previousQueriesTableCellHeader}>
                  Status
                </TableCell>
                <TableCell sx={previousQueriesTableCellHeader}>
                  Date
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {queries.map((q) => (
                <TableRow
                  key={q.id}
                  hover
                  onClick={() => onViewQuery(q)}
                  sx={queryRow}
                >
                  <TableCell sx={previousQueriesTableCell}>
                    {q.title}
                  </TableCell>
                  <TableCell sx={previousQueriesTableCell}>
                    {q.category}
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={q.status}
                      size="small"
                      sx={queryStatusChip(q.status)}
                    />
                  </TableCell>
                  <TableCell sx={previousQueriesTableCell}>
                    {new Date(q.created_at).toLocaleDateString()}
                  </TableCell>
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
);

// Query Detail View
const QueryDetailView = ({ query, onClose }) => (
  <Card sx={queryCard}>
    <CardContent>
      <Button
        startIcon={<BackIcon />}
        onClick={onClose}
        sx={backButton}
      >
        Back to queries
      </Button>

      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        sx={{ mb: 3 }}
      >
        <Typography variant="h5" sx={queryDetailTitle}>
          {query.title}
        </Typography>
        <Chip
          label={query.status}
          icon={query.status === 'resolved' ? <ResolvedIcon /> : <PendingIcon />}
          sx={queryStatusChip(query.status)}
        />
      </Stack>

      <Box sx={queryInfoBox}>
        <Typography variant="body2" sx={queryInfoLabel}>
          Category
        </Typography>
        <Typography variant="body1" sx={queryInfoValue}>
          {query.category}
        </Typography>

        <Typography variant="body2" sx={queryInfoLabel}>
          Submitted on
        </Typography>
        <Typography variant="body1" sx={queryInfoValue}>
          {new Date(query.created_at).toLocaleString()}
        </Typography>

        <Typography variant="body2" sx={queryInfoLabel}>
          Description
        </Typography>
        <Typography variant="body1" sx={queryInfoValue}>
          {query.description}
        </Typography>
      </Box>

      {query.attachment_url && (
        <Box sx={attachmentsBox}>
          <Typography variant="body2" sx={queryInfoLabel}>
            Attachments
          </Typography>
          <TableContainer component={Paper} sx={attachmentsTableContainer}>
            <Table>
              <TableBody>
                <TableRow>
                  <TableCell sx={queryInfoValue}>
                    <Stack direction="row" alignItems="center" spacing={1}>
                      <AttachIcon fontSize="small" sx={attachmentFileIcon} />
                      <Typography>
                        {query.attachment_name || 'Attached File'}
                      </Typography>
                    </Stack>
                  </TableCell>
                  <TableCell>
                    <Button
                      component="a"
                      href={query.attachment_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      variant="outlined"
                      size="small"
                      sx={downloadButton}
                    >
                      Download
                    </Button>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      )}

      {query.response && (
        <Box sx={responseBox}>
          <Typography variant="body2" sx={responseLabel}>
            Response from Team
          </Typography>
          <Typography variant="body1" sx={queryInfoValue}>
            {query.response}
          </Typography>
        </Box>
      )}
    </CardContent>
  </Card>
);
