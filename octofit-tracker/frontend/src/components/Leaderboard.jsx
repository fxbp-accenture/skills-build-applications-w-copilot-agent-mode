import React, { useEffect, useState } from 'react'
import { LEADERBOARD_API, parseListResponse } from './_api'

// Codespaces API endpoint: https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/leaderboard

export default function Leaderboard() {
  const [entries, setEntries] = useState([])
  useEffect(() => {
    fetch(LEADERBOARD_API)
      .then(res => parseListResponse(res))
      .then(list => setEntries(list))
      .catch(err => console.error(err))
  }, [])

  return (
    <div>
      <h2>Leaderboard</h2>
      {entries.length === 0 ? <p>No leaderboard entries</p> : (
        <ol>
          {entries.map(e => (
            <li key={e._id || e.id}>{(e.user && (e.user.name || e.user.email)) || e.user} — {e.points}</li>
          ))}
        </ol>
      )}
    </div>
  )
}
