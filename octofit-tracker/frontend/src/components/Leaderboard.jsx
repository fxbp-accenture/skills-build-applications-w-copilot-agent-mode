import React, { useEffect, useState } from 'react'
import { getApiBase, parseListResponse } from './_api'

export default function Leaderboard() {
  const [entries, setEntries] = useState([])
  useEffect(() => {
    const base = getApiBase()
    fetch(`${base}/leaderboard/`)
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
