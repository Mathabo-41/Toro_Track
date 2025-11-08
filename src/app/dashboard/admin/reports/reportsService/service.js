// This file handles all data-related tasks for this feature.
import { createSupabaseClient } from '@/lib/supabase/client';
import React from 'react';
import {
    People as PeopleIcon,
    Work as WorkIcon,
    Star as StarIcon,
    BarChart as BarChartIcon,
    TrendingUp as TrendingUpIcon,
    PlaylistAdd as BacklogIcon,
    Build as InProgressIcon,
    CheckCircle as DoneIcon,
} from '@mui/icons-material';

// Export icons so the hook can use them
export { PeopleIcon, WorkIcon, StarIcon, BarChartIcon, TrendingUpIcon, BacklogIcon, InProgressIcon, DoneIcon };

// Static data for the sidebar navigation menu.
export const adminMenuData = [
    { name: 'Dashboard Overview', path: '/dashboard/admin/overview' },
    { name: 'Projects', path: '/dashboard/admin/projects' },
    { name: 'Performance Reports', path: '/dashboard/admin/reports' },
    { name: 'Client Profiles', path: '/dashboard/admin/profiles' },
    { name: 'Invite Users', path: '/dashboard/admin/users' },
    { name: 'Settings', path: '/dashboard/admin/settings' }
];

// --- Helper Functions for Data Processing ---

const getTotalTasks = (project) => {
    if (!project?.columns) return 0;
    return Object.values(project.columns).reduce((total, column) => total + (column?.tasks?.length || 0), 0);
};

const createMetricsData = (projects, members) => {
    const totalTasks = projects.reduce((total, project) => total + getTotalTasks(project), 0);
    const completedTasks = projects.reduce((total, project) => total + (project.columns?.done?.tasks?.length || 0), 0);
    const inProgressTasks = projects.reduce((total, project) => total + (project.columns?.in_progress?.tasks?.length || 0), 0);
    const backlogTasks = projects.reduce((total, project) => total + (project.columns?.backlog?.tasks?.length || 0), 0);

    return {
      totalProjects: { title: 'Total Projects', value: projects.length, trend: 'up', change: '+100%', icon: <WorkIcon /> },
      completedTasks: { title: 'Completed Tasks', value: completedTasks, trend: 'up', change: '+100%', icon: <DoneIcon /> },
      inProgress: { title: 'In Progress', value: inProgressTasks, trend: 'up', change: '+100%', icon: <InProgressIcon /> },
      teamMembers: { title: 'Team Members', value: members.length, trend: 'up', change: '+100%', icon: <PeopleIcon /> },
      backlog: { title: 'Backlog Tasks', value: backlogTasks, trend: 'up', change: '+100%', icon: <BacklogIcon /> }
    };
};

export const createEmptyMetrics = () => ({
    totalProjects: { title: 'Total Projects', value: 0, trend: 'neutral', change: '0%', icon: <WorkIcon /> },
    completedTasks: { title: 'Completed Tasks', value: 0, trend: 'neutral', change: '0%', icon: <DoneIcon /> },
    inProgress: { title: 'In Progress', value: 0, trend: 'neutral', change: '0%', icon: <InProgressIcon /> },
    teamMembers: { title: 'Team Members', value: 0, trend: 'neutral', change: '0', icon: <PeopleIcon /> },
    backlog: { title: 'Backlog Tasks', value: 0, trend: 'neutral', change: '0%', icon: <BacklogIcon /> }
});

/**
 * Fetches all data needed for the Performance Reports page.
 * This single function is called by useQuery.
 */
