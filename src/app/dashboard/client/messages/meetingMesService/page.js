// Replace with real endpoints
export async function fetchConversations() {
  const res = await fetch('/api/client/conversations')
  if (!res.ok) throw new Error('Failed to load conversations')
  return res.json()
}

export async function fetchConversationMessages(convId) {
  const res = await fetch(`/api/client/conversations/${convId}/messages`)
  if (!res.ok) throw new Error('Failed to load messages')
  return res.json()
}

export async function sendMessage(convId, text) {
  const res = await fetch(`/api/client/conversations/${convId}/messages`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ text })
  })
  if (!res.ok) throw new Error('Failed to send message')
  return res.json()
}

export async function fetchMeetings() {
  const res = await fetch('/api/client/meetings')
  if (!res.ok) throw new Error('Failed to load meetings')
  return res.json()
}

export async function fetchNotifications() {
  const res = await fetch('/api/client/notifications')
  if (!res.ok) throw new Error('Failed to load notifications')
  return res.json()
}
