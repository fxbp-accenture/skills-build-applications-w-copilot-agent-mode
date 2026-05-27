import React, { useEffect, useState } from 'react'
import { getApiBase, parseListResponse } from './_api'

export default function Teams() {
  const [teams, setTeams] = useState([])
  useEffect(() => {
    const base = getApiBase()
    fetch(`${base}/teams/`)
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
