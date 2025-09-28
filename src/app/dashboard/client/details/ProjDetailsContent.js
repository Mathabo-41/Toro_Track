// This is the main UI component for the Project Details screen.
'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { createSupabaseClient } from '@/lib/supabase/client';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import {
  Box, Typography, Grid, Card, CardContent,
  Stack, List, ListItem, ListItemText,
  Button, Drawer, ListItemButton,
  Chip, Paper,
  Tabs, Tab, TextField, IconButton, CircularProgress,
  Dialog, DialogTitle, DialogContent, DialogActions,
  Snackbar, Alert
} from '@mui/material';
import {
  Assignment as ProjectIcon,
  Logout as LogoutIcon,
  Add as AddIcon,
  Delete as DeleteIcon,
  CheckCircle as DoneIcon,
  Build as InProgressIcon,
  PlaylistAdd as BacklogIcon
} from '@mui/icons-material';
import DashboardIcon from '@mui/icons-material/Dashboard';

import { useDetails } from './useDetails/page';
import { mainContentStyles, headerStyles, tabsStyles } from './styles';
import * as globalStyles from '../common/styles';
import { useClientStore, clientMenu } from '../common/clientStore';

const COLUMN_COLORS = {
  backlog: '#E71D36',
  in_progress: '#FF9F1C',
  done: '#2EC4B6'
};

