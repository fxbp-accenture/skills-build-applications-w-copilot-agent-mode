import React, { useEffect, useState } from 'react'
import { TEAMS_API, parseListResponse } from './_api'

// Codespaces API endpoint: https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/teams

export default function Teams() {
  const [teams, setTeams] = useState([])
  useEffect(() => {
    fetch(TEAMS_API)
      .then(res => parseListResponse(res))
      .then(list => setTeams(list))
      .catch(err => console.error(err))
  }, [])

  return (
    <div>
      <h2>Teams</h2>
      {teams.length === 0 ? <p>No teams</p> : (
        <ul>
          {teams.map(t => (
            <li key={t._id || t.id}>{t.name} ({(t.members && t.members.length) || 0})</li>
          ))}
        </ul>
      )}
    </div>
  )
}
