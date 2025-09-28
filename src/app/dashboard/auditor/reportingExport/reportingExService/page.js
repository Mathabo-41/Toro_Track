// This file handles all data-related tasks for this feature, such as fetching and sending information to our database.
import { createSupabaseClient } from '@/lib/supabase/client';

/*
* A helper function to trigger a file download in the browser.
*/
const downloadFile = (blob, filename) => {
  const supabase = createSupabaseClient();
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.style.display = 'none';
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  window.URL.revokeObjectURL(url);
  document.body.removeChild(a);
};

/*
* Service function to get available report options from the database.
*/
export async function getReportOptions() {
  const supabase = createSupabaseClient();
  const { data, error } = await supabase.rpc('get_report_options');
  if (error) {
    console.error('Error fetching report options:', error);
    throw error;
  }
  return {
    assetTypes: data[0].asset_types || [],
    clients: data[0].clients || [],
  };
}

/*
* Fetches data and generates a PDF report on the client-side.
*/
export async function exportPdfReport(params) {
  const supabase = createSupabaseClient();
  // To use this function, you must install jspdf and jspdf-autotable
  // npm install jspdf jspdf-autotable
  const { jsPDF } = await import('jspdf');
  await import('jspdf-autotable');

  const { data, error } = await supabase.rpc('get_report_data', {
    from_date: params.fromDate || null,
    to_date: params.toDate || null,
    client_name: params.client || null,
    asset_type: params.assetType || null,
  });

  if (error) throw error;
  
  const doc = new jsPDF();
  doc.autoTable({
    head: [['Order ID', 'Timestamp', 'Receiver', 'Status', 'Asset', 'Serial', 'Client']],
    body: data.map(row => [
      row.order_id,
      new Date(row.timestamp).toLocaleString(),
      row.receiver,
      row.status,
      row.asset,
      row.serial,
      row.client,
    ]),
  });
  doc.save('report.pdf');
  
  return 'PDF report generated successfully.';
}

/*
* Fetches data and generates a CSV report on the client-side.
*/
export async function exportCsvReport(params) {
  const supabase = createSupabaseClient();
  const { data, error } = await supabase.rpc('get_report_data', {
    from_date: params.fromDate || null,
    to_date: params.toDate || null,
    client_name: params.client || null,
    asset_type: params.assetType || null,
  });

  if (error) throw error;

  const headers = ['OrderID,Timestamp,Receiver,Status,Asset,Serial,Client'];
  const rows = data.map(row => 
    [
      row.order_id,
      new Date(row.timestamp).toLocaleString(),
      row.receiver,
      row.status,
      row.asset,
      row.serial,
      row.client,
    ].join(',')
  );
  
  const csvContent = headers.concat(rows).join('\n');
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  downloadFile(blob, 'report.csv');
  
  return 'CSV report generated successfully.';
}

/*
* Saves a scheduled report configuration to the database.
*/
export async function setReportSchedule(params) {
  const supabase = createSupabaseClient();
  const { data, error } = await supabase.rpc('add_scheduled_report', {
    p_frequency: params.scheduleFrequency,
    p_destination: params.sendTo,
  });
  
  if (error) throw error;
  return 'Report schedule set successfully.';
}

/*
* Creates a new on-demand audit snapshot record in the database.
*/
export async function generateAuditSnapshot(params) {
  const supabase = createSupabaseClient();
  const { data, error } = await supabase.rpc('add_report_snapshot', {
    p_cut_off_date: params.cutOffDate,
  });
  
  if (error) throw error;
  return 'Audit snapshot generated successfully.';
}