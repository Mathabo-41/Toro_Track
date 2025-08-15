// Contains all API calls related to profiles.

const API_BASE = '/api/profiles';

export async function getProfiles() {
  const res = await fetch(API_BASE);
  if (!res.ok) throw new Error('Failed to fetch profiles');
  return res.json();
}

export async function createProfile(payload) {
  const res = await fetch(API_BASE, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });
  if (!res.ok) throw new Error('Failed to create profile');
  return res.json();
}

export async function updateProfile({ id, ...payload }) {
  const res = await fetch(`${API_BASE}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });
  if (!res.ok) throw new Error('Failed to update profile');
  return res.json();
}

export async function deleteProfile(id) {
  const res = await fetch(`${API_BASE}/${id}`, {
    method: 'DELETE'
  });
  if (!res.ok) throw new Error('Failed to delete profile');
  return res.json();
}
