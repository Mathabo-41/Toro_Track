// Replace with your real endpoint when ready
export async function fetchSettings() {
  try {
    const res = await fetch('/api/auditor/settings')
    if (!res.ok) throw new Error('Network response was not ok')
    return res.json()
  } catch {
    // Fallback defaults
    return {
      audit: {
        retentionPeriod: 90,
        immutableMode: true,
        autoCapture: { login: true },
        timezone: 'UTC'
      },
      delivery: {
        detailLevel: 'full',
        allowManualOverride: false
      },
      license: {
        alertThresholds: ['30', '60', '90'],
        usageWarningLevel: 90
      },
      asset: {
        defaultStatuses: ['In transit', 'Deployed'],
        enableSignatureCapture: true
      },
      report: {
        formats: ['PDF', 'CSV'],
        schedule: 'Monthly'
      },
      compliance: {
        checklists: ['Software audit', 'Hardware disposal'],
        alertChannels: ['Email']
      },
      access: {
        readOnlyMode: true,
        customRoles: ['Junior Auditor', 'Senior Auditor']
      }
    }
  }
}
