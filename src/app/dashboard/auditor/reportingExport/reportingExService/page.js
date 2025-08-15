// Replace with your real API endpoint when available
export async function fetchReportingExportOptions() {
  const mock = {
    clients: ['All', 'Client A', 'Client B'],
    assetTypes: ['All', 'Type 1', 'Type 2', 'Type 3'],
    frequencies: ['Monthly', 'Quarterly']
  }
  return new Promise((resolve) => {
    setTimeout(() => resolve(mock), 300)
  })
}
