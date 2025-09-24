// This file handles all data-related tasks for this feature, such as fetching and sending information to our database.
import { supabase } from '@/lib/supabaseClient';
import {
    People as PeopleIcon,
    Work as WorkIcon,
    Star as StarIcon,
    BarChart as BarChartIcon,
    TrendingUp as TrendingUpIcon
} from '@mui/icons-material';

// Static data for the sidebar navigation menu. This does not need to be in the database.
export const adminMenuData = [
    { name: 'Dashboard Overview', path: '/dashboard/admin/overview' },
    { name: 'Performance Reports', path: '/dashboard/admin/reports' },
    { name: 'Client Profiles', path: '/dashboard/admin/profiles' },
    { name: 'Projects', path: '/dashboard/admin/projects' },
    { name: 'Teams & Users', path: '/dashboard/admin/users' },
    { name: 'Settings', path: '/dashboard/admin/settings' }
];

/*
  Fetches key performance metrics from the database.
*/
export async function fetchReportMetrics() {
    const { data, error } = await supabase.rpc('get_admin_report_metrics');

    if (error) {
        console.error('Error fetching report metrics:', error);
        throw new Error('Could not fetch report metrics.');
    }
    
    if (!data || data.length === 0) {
        return {};
    }

    const metrics = data[0];

    // Map database results to the structure expected by the frontend
    return {
        clientAcquisition: {
            title: 'Client Acquisition',
            value: metrics.client_acquisition_quarter || 0,
            change: 'this quarter',
            trend: 'up',
            icon: <PeopleIcon />
        },
        projectCompletion: {
            title: 'Project Completion Rate',
            value: `${Math.round(metrics.project_completion_rate || 0)}%`,
            change: 'last quarter',
            trend: 'up',
            icon: <WorkIcon />
        },
        clientRetention: {
            title: 'Client Retention Rate',
            value: `${Math.round(metrics.client_retention_rate || 0)}%`,
            change: 'last quarter',
            trend: 'up',
            icon: <TrendingUpIcon />
        },
        revenueGrowth: {
            title: 'Revenue Growth Rate',
            value: `${Math.round(metrics.revenue_growth_rate || 0)}%`,
            change: 'quarter-over-quarter',
            trend: 'up',
            icon: <StarIcon />
        },
        satisfactionScores: {
            title: 'Avg. Satisfaction',
            value: `${(metrics.avg_satisfaction_score || 0).toFixed(1)}/5`,
            change: 'last quarter',
            trend: 'up',
            icon: <StarIcon />
        },
        teamPerformance: {
            title: 'Team Performance',
            value: `${Math.round(metrics.team_performance_rate || 0)}%`,
            change: 'tasks on time',
            trend: 'up',
            icon: <BarChartIcon />
        }
    };
}

/*
  Fetches recent client activities from the database.
*/
export async function fetchRecentActivities() {
    const { data, error } = await supabase.rpc('get_recent_client_activities', { limit_count: 5 });

    if (error) {
        console.error('Error fetching recent activities:', error);
        throw new Error('Could not fetch recent activities.');
    }
    return data || [];
}

/*
  Fetches all project and task data for the Kanban board view.
*/
export async function fetchKanbanData() {
    const { data, error } = await supabase.rpc('get_kanban_data');
    if (error) {
        console.error('Error fetching Kanban data:', error);
        throw new Error('Could not fetch Kanban project data.');
    }
    return data || [];
}

/*
  Fetches a list of all team members.
*/
export async function fetchTeamMembers() {
    const { data, error } = await supabase.rpc('get_team_members');
    if (error) {
        console.error('Error fetching team members:', error);
        throw new Error('Could not fetch team members.');
    }
    return data || [];
}

/*
  Adds a new task to a project in the database.
*/
export async function addTask(taskData) {
    const { data, error } = await supabase.rpc('add_project_task', {
        p_project_id: taskData.projectId,
        p_title: taskData.title,
        p_description: taskData.description,
        p_assignee_id: taskData.assigneeId,
        p_due_date: taskData.dueDate
    });

    if (error) {
        console.error('Error adding task:', error);
        throw new Error('Failed to add new task.');
    }
    return data;
}

/*
  Updates the status of a task when it's moved between Kanban columns.
*/
export async function updateTaskStatus(taskId, newStatus) {
    const { error } = await supabase.rpc('update_project_task_status', {
        p_task_id: taskId,
        p_new_status: newStatus
    });

    if (error) {
        console.error('Error updating task status:', error);
        throw new Error('Failed to update task status.');
    }
}

/*
  Deletes a task from the database.
*/
export async function deleteTask(taskId) {
    const { error } = await supabase.rpc('delete_project_task', { p_task_id: taskId });

    if (error) {
        console.error('Error deleting task:', error);
        throw new Error('Failed to delete task.');
    }
}