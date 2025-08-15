// features/admin/SystemSettings/settingsService.js

const BASE = '/api/settings';

export async function getCategories() {
  const res = await fetch(`${BASE}/categories`);
  if (!res.ok) throw new Error('Failed to load settings categories');
  return res.json();
}

export async function updateCategory(payload) {
  const res = await fetch(`${BASE}/categories/${payload.id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });
  if (!res.ok) throw new Error('Failed to update category');
  return res.json();
}

export async function performMaintenance(action) {
  const res = await fetch(`${BASE}/maintenance?action=${action}`, { method: 'POST' });
  if (!res.ok) throw new Error(`Failed to perform ${action}`);
  return res.json();
}

export async function dangerousAction(action) {
  const res = await fetch(`${BASE}/dangerous?action=${action}`, { method: 'POST' });
  if (!res.ok) throw new Error(`Failed to execute ${action}`);
  return res.json();
}
