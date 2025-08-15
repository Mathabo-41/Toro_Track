// Replace with your real API endpoints
export async function fetchProjectDetails(projectId) {
  const res = await fetch(`/api/client/projects/${projectId}`)
  if (!res.ok) throw new Error('Failed to load project details')
  return res.json()
}

export async function fetchProjectComments(projectId) {
  const res = await fetch(`/api/client/projects/${projectId}/comments`)
  if (!res.ok) throw new Error('Failed to load comments')
  return res.json()
}
