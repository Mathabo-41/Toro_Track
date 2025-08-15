// features/admin/TeamsUsers/usersService.js

const BASE = '/api/users';

export async function getUsers() {
  const res = await fetch(BASE);
  if (!res.ok) throw new Error('Failed to load users');
  return res.json();
}

export async function createUser(payload) {
  const res = await fetch(BASE, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });
  if (!res.ok) throw new Error('Failed to create user');
  return res.json();
}

export async function updateUser({ id, ...payload }) {
  const res = await fetch(`${BASE}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });
  if (!res.ok) throw new Error('Failed to update user');
  return res.json();
}

export async function deleteUser(id) {
  const res = await fetch(`${BASE}/${id}`, { method: 'DELETE' });
  if (!res.ok) throw new Error('Failed to delete user');
  return res.json();
}
