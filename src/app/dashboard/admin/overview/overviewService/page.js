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
  Fetches key metrics for the dashboard overview.
  It gets counts for clients, projects, and team members.
*/
export async function fetchMetrics() {
  const supabase = createSupabaseClient();
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

/**
 * Fetches all client queries for the admin overview.
 * @returns {Promise<Array>} A promise that resolves with the list of queries.
 */
export async function fetchQueries() {
  const supabase = createSupabaseClient();
  const { data, error } = await supabase.rpc('get_all_client_queries');

  if (error) {
    console.error("Error fetching queries:", error);
    throw new Error('Could not fetch raised queries.');
  }

  return data || [];
}

/**
 * Submits an admin's response to a query.
 * @param {number} queryId - The ID of the query being responded to.
 * @param {string} responseText - The text of the admin's response.
 * @returns {Promise<void>}
 */
export async function postQueryResponse(queryId, responseText) {
  const supabase = createSupabaseClient();
  const { error } = await supabase.rpc('admin_respond_to_query', {
    p_query_id: queryId,
    p_response_text: responseText,
  });

  if (error) {
    console.error("Error posting query response:", error);
    throw new Error('Could not submit the response.');
  }
}