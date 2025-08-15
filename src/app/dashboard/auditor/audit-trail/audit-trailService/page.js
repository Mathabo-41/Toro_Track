// Replace with real API endpoints when available
const BASE_URL = '/api/auditor/auditTrail'

export async function fetchAuditTrail() {
  const res = await fetch(`${BASE_URL}/entries`)
  if (!res.ok) throw new Error('Failed to load audit trail')
  return res.json()
}
