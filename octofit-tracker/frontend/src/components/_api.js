// Helper for building API base URL using Vite env and safe fallback
export function getApiBase() {
  const cs = import.meta.env.VITE_CODESPACE_NAME
  if (cs) return `https://${cs}-8000.app.github.dev/api`
  return 'http://localhost:8000/api'
}

// Normalize response to an array of items (supports paginated or object wrapper)
export async function parseListResponse(res) {
  const data = await res.json()
  if (Array.isArray(data)) return data
  // find first array in object
  for (const v of Object.values(data)) {
    if (Array.isArray(v)) return v
  }
  // support common `items` field
  if (Array.isArray(data.items)) return data.items
  return []
}

export default { getApiBase, parseListResponse }
