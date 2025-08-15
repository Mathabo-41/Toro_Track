const BASE_URL = '/api/auditor/assetStatus'

export async function fetchAssetStatus() {
  const res = await fetch(`${BASE_URL}/status`)
  if (!res.ok) throw new Error('Failed to load asset status')
  return res.json()
}

export async function fetchDocuments() {
  const res = await fetch(`${BASE_URL}/documents`)
  if (!res.ok) throw new Error('Failed to load documents')
  return res.json()
}

export async function fetchDigitalSignatures() {
  const res = await fetch(`${BASE_URL}/signatures`)
  if (!res.ok) throw new Error('Failed to load signatures')
  return res.json()
}
