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
    // Commented out database call - using mock data instead
    /*
    const supabase = createSupabaseClient();
    const { data, error } = await supabase.rpc('get_admin_report_metrics');

    if (error) {
        console.error('Error fetching report metrics:', error);
        return getFallbackMetrics();
    }
    
    if (!data || data.length === 0) {
        return getFallbackMetrics();
    }

    const metrics = data[0];

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
    */
    
    console.log('📊 Using mock report metrics');
    return getFallbackMetrics();
}

/*
  Fetches all project and task data for the Kanban board view.
*/
export async function fetchKanbanData() {
    // Commented out database call - using mock data instead
    /*
    const supabase = createSupabaseClient();
    
    try {
        const { data, error } = await supabase.rpc('get_kanban_data');
        
        if (error) {
            console.log('RPC failed, trying direct table access...');
            return await fetchKanbanDataDirect();
        }
        
        return data || getFallbackProjects();
    } catch (error) {
        console.error('Error fetching Kanban data:', error);
        return getFallbackProjects();
    }
    */
    
    console.log('📋 Using mock Kanban data');
    return getFallbackProjects();
}

/*
  Fetches a list of all team members.
*/
export async function fetchTeamMembers() {
    // Commented out database call - using mock data instead
    /*
    const supabase = createSupabaseClient();
    
    try {
        const { data, error } = await supabase.rpc('get_team_members');
        
        if (error) {
            console.log('RPC failed, trying direct table access...');
            const { data: members, error: membersError } = await supabase
                .from('profiles')
                .select('id, name, role')
                .order('name');

            if (membersError) {
                console.error('Error fetching team members:', membersError);
                return getFallbackTeamMembers();
            }

            return members?.map((member, index) => ({
                ...member,
                color: getColorByIndex(index)
            })) || getFallbackTeamMembers();
        }
        
        return data || getFallbackTeamMembers();
    } catch (error) {
        console.error('Error fetching team members:', error);
        return getFallbackTeamMembers();
    }
    */
    
    console.log('👥 Using mock team members');
    return getFallbackTeamMembers();
}

/*
  Creates a new task in the database.
*/
export async function createTask(taskData) {
    // Commented out database call - using mock data instead
    /*
    const supabase = createSupabaseClient();
    
    console.log('Creating task with data:', taskData);
    
    // Validate required fields
    if (!taskData.projectId) {
        throw new Error('Project ID is required to create a task');
    }
    
    if (!taskData.title || taskData.title.trim() === '') {
        throw new Error('Task title is required');
    }

    try {
        const { data, error } = await supabase
            .from('tasks')
            .insert({
                project_id: taskData.projectId,
                title: taskData.title.trim(),
                description: taskData.description || '',
                assignee: taskData.assignee || '',
                assignee_role: taskData.assigneeRole || 'team_member',
                due_date: taskData.dueDate || null,
                status: taskData.status || 'backlog',
                created_at: new Date().toISOString(),
                updated_at: new Date().toISOString()
            })
            .select()
            .single();

        if (error) {
            console.error('Error creating task:', error);
            console.log('Using mock task creation');
            return createMockTask(taskData);
        }

        console.log('Task created successfully:', data);
        return data;
        
    } catch (error) {
        console.error('Unexpected error in createTask:', error);
        return createMockTask(taskData);
    }
    */
    
    console.log('✅ Creating mock task:', taskData);
    
    // Validate required fields
    if (!taskData.projectId) {
        throw new Error('Project ID is required to create a task');
    }
    
    if (!taskData.title || taskData.title.trim() === '') {
        throw new Error('Task title is required');
    }
    
    return createMockTask(taskData);
}

/*
  Updates an existing task in the database.
*/
export async function updateTask(taskId, taskData) {
    // Commented out database call - using mock data instead
    /*
    const supabase = createSupabaseClient();
    
    console.log('Updating task:', taskId, 'with data:', taskData);
    
    try {
        const { data, error } = await supabase
            .from('tasks')
            .update({
                title: taskData.title,
                description: taskData.description,
                assignee: taskData.assignee,
                assignee_role: taskData.assigneeRole || 'team_member',
                due_date: taskData.due_date || taskData.dueDate,
                status: taskData.status,
                updated_at: new Date().toISOString()
            })
            .eq('id', taskId)
            .select()
            .single();

        if (error) {
            console.error('Error updating task:', error);
            return { id: taskId, ...taskData };
        }

        return data;
        
    } catch (error) {
        console.error('Unexpected error in updateTask:', error);
        return { id: taskId, ...taskData };
    }
    */
    
    console.log('✏️ Updating mock task:', taskId, taskData);
    return { id: taskId, ...taskData };
}