export default function ProjDetailsContent() {
  const supabase = createSupabaseClient();
  const router = useRouter();
  const { profile, fetchProfile } = useClientStore();
  
  const [projects, setProjects] = useState([]);
  const [teamMembers, setTeamMembers] = useState([]);
  const [currentProjectIndex, setCurrentProjectIndex] = useState(0);
  const [kanbanColumns, setKanbanColumns] = useState(null);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');
  const [openTaskDialog, setOpenTaskDialog] = useState(false);
  const [currentTask, setCurrentTask] = useState(null);
  const [currentColumnId, setCurrentColumnId] = useState('backlog');
  const [isEditing, setIsEditing] = useState(false);
  
  const currentProject = projects.length > 0 ? projects[currentProjectIndex] : null;

  const {
    activeTab,
    handleTabChange,
  } = useDetails(currentProject?.id);

  /*
  Fetches initial data: the user's profile and their list of projects.
  */
  useEffect(() => {
    if (!profile) {
      fetchProfile();
    }

    const fetchPageData = async () => {
      const { data: projectList, error: projectError } = await supabase.from('projects').select('id, project_name, description, status');
      
      if (projectError) {
        setSnackbarMessage('Error fetching projects: ' + projectError.message);
        setSnackbarSeverity('error');
        setOpenSnackbar(true);
      } else if (projectList) {
        setProjects(projectList);
        if (projectList.length > 0) {
          fetchTasksForProject(projectList[0].id);
        }
      }

      const { data: teamData } = await supabase.rpc('get_team_members');
      if (teamData) setTeamMembers(teamData);
    };

    fetchPageData();
  }, [profile, fetchProfile]);

  const fetchTasksForProject = async (projectId) => {
    const { data: tasks, error } = await supabase.from('project_tasks').select('*').eq('project_id', projectId);
    if (error) {
        setSnackbarMessage('Error fetching tasks');
        setSnackbarSeverity('error');
        setOpenSnackbar(true);
        return;
    }
    const columns = {
        backlog: { id: 'backlog', title: 'Backlog', color: COLUMN_COLORS.backlog, icon: <BacklogIcon />, tasks: [] },
        in_progress: { id: 'in_progress', title: 'In Progress', color: COLUMN_COLORS.in_progress, icon: <InProgressIcon />, tasks: [] },
        done: { id: 'done', title: 'Done', color: COLUMN_COLORS.done, icon: <DoneIcon />, tasks: [] }
    };
    tasks.forEach(task => {
        if (columns[task.status]) columns[task.status].tasks.push(task);
    });
    setKanbanColumns(columns);
  };
  
  const onDragEnd = async (result) => {
    const { source, destination, draggableId } = result;
    if (!destination) return;

    const sourceColumn = kanbanColumns[source.droppableId];
    const destColumn = kanbanColumns[destination.droppableId];
    const sourceTasks = [...sourceColumn.tasks];
    const destTasks = [...destColumn.tasks];
    const [movedTask] = sourceTasks.splice(source.index, 1);

    if (source.droppableId === destination.droppableId) {
        sourceTasks.splice(destination.index, 0, movedTask);
    } else {
        destTasks.splice(destination.index, 0, movedTask);
    }

    setKanbanColumns({
        ...kanbanColumns,
        [source.droppableId]: { ...sourceColumn, tasks: sourceTasks },
        [destination.droppableId]: { ...destColumn, tasks: destTasks },
    });

    const { error } = await supabase.from('project_tasks').update({ status: destination.droppableId }).eq('id', draggableId);
    if (error) {
        setSnackbarMessage('Failed to update task status');
        setSnackbarSeverity('error');
        setOpenSnackbar(true);
        fetchTasksForProject(currentProject.id);
    }
  };
  
  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/login');
  };

  const handleAddTask = (columnId) => {
    setCurrentColumnId(columnId);
    setCurrentTask({ title: '', description: '', due_date: '', assignee_id: null });
    setIsEditing(false);
    setOpenTaskDialog(true);
  };
  
  const handleEditTask = (task, columnId) => {
    setCurrentColumnId(columnId);
    setCurrentTask(task);
    setIsEditing(true);
    setOpenTaskDialog(true);
  };
  
  const handleDeleteTask = async (taskId) => {
    const { error } = await supabase.from('project_tasks').delete().eq('id', taskId);
    if (error) {
      setSnackbarMessage('Failed to delete task');
      setSnackbarSeverity('error');
    } else {
      setSnackbarMessage('Task deleted successfully');
      setSnackbarSeverity('success');
      fetchTasksForProject(currentProject.id);
    }
    setOpenSnackbar(true);
  };

  const handleSaveTask = async () => {
    const taskPayload = {
      project_id: currentProject.id,
      title: currentTask.title,
      description: currentTask.description,
      due_date: currentTask.due_date,
      assignee_id: currentTask.assignee_id,
      status: currentColumnId,
    };

    const { error } = isEditing
      ? await supabase.from('project_tasks').update(taskPayload).eq('id', currentTask.id)
      : await supabase.from('project_tasks').insert(taskPayload);
    
    if (error) {
      setSnackbarMessage(isEditing ? 'Failed to update task' : 'Failed to add task');
      setSnackbarSeverity('error');
    } else {
      setSnackbarMessage(isEditing ? 'Task updated successfully' : 'Task added successfully');
      setSnackbarSeverity('success');
      fetchTasksForProject(currentProject.id);
    }
    setOpenSnackbar(true);
    setOpenTaskDialog(false);
  };
  
  const renderKanbanTab = () => {
    if (!currentProject || !kanbanColumns) return <CircularProgress />;
    return (
      <DragDropContext onDragEnd={onDragEnd}>
        <Box sx={{ display: 'flex', overflowX: 'auto', p: 1, backgroundColor: '#f5f5f5', borderRadius: 2, mt: 2 }}>
          {Object.values(kanbanColumns).map(column => (
            <Droppable key={column.id} droppableId={column.id}>
              {(provided) => (
                <Box ref={provided.innerRef} {...provided.droppableProps} sx={{ flex: 1, minWidth: 300, p: 2, borderRadius: 2, backgroundColor: '#f8f9fa', borderTop: `4px solid ${column.color}`, mx: 1 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <Box sx={{ color: column.color, mr: 1 }}>{column.icon}</Box>
                    <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>{column.title}</Typography>
                    <Chip label={column.tasks.length} size="small" sx={{ ml: 'auto', backgroundColor: column.color, color: 'white' }} />
                  </Box>
                  {column.tasks.map((task, index) => (
                    <Draggable key={task.id} draggableId={task.id.toString()} index={index}>
                      {(provided) => (
                        <Box ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps} sx={{ p: 1.5, mb: 1.5, borderRadius: 1, backgroundColor: 'white', boxShadow: 1, borderLeft: `4px solid ${column.color}` }} onClick={() => handleEditTask(task, column.id)}>
                           <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                            <Typography variant="body2" sx={{ fontWeight: '500' }}>{task.title}</Typography>
                            <IconButton size="small" onClick={(e) => { e.stopPropagation(); handleDeleteTask(task.id); }}><DeleteIcon fontSize="small" /></IconButton>
                           </Box>
                          <Typography variant="caption" color="text.secondary" display="block" mt={0.5}>
                            {task.due_date ? `Due: ${new Date(task.due_date).toLocaleDateString("en-GB")}` : 'No due date'}
                          </Typography>
                        </Box>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                  <Button startIcon={<AddIcon />} fullWidth onClick={() => handleAddTask(column.id)} sx={{ mt: 1 }}>Add Task</Button>
                </Box>
              )}
            </Droppable>
          ))}
        </Box>
      </DragDropContext>
    );
  };
  
  const renderTabContent = () => { /* ... existing render functions ... */ };

  return (
    <Box sx={globalStyles.rootBox}>
      <Drawer variant="permanent" anchor="left" sx={{ '& .MuiDrawer-paper': globalStyles.drawerPaper }}>
        <Box sx={{ p: 1, borderBottom: '2px solid #6b705c', display: 'flex',  alignItems: 'center', gap: 1 }}>
          <Link href="/login" passHref><IconButton sx={{ color: 'green' }}><DashboardIcon /></IconButton></Link>
          <Typography variant="h5" sx={{ color: '#fefae0'}}>Client Portal</Typography>
        </Box>
        <List>
          {clientMenu.map((item) => (
            <ListItem key={item.path} disablePadding>
              <ListItemButton component={Link} href={item.path} sx={globalStyles.listItemButton}><ListItemText primary={item.name} /></ListItemButton>
            </ListItem>
          ))}
        </List>
        <Box sx={{ mt: 'auto', p: 2, borderTop: '2px solid #6b705c' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2, gap: 1.5 }}>
            <Box sx={{ width: '40px', height: '40px', borderRadius: '50%', overflow: 'hidden', position: 'relative', flexShrink: 0, border: '2px solid #f3722c' }}>
                <Image src={profile?.avatar_url || "/toroLogo.jpg"} alt="User Profile" fill style={{ objectFit: 'cover' }}/>
            </Box>
            <Box sx={{ minWidth: 0 }}>
                <Typography noWrap sx={{ fontWeight: '600', color: '#fefae0' }}>{profile?.name || 'Client Name'}</Typography>
                <Typography variant="caption" noWrap sx={{ color: 'rgba(254, 250, 224, 0.7)' }}>{profile?.email || 'client@email.com'}</Typography>
            </Box>
          </Box>
          <Button onClick={handleLogout} fullWidth variant="outlined" sx={{ color: '#fefae0', borderColor: '#fefae0', '&:hover': { background: '#6b705c' } }}>Logout</Button>
        </Box>
      </Drawer>

      <Box component="main" sx={mainContentStyles.mainBox}>
        { currentProject ? (
          <>
            <Box sx={headerStyles.headerBox}>
              <Stack direction="row" justifyContent="space-between" alignItems="center">
                <Typography variant="h4" sx={headerStyles.headerTitle}><ProjectIcon sx={headerStyles.projectIcon} />{currentProject.project_name}</Typography>
                <Chip label={currentProject.status} sx={headerStyles.chip(currentProject.status)} />
              </Stack>
              <Typography variant="body1" sx={headerStyles.headerSubtext}>Project ID: {currentProject.id} | {currentProject.description}</Typography>
            </Box>
            <Tabs value={activeTab} onChange={handleTabChange} sx={tabsStyles.tabs}>
              <Tab label="Overview" sx={tabsStyles.tab} />
              <Tab label="Milestones" sx={tabsStyles.tab} />
              <Tab label="Team" sx={tabsStyles.tab} />
              <Tab label="Files" sx={tabsStyles.tab} />
              <Tab label="Discussion" sx={tabsStyles.tab} />
              <Tab label="Kanban Board" sx={tabsStyles.tab} />
            </Tabs>
            <Box sx={{ mt: 2 }}>{renderTabContent()}</Box>
          </>
        ) : (
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%', textAlign: 'center' }}>
            <Typography variant="h5" sx={{ color: '#525252', fontWeight: 500 }}>
              You currently do not have any projects with Toro Informatics.
            </Typography>
          </Box>
        )}
      </Box>
      <Dialog open={openTaskDialog} onClose={() => setOpenTaskDialog(false)} fullWidth maxWidth="sm">
        {/* ... Dialog Content ... */}
      </Dialog>
      <Snackbar open={openSnackbar} autoHideDuration={3000} onClose={() => setOpenSnackbar(false)} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
        <Alert severity={snackbarSeverity} sx={{ width: '100%' }}>{snackbarMessage}</Alert>
      </Snackbar>
    </Box>
  );
}