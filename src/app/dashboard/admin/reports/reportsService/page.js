// features/admin/PerformanceReports/reportsService.js

const BASE = '/api/reports';

export async function getMetrics() {
  const res = await fetch(`${BASE}/metrics`);
  if (!res.ok) throw new Error('Failed to load metrics');
  return res.json();
}

export async function getActivities() {
  const res = await fetch(`${BASE}/activities`);
  if (!res.ok) throw new Error('Failed to load activities');
  return res.json();
}

export async function exportReport(format) {
  const res = await fetch(`${BASE}/export?format=${format}`);
  if (!res.ok) throw new Error(`Failed to export ${format}`);
  return res.blob();
}
