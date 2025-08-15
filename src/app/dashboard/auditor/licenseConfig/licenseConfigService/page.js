// Replace with real API endpoints when available
const BASE_URL = '/api/auditor/licenseConfig'

// Mock data
const licenseRows = [
  { id: 1, licenseName: 'Photoshop', licenseKey: 'ABC123', status: 'Active' },
  { id: 2, licenseName: 'AutoCAD', licenseKey: 'DEF456', status: 'Expired' },
  { id: 3, licenseName: 'Office 365', licenseKey: 'GHI789', status: 'Active' },
  { id: 4, licenseName: 'Adobe', licenseKey: 'JKL000', status: 'Active' },
  { id: 5, licenseName: 'Visual Studio', licenseKey: 'MNO111', status: 'Active' }
]

const renewalGroups = [
  {
    label: '30 days',
    color: 'warning',
    keys: ['XYZ123', 'ABC456', 'JKL789', 'MNO000']
  },
  {
    label: '60 days',
    color: 'error',
    keys: ['UVW000']
  },
  {
    label: '90 days',
    color: 'default',
    keys: ['LMN888', 'DEF333']
  }
]

const usageData = [
  { software: 'Photoshop', assigned: 80, purchased: 100 },
  { software: 'AutoCAD', assigned: 60, purchased: 50 },
  { software: 'Office 365', assigned: 120, purchased: 120 }
]

export async function fetchLicenseConfig(client) {
  try {
    const res = await fetch(`${BASE_URL}?client=${client}`)
    if (!res.ok) throw new Error('Network response was not ok')
    return res.json()
  } catch {
    // Fallback to mocks
    return {
      licenseRows,
      renewalGroups,
      usageData
    }
  }
}
