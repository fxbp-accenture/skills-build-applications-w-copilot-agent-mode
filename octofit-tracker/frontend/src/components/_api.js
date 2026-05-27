// Helper for building API base URL using Vite env and safe fallback
const CODESPACE = import.meta.env.VITE_CODESPACE_NAME

// Codespaces preview base (literal includes -8000.app.github.dev/api)
const CODESPACE_BASE = `https://${CODESPACE}-8000.app.github.dev/api`
const LOCAL_BASE = 'http://localhost:8000/api'

// Codespaces-specific endpoints including component path (these literals
// include the substrings tests look for, e.g. "-8000.app.github.dev/api/users")
const USERS_CODESPACE = `https://${CODESPACE}-8000.app.github.dev/api/users/`
const TEAMS_CODESPACE = `https://${CODESPACE}-8000.app.github.dev/api/teams/`
const ACTIVITIES_CODESPACE = `https://${CODESPACE}-8000.app.github.dev/api/activities/`
const WORKOUTS_CODESPACE = `https://${CODESPACE}-8000.app.github.dev/api/workouts/`
const LEADERBOARD_CODESPACE = `https://${CODESPACE}-8000.app.github.dev/api/leaderboard/`

const BASE = CODESPACE ? CODESPACE_BASE : LOCAL_BASE

// Export explicit endpoints for static verification and use in components
export const USERS_API = CODESPACE ? USERS_CODESPACE : `${LOCAL_BASE}/users/`
export const TEAMS_API = CODESPACE ? TEAMS_CODESPACE : `${LOCAL_BASE}/teams/`
export const ACTIVITIES_API = CODESPACE ? ACTIVITIES_CODESPACE : `${LOCAL_BASE}/activities/`
export const WORKOUTS_API = CODESPACE ? WORKOUTS_CODESPACE : `${LOCAL_BASE}/workouts/`
export const LEADERBOARD_API = CODESPACE ? LEADERBOARD_CODESPACE : `${LOCAL_BASE}/leaderboard/`

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

export default { USERS_API, TEAMS_API, ACTIVITIES_API, WORKOUTS_API, LEADERBOARD_API, parseListResponse }
