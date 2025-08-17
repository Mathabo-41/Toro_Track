/* The file that combines the logic with the styles and displays it as a screen. 
Rendering takes place here to make the screen respond fast when it is being clicked*/

'use client';

import React from 'react';
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
  CircularProgress
} from '@mui/material';
import {
  Assignment as ProjectIcon,
  AttachFile as FilesIcon,
  Download as DownloadIcon,
  CheckCircle as CompletedIcon,
  Pending as PendingIcon
} from '@mui/icons-material';
import { useDetails } from './useDetails/page';
import {
  pageStyles,
  sidebarStyles,
  mainContentStyles,
  headerStyles,
  progressCardStyles,
  tabsStyles,
  contentCardStyles,
  milestoneStyles,
  teamStyles,
  filesStyles,
  discussionStyles
} from './styles';

// Import global styles for layout and navigation
import * as globalStyles from '../common/styles';
import { useClientStore } from '../common/clientStore';
import { clientMenu } from '../common/clientStore';

// #region: Main Component
export default function ProjectDetails() {
  const {
    activeTab,
    commentText,
    projectData,
    isLoading,
    error,
    comments,
    isCommentsLoading,
    handleTabChange,
    handleCommentSubmit,
    handleCommentChange,
  } = useDetails();

  // --- Conditional Rendering for Loading and Error States ---
  if (isLoading || isCommentsLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ p: 4, textAlign: 'center' }}>
        <Typography variant="h5" color="error">
          Error loading project data.
        </Typography>
      </Box>
    );
  }

  // --- Render Functions ---
  const renderOverviewTab = () => (
    <Grid container spacing={3}>
      <Grid item xs={12} md={6}>
        <Card sx={contentCardStyles.card}>
          <CardContent>
            <Typography variant="h6" sx={contentCardStyles.title}>Project Details</Typography>
            <Stack spacing={2}>
              <Box>
                <Typography variant="body2" sx={contentCardStyles.textLabel}>Start Date</Typography>
                <Typography variant="body1" sx={contentCardStyles.textValue}>{projectData.startDate}</Typography>
              </Box>
              <Box>
                <Typography variant="body2" sx={contentCardStyles.textLabel}>Budget</Typography>
                <Typography variant="body1" sx={contentCardStyles.textValue}>{projectData.budget}</Typography>
              </Box>
              <Box>
                <Typography variant="body2" sx={contentCardStyles.textLabel}>Description</Typography>
                <Typography variant="body1" sx={contentCardStyles.textValue}>{projectData.description}</Typography>
              </Box>
            </Stack>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} md={6}>
        <Card sx={contentCardStyles.card}>
          <CardContent>
            <Typography variant="h6" sx={contentCardStyles.title}>Recent Activity</Typography>
            <List>
              {['Project status updated', 'New files uploaded', 'Meeting scheduled'].map((activity, index) => (
                <ListItem key={index} sx={contentCardStyles.textValue}>
                  <ListItemText
                    primary={activity}
                    secondary={
                      <Typography component="span" sx={contentCardStyles.textLabel}>
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
  );

  const renderMilestonesTab = () => (
    <Card sx={contentCardStyles.card}>
      <CardContent>
        <Typography variant="h6" sx={contentCardStyles.title}>Project Milestones</Typography>
        <TableContainer component={Paper} sx={milestoneStyles.tableContainer}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell sx={milestoneStyles.tableHeaderCell}>Milestone</TableCell>
                <TableCell sx={milestoneStyles.tableHeaderCell}>Status</TableCell>
                <TableCell sx={milestoneStyles.tableHeaderCell}>Due Date</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {projectData.milestones.map((milestone) => (
                <TableRow key={milestone.id}>
                  <TableCell sx={milestoneStyles.tableCell}>{milestone.name}</TableCell>
                  <TableCell>
                    <Chip
                      icon={milestone.status === 'completed' ? <CompletedIcon /> : <PendingIcon />}
                      label={milestone.status === 'completed' ? 'Completed' : milestone.status === 'in-progress' ? 'In Progress' : 'Pending'}
                      sx={milestoneStyles.chip(milestone.status)}
                    />
                  </TableCell>
                  <TableCell sx={milestoneStyles.tableCell}>{milestone.dueDate}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </CardContent>
    </Card>
  );

  const renderTeamTab = () => (
    <Card sx={contentCardStyles.card}>
      <CardContent>
        <Typography variant="h6" sx={contentCardStyles.title}>Team Members</Typography>
        <Grid container spacing={2}>
          {projectData.team.map((member) => (
            <Grid item xs={12} sm={6} key={member.id}>
              <Card sx={teamStyles.memberCard}>
                <CardContent>
                  <Stack direction="row" spacing={2} alignItems="center">
                    <Avatar src={member.avatar} sx={{ width: 56, height: 56 }} />
                    <Box>
                      <Typography variant="body1" sx={teamStyles.memberName}>{member.name}</Typography>
                      <Typography variant="body2" sx={teamStyles.memberRole}>{member.role}</Typography>
                    </Box>
                  </Stack>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </CardContent>
    </Card>
  );

  const renderFilesTab = () => (
    <Card sx={contentCardStyles.card}>
      <CardContent>
        <Typography variant="h6" sx={contentCardStyles.title}>Project Files</Typography>
        <TableContainer component={Paper} sx={milestoneStyles.tableContainer}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell sx={milestoneStyles.tableHeaderCell}>File Name</TableCell>
                <TableCell sx={milestoneStyles.tableHeaderCell}>Type</TableCell>
                <TableCell sx={milestoneStyles.tableHeaderCell}>Size</TableCell>
                <TableCell sx={milestoneStyles.tableHeaderCell}>Date</TableCell>
                <TableCell sx={milestoneStyles.tableHeaderCell}>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {projectData.files.map((file) => (
                <TableRow key={file.id}>
                  <TableCell sx={milestoneStyles.tableCell}>
                    <Stack direction="row" alignItems="center" spacing={1}>
                      <FilesIcon fontSize="small" sx={filesStyles.fileIcon} />
                      <Typography>{file.name}</Typography>
                    </Stack>
                  </TableCell>
                  <TableCell sx={milestoneStyles.tableCell}>{file.type.toUpperCase()}</TableCell>
                  <TableCell sx={milestoneStyles.tableCell}>{file.size}</TableCell>
                  <TableCell sx={milestoneStyles.tableCell}>{file.date}</TableCell>
                  <TableCell>
                    <IconButton sx={filesStyles.iconButton}>
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
  );

  const renderDiscussionTab = () => (
    <Card sx={contentCardStyles.card}>
      <CardContent>
        <Typography variant="h6" sx={contentCardStyles.title}>Project Discussion</Typography>
        <List sx={discussionStyles.list}>
          {comments?.map((comment) => (
            <div key={comment.id}>
              <ListItem alignItems="flex-start">
                <ListItemText
                  primary={<Typography sx={discussionStyles.commentUser}>{comment.user}</Typography>}
                  secondary={
                    <>
                      <Typography component="span" sx={discussionStyles.commentText}>{comment.text}</Typography>
                      <Typography component="span" sx={discussionStyles.commentTime}>{comment.time}</Typography>
                    </>
                  }
                />
              </ListItem>
              <Divider sx={discussionStyles.divider} />
            </div>
          ))}
        </List>
        <Box component="form" onSubmit={handleCommentSubmit}>
          <Stack direction="row" spacing={1}>
            <TextField
              fullWidth
              variant="outlined"
              placeholder="Add a comment..."
              value={commentText}
              onChange={handleCommentChange}
              sx={discussionStyles.textField}
            />
            <Button type="submit" variant="contained" sx={discussionStyles.submitButton}>Post</Button>
          </Stack>
        </Box>
      </CardContent>
    </Card>
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case 0:
        return renderOverviewTab();
      case 1:
        return renderMilestonesTab();
      case 2:
        return renderTeamTab();
      case 3:
        return renderFilesTab();
      case 4:
        return renderDiscussionTab();
      default:
        return null;
    }
  };

  // #endregion

  // #region: Render
  return (
  <Box sx={globalStyles.rootBox}>
        {/* --- Sidebar Navigation --- */}
        <Drawer
         variant="permanent"
                anchor="left"
                sx={{ '& .MuiDrawer-paper': globalStyles.drawerPaper }}
              >
                <Box sx={globalStyles.drawerHeader}>
                  <Typography variant="h5">Client Portal</Typography>
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

      {/* Main Content */}
      <Box component="main" sx={mainContentStyles.mainBox}>
        {/* Project Header */}
        <Box sx={headerStyles.headerBox}>
          <Stack direction="row" justifyContent="space-between" alignItems="center">
            <Typography variant="h4" sx={headerStyles.headerTitle}>
              <ProjectIcon sx={headerStyles.projectIcon} />
              {projectData.name}
            </Typography>
            <Chip
              label={projectData.status === 'active' ? 'In Progress' : 'Completed'}
              sx={headerStyles.chip(projectData.status)}
            />
          </Stack>
          <Typography variant="body1" sx={headerStyles.headerSubtext}>
            Project ID: {projectData.id} | {projectData.description}
          </Typography>
        </Box>

        {/* Project Progress */}
        <Card sx={progressCardStyles.card}>
          <CardContent>
            <Typography variant="h6" sx={progressCardStyles.title}>Project Progress</Typography>
            <Stack direction="row" alignItems="center" spacing={2}>
              <Box sx={{ width: '100%' }}>
                <Box sx={progressCardStyles.progressBarContainer}>
                  <Box sx={progressCardStyles.progressBar(projectData.progress)} />
                </Box>
                <Typography variant="body2" sx={progressCardStyles.progressText}>
                  {projectData.progress}% completed
                </Typography>
              </Box>
              <Box sx={progressCardStyles.deadlineBox}>
                <Typography variant="body2" sx={progressCardStyles.deadlineLabel}>Deadline</Typography>
                <Typography variant="h6" sx={progressCardStyles.deadlineValue}>{projectData.deadline}</Typography>
              </Box>
            </Stack>
          </CardContent>
        </Card>

        {/* Project Tabs */}
        <Tabs value={activeTab} onChange={handleTabChange} sx={tabsStyles.tabs}>
          <Tab label="Overview" sx={tabsStyles.tab} />
          <Tab label="Milestones" sx={tabsStyles.tab} />
          <Tab label="Team" sx={tabsStyles.tab} />
          <Tab label="Files" sx={tabsStyles.tab} />
          <Tab label="Discussion" sx={tabsStyles.tab} />
        </Tabs>

        {/* Tab Content */}
        <Box sx={{ mt: 2 }}>
          {renderTabContent()}
        </Box>
      </Box>
    </Box>
  );
}
// #endregion