export async function getPerformanceReportsData() {
    const supabase = createSupabaseClient();
    
    // 1. Fetch User
    const { data: { user } } = await supabase.auth.getUser();

    // 2. Fetch Projects and their Tasks in one go
    const { data: projectsData, error: projectsError } = await supabase
        .from('projects')
        .select(`
            *,
            project_tasks ( * )
        `)
        .order('created_at', { ascending: false });

    if (projectsError) {
        console.error('Error fetching projects and tasks:', projectsError);
        throw new Error('Failed to fetch projects: ' + projectsError.message);
    }

    let projectsWithTasks = [];
    if (projectsData && projectsData.length > 0) {
        // Process projects and assign tasks
        projectsWithTasks = projectsData.map(project => {
            const tasksForProject = project.project_tasks || [];
            
            const columns = {
                backlog: {
                    id: 'backlog',
                    title: 'Backlog',
                    tasks: tasksForProject.filter(task => task.status === 'backlog' || !task.status) || []
                },
                in_progress: {
                    id: 'in_progress',
                    title: 'In Progress',
                    tasks: tasksForProject.filter(task => task.status === 'in_progress') || [] 
                },
                done: {
                    id: 'done',
                    title: 'Done',
                    tasks: tasksForProject.filter(task => task.status === 'done') || []
                }
            };

            const totalTasks = tasksForProject.length;
            const completedTasks = columns.done.tasks.length;
            const progress = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

            return {
                id: project.id,
                name: project.project_name || 'Unnamed Project',
                description: project.description || 'No description available',
                progress: progress,
                columns: columns,
                created_at: project.created_at,
                updated_at: project.updated_at
            };
        });
    }

    // 3. Fetch Team Members
    let formattedMembers = [];
    try {
        const { data: membersData, error: membersError } = await supabase
            .from('users') // Main table for team
            .select('id, email, name, role')
            .neq('role', 'client');

        if (membersError) throw membersError;

        formattedMembers = (membersData || []).map((member, index) => ({
            id: member.id,
            name: member.name || member.email,
            role: member.role || 'team_member',
            color: ['#f3722c', '#2ec4b6', '#e71d36', '#ff9f1c', '#6b705c'][index % 5]
        }));
    } catch (err) {
        console.warn('Error fetching team members from users table:', err.message);
        // Fallback to 'profiles' table
        try {
            const { data: profileData, error: profileError } = await supabase
                .from('profiles')
                .select('id, email, full_name, role');
             if (profileError) throw profileError;
             formattedMembers = (profileData || []).map((member, index) => ({
                id: member.id,
                name: member.full_name || member.email,
                role: member.role || 'team_member',
                color: ['#f3722c', '#2ec4b6', '#e71d36', '#ff9f1c', '#6b705c'][index % 5]
            }));
        } catch (err2) {
            console.error('Also failed to fetch from profiles table:', err2.message);
        }
    }

    // 4. Create Metrics
    const metricsData = createMetricsData(projectsWithTasks, formattedMembers);

    return {
        currentUser: user,
        projects: projectsWithTasks,
        teamMembers: formattedMembers,
        reports: metricsData,
    };
}

/*
  Creates a new task in the database.
*/
export async function createTask(taskData) {
    const supabase = createSupabaseClient();
    if (!taskData.projectId || !taskData.title) {
        throw new Error('Project ID and Title are required to create a task.');
    }

    try {
        const { data, error } = await supabase
            .from('project_tasks')
            .insert({
                project_id: taskData.projectId,
                title: taskData.title.trim(),
                description: taskData.description || null,
                assignee_id: taskData.assignee_id || null,
                due_date: taskData.dueDate || null,
                status: 'backlog', // New tasks always go to backlog
            })
            .select()
            .single();
        if (error) throw error;
        return data;
    } catch (error) {
        console.error('Unexpected error in createTask:', error);
        throw error;
    }
}

/*
  Updates an existing task in the database.
*/
export async function updateTask(taskId, taskData) {
    const supabase = createSupabaseClient();
    try {
        const { data, error } = await supabase
            .from('project_tasks')
            .update({
                title: taskData.title,
                description: taskData.description,
                assignee_id: taskData.assignee_id || null,
                due_date: taskData.dueDate || taskData.due_date, // Handle both formats
                status: taskData.status,
                updated_at: new Date().toISOString()
            })
            .eq('id', taskId)
            .select()
            .single();
        if (error) throw error;
        return data;
    } catch (error) {
        console.error('Unexpected error in updateTask:', error);
        throw error;
    }
}

/*
  Deletes a task from the database.
*/
export async function deleteTask(taskId) {
    const supabase = createSupabaseClient();
    try {
        const { error } = await supabase
            .from('project_tasks')
            .delete()
            .eq('id', taskId);
        if (error) throw error;
        return { id: taskId }; // Return the ID for confirmation
    } catch (error) {
        console.error('Unexpected error in deleteTask:', error);
        throw error;
    }
}