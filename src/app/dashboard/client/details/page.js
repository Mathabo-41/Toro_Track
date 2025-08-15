'use client'

import React, { useEffect, useState } from 'react'
import Link from 'next/link'
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
} from '@mui/material'
import {
  Assignment as ProjectIcon,
  Pending as PendingIcon,
  CheckCircle as CompletedIcon,
  Download as DownloadIcon
} from '@mui/icons-material'

import { useClientStore } from '../common/clientStore'
import * as g from '../common/styles'
import * as s from './styles'
import {
  useProjectDetails,
  useProjectComments
} from './useProjectDetails'

export default function ProjectDetailsPage() {
  const {
    currentPath,
    clientMenu,
    setCurrentPath
  } = useClientStore()

  const [activeTab, setActiveTab] = useState(0)
  const [commentText, setCommentText] = useState('')

  // Hard-coded for example; replace with dynamic ID
  const projectId = 'PRJ-2023-045'

  const { data: project = {}, isLoading: projLoading } =
    useProjectDetails(projectId)

  const {
    data: comments = [],
    isLoading: commLoading
  } = useProjectComments(projectId)

  // Highlight sidebar on load
  useEffect(() => {
    setCurrentPath('/dashboard/client/details')
  }, [setCurrentPath])

  const handleTabChange = (_, newVal) => setActiveTab(newVal)
  const handleCommentSubmit = (e) => {
    e.preventDefault()
    if (!commentText.trim()) return
    // append locally
    comments.push({
      id: comments.length + 1,
      user: 'You',
      text: commentText,
      time: 'Just now'
    })
    setCommentText('')
  }

  return (
    <Box sx={g.fullScreenContainerStyles}>
      <Drawer variant="permanent" anchor="left" sx={g.drawerStyles}>
        <Box sx={s.drawerHeader}>
          <Typography variant="h5">Client Portal</Typography>
        </Box>
        <List>
          {clientMenu.map((item) => (
            <ListItem key={item.path} disablePadding>
              <ListItemButton
                component={Link}
                href={item.path}
                selected={item.path === currentPath}
                sx={g.listItemButtonStyles(item.path, currentPath)}
              >
                <ListItemText primary={item.name} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>

      <Box component="main" sx={g.mainContentBoxStyles}>
        {/* Project Header */}
        <Box sx={s.projectHeader}>
          <Stack direction="row" justifyContent="space-between" alignItems="center">
            <Typography variant="h4" sx={s.projectTitle}>
              <ProjectIcon sx={s.projectIcon} />
              {projLoading ? 'Loading…' : project.name}
            </Typography>
            {!projLoading && (
              <Chip
                label={project.status === 'active' ? 'In Progress' : 'Completed'}
                sx={s.statusChip(project.status)}
              />
            )}
          </Stack>
          {!projLoading && (
            <Typography variant="body1" sx={s.projectDescription}>
              Project ID: {project.id} | {project.description}
            </Typography>
          )}
        </Box>

        {/* Progress */}
        {!projLoading && (
          <Card sx={s.progressCard}>
            <CardContent>
              <Typography variant="h6" sx={s.progressCardContent}>
                Project Progress
              </Typography>
              <Stack direction="row" alignItems="center" spacing={2}>
                <Box sx={{ width: '100%' }}>
                  <Box sx={s.progressBarContainer}>
                    <Box sx={s.progressBar(project.progress)} />
                  </Box>
                  <Typography variant="body2">
                    {project.progress}% completed
                  </Typography>
                </Box>
                <Box sx={s.deadlineBox}>
                  <Typography variant="body2">Deadline</Typography>
                  <Typography variant="h6">{project.deadline}</Typography>
                </Box>
              </Stack>
            </CardContent>
          </Card>
        )}

        {/* Tabs */}
        <Tabs value={activeTab} onChange={handleTabChange} sx={s.tabs}>
          {['Overview', 'Milestones', 'Team', 'Files', 'Discussion'].map((label) => (
            <Tab key={label} label={label} sx={s.tab} />
          ))}
        </Tabs>

        <Box sx={s.tabContentBox}>
          {/* Overview */}
          {activeTab === 0 && !projLoading && (
            <Grid container spacing={3}>
              {/* Info & Activity Cards */}
              <Grid item xs={12} md={6}>
                <Card sx={s.infoCard}>
                  <CardContent>
                    <Typography variant="h6" sx={s.infoCardContent}>
                      Project Details
                    </Typography>
                    <Stack spacing={2}>
                      {[
                        ['Start Date', project.startDate],
                        ['Budget', project.budget],
                        ['Description', project.description]
                      ].map(([label, value]) => (
                        <Box key={label}>
                          <Typography variant="body2" sx={s.infoLabel}>
                            {label}
                          </Typography>
                          <Typography variant="body1" sx={s.infoValue}>
                            {value}
                          </Typography>
                        </Box>
                      ))}
                    </Stack>
                  </CardContent>
                </Card>
              </Grid>

              <Grid item xs={12} md={6}>
                <Card sx={s.infoCard}>
                  <CardContent>
                    <Typography variant="h6" sx={s.infoCardContent}>
                      Recent Activity
                    </Typography>
                    <List>
                      {['Status updated', 'Files uploaded', 'Meeting scheduled'].map(
                        (act, idx) => (
                          <ListItem key={idx} sx={s.recentActivityItem}>
                            <ListItemText
                              primary={act}
                              secondary={new Date().toLocaleDateString()}
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

          {/* Milestones */}
          {activeTab === 1 && !projLoading && (
            <Card sx={s.infoCard}>
              <CardContent>
                <Typography variant="h6" sx={s.infoCardContent}>
                  Project Milestones
                </Typography>
                <TableContainer component={Paper} sx={s.milestonesTableContainer}>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell sx={s.tableCellHeader}>Milestone</TableCell>
                        <TableCell sx={s.tableCellHeader}>Status</TableCell>
                        <TableCell sx={s.tableCellHeader}>Due Date</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {project.milestones.map((m) => (
                        <TableRow key={m.id}>
                          <TableCell sx={s.tableCell}>{m.name}</TableCell>
                          <TableCell>
                            <Chip
                              icon={
                                m.status === 'completed' ? (
                                  <CompletedIcon />
                                ) : (
                                  <PendingIcon color="warning" />
                                )
                              }
                              label={
                                m.status === 'completed' ? 'Completed' : 'In Progress'
                              }
                              sx={
                                m.status === 'completed'
                                  ? s.statusChipCompleted
                                  : s.statusChipInProgress
                              }
                            />
                          </TableCell>
                          <TableCell sx={s.tableCell}>{m.dueDate}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </CardContent>
            </Card>
          )}

          {/* Team */}
          {activeTab === 2 && !projLoading && (
            <Grid container spacing={2}>
              {project.team.map((mem) => (
                <Grid item xs={12} sm={6} key={mem.id}>
                  <Card sx={s.teamCard}>
                    <CardContent>
                      <Stack direction="row" spacing={2} alignItems="center">
                        <Avatar src={mem.avatar} sx={{ width: 56, height: 56 }} />
                        <Box>
                          <Typography variant="body1" sx={s.infoValue}>
                            {mem.name}
                          </Typography>
                          <Typography variant="body2" sx={s.memberRole}>
                            {mem.role}
                          </Typography>
                        </Box>
                      </Stack>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          )}

          {/* Files */}
          {activeTab === 3 && !projLoading && (
            <Card sx={s.infoCard}>
              <CardContent>
                <Typography variant="h6" sx={s.infoCardContent}>
                  Project Files
                </Typography>
                <TableContainer component={Paper} sx={s.filesTableContainer}>
                  <Table>
                    <TableHead>
                      <TableRow>
                        {['File Name','Type','Size','Date','Actions'].map((hdr) => (
                          <TableCell key={hdr} sx={s.tableCellHeader}>
                            {hdr}
                          </TableCell>
                        ))}
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {project.files.map((f) => (
                        <TableRow key={f.id}>
                          <TableCell sx={s.tableCell}>
                            <Stack sx={s.fileNameStack} direction="row" alignItems="center">
                              <FilesIcon fontSize="small" sx={s.fileNameIcon} />
                              <Typography>{f.name}</Typography>
                            </Stack>
                          </TableCell>
                          <TableCell sx={s.tableCell}>{f.type.toUpperCase()}</TableCell>
                          <TableCell sx={s.tableCell}>{f.size}</TableCell>
                          <TableCell sx={s.tableCell}>{f.date}</TableCell>
                          <TableCell>
                            <IconButton>
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

          {/* Discussion */}
          {activeTab === 4 && (
            <Card sx={s.infoCard}>
              <CardContent>
                <Typography variant="h6" sx={s.infoCardContent}>
                  Discussion
                </Typography>
                <List sx={s.discussionList}>
                  {commLoading && <Typography>Loading…</Typography>}
                  {!commLoading &&
                    comments.map((c) => (
                      <div key={c.id}>
                        <ListItem alignItems="flex-start">
                          <ListItemText
                            primary={<Typography sx={s.commentUser}>{c.user}</Typography>}
                            secondary={
                              <>
                                <Typography sx={s.commentText}>{c.text}</Typography>
                                <Typography sx={s.commentTime}>{c.time}</Typography>
                              </>
                            }
                          />
                        </ListItem>
                        <Divider sx={s.discussionDivider} />
                      </div>
                    ))}
                </List>
                <Box component="form" onSubmit={handleCommentSubmit}>
                  <Stack direction="row" sx={s.commentForm}>
                    <TextField
                      fullWidth
                      placeholder="Add a comment…"
                      variant="outlined"
                      value={commentText}
                      onChange={(e) => setCommentText(e.target.value)}
                      sx={s.commentInput}
                    />
                    <Button type="submit" variant="contained" sx={s.postButton}>
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
  )
}
