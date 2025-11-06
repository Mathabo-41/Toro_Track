// This file handles all data-related tasks for this feature, such as fetching and sending information to our database.
import { createSupabaseClient } from '@/lib/supabase/client';
import {
    People as PeopleIcon,
    Work as WorkIcon,
    Star as StarIcon,
    BarChart as BarChartIcon,
    TrendingUp as TrendingUpIcon
} from '@mui/icons-material';

// Static data for the sidebar navigation menu.
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
    // This function can remain as is, using mock data for now.
    return getFallbackMetrics();
}

/*
  Fetches all project and task data for the Kanban board view.
*/
export async function fetchKanbanData() {
    const supabase = createSupabaseClient();

    try {
        const { data: projects, error: projectsError } = await supabase
            .from('projects')
            .select('*');

        if (projectsError) {
            console.error('Error fetching projects:', projectsError);
            return []; // Return empty array on error
        }

        const projectsWithTasks = await Promise.all(
            projects.map(async (project) => {
                const { data: tasks, error: tasksError } = await supabase
                    .from('project_tasks')
                    .select('*')
                    .eq('project_id', project.id);
                
                // Even if tasks fail to load, return the project with empty columns
                if (tasksError) {
                    console.error(`Error fetching tasks for project ${project.id}:`, tasksError);
                }

                const organizedTasks = tasks || [];

                return {
                    ...project,
                    columns: {
                        backlog: {
                            id: 'backlog',
                            title: 'Backlog',
                            tasks: organizedTasks.filter(t => t.status === 'backlog')
                        },
                        inProgress: {
                            id: 'inProgress',
                            title: 'In Progress',
                            tasks: organizedTasks.filter(t => t.status === 'inProgress')
                        },
                        done: {
                            id: 'done',
                            title: 'Done',
                            tasks: organizedTasks.filter(t => t.status === 'done')
                        }
                    }
                };
            })
        );

        return projectsWithTasks;
    } catch (error) {
        console.error('Error fetching Kanban data:', error);
        return []; // Return empty array on error
    }
}

/*
  Fetches a list of all team members.
*/
export async function fetchTeamMembers() {
    const supabase = createSupabaseClient();
    const colors = ['#f3722c', '#2ec4b6', '#e71d36', '#ff9f1c', '#6b705c'];

    try {
        // Query the 'profiles' table as defined by your schema
        const { data: members, error: membersError } = await supabase
            .from('profiles')
            .select('id, name, role')
            .order('name');

        if (membersError) {
            // This is where your error was happening
            console.error('Error fetching team members:', membersError);
            throw membersError; // Throw error to be caught by the calling function
        }

        // Map colors to the members
        return members?.map((member, index) => ({
            ...member,
            color: colors[index % colors.length] // Assign a color from the array
        })) || [];
    } catch (error) {
        console.error('An unexpected error occurred in fetchTeamMembers:', error);
        return []; // Return an empty array if anything goes wrong
    }
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
                status: 'backlog',
            })
            .select()
            .single();

        if (error) {
            console.error('Error creating task in database:', error);
            throw error;
        }

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
                due_date: taskData.dueDate || taskData.due_date,
                status: taskData.status,
                updated_at: new Date().toISOString()
            })
            .eq('id', taskId)
            .select()
            .single();

        if (error) {
            console.error('Error updating task:', error);
            throw error;
        }

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

        if (error) {
            console.error('Error deleting task:', error);
            throw error;
        }

    } catch (error) {
        console.error('Unexpected error in deleteTask:', error);
        throw error;
    }
}

// Mock data functions (can be removed if not needed elsewhere)
function getFallbackMetrics() {
    return {
        clientAcquisition: {
            title: 'Client Acquisition',
            value: '12',
            change: 'this quarter',
            trend: 'up',
            icon: <PeopleIcon />
        },
        projectCompletion: {
            title: 'Project Completion Rate',
            value: '75%',
            change: 'last quarter',
            trend: 'up',
            icon: <WorkIcon />
        },
        clientRetention: {
            title: 'Client Retention Rate',
            value: '88%',
            change: 'last quarter',
            trend: 'up',
            icon: <TrendingUpIcon />
        },
        revenueGrowth: {
            title: 'Revenue Growth Rate',
            value: '15%',
            change: 'quarter-over-quarter',
            trend: 'up',
            icon: <StarIcon />
        },
        satisfactionScores: {
            title: 'Avg. Satisfaction',
            value: '4.2/5',
            change: 'last quarter',
            trend: 'up',
            icon: <StarIcon />
        },
        teamPerformance: {
            title: 'Team Performance',
            value: '92%',
            change: 'tasks on time',
            trend: 'up',
            icon: <BarChartIcon />
        }
    };
}