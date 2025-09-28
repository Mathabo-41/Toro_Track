// This file handles all data-related tasks for this feature, such as fetching and sending information to our database.
import { createSupabaseClient } from '@/lib/supabase/client'; 
import {
  People as PeopleIcon,
  Assignment as ProjectsIcon,
  Groups as TeamsIcon,
  Timeline as ActivityIcon,
} from '@mui/icons-material';

/*
  Calculates the start of the current week.
*/
function getWeekStartDate() {
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const day = today.getDay() || 7; // Sunday is 0, make it 7
  const start = new Date(today);
  start.setDate(today.getDate() - day + 1);
  return start.toISOString();
}

/*
  Formats a timestamp into a human-readable "time ago" string.
*/
function formatTime(timestamp) {
  const now = new Date();
  const past = new Date(timestamp);
  const diff = Math.floor((now - past) / 1000);

  if (diff < 60) return `${diff} seconds ago`;

  const minutes = Math.floor(diff / 60);
  if (minutes < 60) return `${minutes} minutes ago`;

  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours} hours ago`;

  const days = Math.floor(hours / 24);
  return `${days} days ago`;
}

/*
  Fetches key metrics for the dashboard overview.
  It gets counts for clients, projects, and team members.
  It also calculates the activity trend for the current week compared to the last.
*/
export async function fetchMetrics() {
  const start = getWeekStartDate();

  // Use the dedicated RPC function for main metrics for efficiency and accuracy
  const { data: metricsData, error: metricsError } = await supabase.rpc('get_admin_overview_metrics');

  const [
    newClientsData,
    newProjectsData,
    totalTeamsData
  ] = await Promise.all([
    supabase.from('clients').select('id', { count: 'exact', head: true }).gte('created_at', start),
    supabase.from('projects').select('id', { count: 'exact', head: true }).gte('created_at', start),
    supabase.from('teams').select('id', { count: 'exact', head: true })
  ]);

  const allErrors = [metricsError, newClientsData.error, newProjectsData.error, totalTeamsData.error].filter(Boolean);

  if (allErrors.length > 0) {
    console.error("Error fetching metrics:", allErrors);
    throw new Error('Could not fetch dashboard metrics.');
  }

  const overviewMetrics = metricsData[0];
  const thisWeekActivity = overviewMetrics.this_week_activity || 0;
  
  // Note: Trend for This Week Activity requires a separate historical query if needed.
  // For now, we display the count as provided by the function.
  
  return [{
      title: 'Total Clients',
      value: overviewMetrics.total_clients || 0,
      change: `+${newClientsData.count || 0} new`,
      icon: <PeopleIcon color="primary" fontSize="large" />,
      trend: 'up'
    },
    {
      title: 'Active Projects',
      value: overviewMetrics.active_projects || 0,
      change: `+${newProjectsData.count || 0} new`,
      icon: <ProjectsIcon color="secondary" fontSize="large" />,
      trend: 'up'
    },
    {
      title: 'Team Members',
      value: overviewMetrics.team_members || 0,
      change: `${totalTeamsData.count || 0} Teams`,
      icon: <TeamsIcon color="success" fontSize="large" />,
      trend: 'up'
    },
    {
      title: 'This Week Activity',
      value: thisWeekActivity,
      change: `+${thisWeekActivity}`, // Simplified change metric
      icon: <ActivityIcon color="info" fontSize="large" />,
      trend: 'up'
    }
  ];
}

/*
  Fetches the 5 most recent activities from the database.
*/
export async function fetchActivities() {
  // This function is already defined in your database and is more efficient.
  const { data, error } = await supabase.rpc('get_recent_system_activities', { limit_count: 5 });

  if (error) {
    console.error("Error fetching activities:", error);
    throw new Error('Could not fetch recent activities.');
  }

  return data || [];
}