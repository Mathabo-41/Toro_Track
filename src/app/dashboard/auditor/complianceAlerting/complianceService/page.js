// Temporary stub; replace with real endpoint when available
const BASE_URL = '/api/auditor/compliance'

const mockFeatures = [
  {
    title: 'Compliance Checklist Templates',
    description:
      'Pre-define steps for software license audits, hardware disposal protocols, and data-protection reviews.'
  },
  {
    title: 'Rule-Based Alerts',
    description:
      'Trigger notifications when required documentation is missing or retention periods are about to expire.'
  },
  {
    title: 'Role-Based Access Controls',
    description:
      'Ensure auditors have read-only access to production systems, and that sensitive actions are logged and restricted.'
  }
]

export async function fetchComplianceFeatures() {
  // Example fetch; fall back to mock
  try {
    const res = await fetch(`${BASE_URL}/features`)
    if (!res.ok) throw new Error('Network response was not ok')
    return res.json()
  } catch {
    return mockFeatures
  }
}