/*
  Updates only the status of a task when it's moved between Kanban columns.
*/
export async function updateTaskStatus(taskId, newStatus) {
    // Commented out database call - using mock success instead
    /*
    const supabase = createSupabaseClient();
    
    console.log('Updating task status:', taskId, 'to:', newStatus);
    
    try {
        const { error } = await supabase
            .from('tasks')
            .update({
                status: newStatus,
                updated_at: new Date().toISOString()
            })
            .eq('id', taskId);

        if (error) {
            console.error('Error updating task status:', error);
            return;
        }

        console.log('Task status updated successfully');
        
    } catch (error) {
        console.error('Unexpected error in updateTaskStatus:', error);
    }
    */
    
    console.log('🔄 Updating mock task status:', taskId, 'to', newStatus);
    // Mock success - no return needed
}

/*
  Deletes a task from the database.
*/
export async function deleteTask(taskId) {
    // Commented out database call - using mock success instead
    /*
    const supabase = createSupabaseClient();
    
    console.log('Deleting task:', taskId);
    
    try {
        const { error } = await supabase
            .from('tasks')
            .delete()
            .eq('id', taskId);

        if (error) {
            console.error('Error deleting task:', error);
            return;
        }

        console.log('Task deleted successfully');
        
    } catch (error) {
        console.error('Unexpected error in deleteTask:', error);
    }
    */
    
    console.log('🗑️ Deleting mock task:', taskId);
    // Mock success - no return needed
}

/*
  Exports reports data in various formats.
*/
export async function exportReports(format) {
    // Commented out database call
    /*
    const supabase = createSupabaseClient();
    const { data, error } = await supabase.rpc('export_reports_data', {
        p_format: format.toLowerCase()
    });

    if (error) {
        console.error('Error exporting reports:', error);
        throw new Error(`Failed to export ${format} report.`);
    }
    return data;
    */
    
    console.log('📤 Mock export:', format);
    return { message: `Mock ${format} export completed` };
}

// Mock data functions
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

function getFallbackProjects() {
    return [
        {
            id: 1,
            name: 'CRM Dashboard Redesign',
            description: 'Redesign of the main CRM dashboard interface',
            progress: 65,
            columns: {
                backlog: {
                    id: 'backlog',
                    title: 'Backlog',
                    tasks: [
                        { 
                            id: 1, 
                            title: 'Update dashboard UI', 
                            assignee: '1', 
                            assignee_id: 1,
                            assignee_role: 'admin',
                            description: 'Redesign the main dashboard components', 
                            due_date: '2023-12-15' 
                        },
                        { 
                            id: 2, 
                            title: 'Research analytics tools', 
                            assignee: '2', 
                            assignee_id: 2,
                            assignee_role: 'auditor',
                            description: 'Evaluate new tools for customer analytics', 
                            due_date: '2023-12-20' 
                        }
                    ]
                },
                inProgress: {
                    id: 'inProgress',
                    title: 'In Progress',
                    tasks: [
                        { 
                            id: 3, 
                            title: 'Implement API endpoints', 
                            assignee: '3', 
                            assignee_id: 3,
                            assignee_role: 'client',
                            description: 'Create new endpoints for customer data', 
                            due_date: '2023-12-10' 
                        }
                    ]
                },
                done: {
                    id: 'done',
                    title: 'Done',
                    tasks: [
                        { 
                            id: 4, 
                            title: 'Deploy latest version', 
                            assignee: '1', 
                            assignee_id: 1,
                            assignee_role: 'admin',
                            description: 'Production deployment v2.1.0', 
                            due_date: '2023-12-05' 
                        }
                    ]
                }
            }
        },
        {
            id: 2,
            name: 'Mobile App Development',
            description: 'iOS and Android application for customer access',
            progress: 35,
            columns: {
                backlog: {
                    id: 'backlog',
                    title: 'Backlog',
                    tasks: [
                        { 
                            id: 5, 
                            title: 'Create wireframes', 
                            assignee: '4', 
                            assignee_id: 4,
                            assignee_role: 'auditor',
                            description: 'Design app wireframes', 
                            due_date: '2024-01-10' 
                        }
                    ]
                },
                inProgress: {
                    id: 'inProgress',
                    title: 'In Progress',
                    tasks: []
                },
                done: {
                    id: 'done',
                    title: 'Done',
                    tasks: []
                }
            }
        }
    ];
}

function getFallbackTeamMembers() {
    return [
        { id: 1, name: 'John D.', role: 'admin', color: '#FF6B6B' },
        { id: 2, name: 'ZamaZama M.', role: 'auditor', color: '#4ECDC4' },
        { id: 3, name: 'Thato T.', role: 'client', color: '#45B7D1' },
        { id: 4, name: 'Zweli L.', role: 'auditor', color: '#FFA07A' },
        { id: 5, name: 'Alex K.', role: 'client', color: '#98D8C8' }
    ];
}

function createMockTask(taskData) {
    const selectedMember = getFallbackTeamMembers().find(m => m.id === taskData.assignee);
    
    return {
        id: Date.now(), // Generate a unique ID
        title: taskData.title,
        description: taskData.description,
        assignee: taskData.assignee,
        assignee_id: taskData.assignee,
        assignee_role: selectedMember?.role || 'team_member',
        due_date: taskData.dueDate,
        status: taskData.status || 'backlog',
        project_id: taskData.projectId,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
    };
}