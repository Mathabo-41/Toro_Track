// Replace with your real API endpoints
export async function fetchProfile() {
  const res = await fetch('/api/client/settings/profile')
  if (!res.ok) throw new Error('Failed to load profile')
  return res.json()
}

export async function updateProfile(data) {
  const res = await fetch('/api/client/settings/profile', {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  })
  if (!res.ok) throw new Error('Failed to update profile')
  return res.json()
}

export async function updatePassword(data) {
  const res = await fetch('/api/client/settings/password', {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  })
  if (!res.ok) throw new Error('Failed to update password')
  return res.json()
}

export async function updateNotifications(data) {
  const res = await fetch('/api/client/settings/notifications', {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  })
  if (!res.ok) throw new Error('Failed to update notifications')
  return res.json()
}

export async function updatePreferences(data) {
  const res = await fetch('/api/client/settings/preferences', {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  })
  if (!res.ok) throw new Error('Failed to update preferences')
  return res.json()
}
