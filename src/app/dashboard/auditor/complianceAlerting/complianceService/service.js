// complianceService/page.js
import { createSupabaseClient } from '@/lib/supabase/client';

export const fetchActiveAlerts = async () => {
  const supabase = createSupabaseClient();
  const { data, error } = await supabase
    .from('compliance_alerts')
    .select(`
      id,
      severity,
      details,
      status,
      created_at,
      assigned_to,
      clients(client_name),
      profiles(full_name)
    `)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching compliance alerts:', error);
    throw error;
  }

  return data.map(alert => ({
    id: alert.id,
    severity: alert.severity,
    client: alert.clients?.client_name || 'Unknown Client',
    details: alert.details,
    timestamp: new Date(alert.created_at).toLocaleString('en-US', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    }),
    status: alert.status,
    assignedTo: alert.profiles?.full_name || 'Unassigned'
  }));
};

export const fetchSecurityChecks = async () => {
  const supabase = createSupabaseClient();
  const { data, error } = await supabase
    .from('security_compliance_checks')
    .select('*')
    .order('last_checked', { ascending: false });

  if (error) {
    console.error('Error fetching security checks:', error);
    throw error;
  }

  return data;
};

export const exportComplianceReport = async () => {
  const supabase = createSupabaseClient();
  const alerts = await fetchActiveAlerts();
  
  const headers = ['Severity', 'Client', 'Alert Details', 'Timestamp', 'Status', 'Assigned To'];
  const csvContent = [
    headers.join(','),
    ...alerts.map(alert => [
      alert.severity,
      `"${alert.client}"`,
      `"${alert.details}"`,
      `"${alert.timestamp}"`,
      alert.status,
      `"${alert.assignedTo}"`
    ].join(','))
  ].join('\n');

  const blob = new Blob([csvContent], { type: 'text/csv' });
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `compliance-report-${new Date().toISOString().split('T')[0]}.csv`;
  a.click();
  window.URL.revokeObjectURL(url);
};