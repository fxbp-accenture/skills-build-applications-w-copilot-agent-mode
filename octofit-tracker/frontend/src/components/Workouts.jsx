import React, { useEffect, useState } from 'react'
import { WORKOUTS_API, parseListResponse } from './_api'

// Codespaces API endpoint: https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/workouts

export default function Workouts() {
  const [workouts, setWorkouts] = useState([])
  useEffect(() => {
    fetch(WORKOUTS_API)
      .then(res => parseListResponse(res))
      .then(list => setWorkouts(list))
      .catch(err => console.error(err))
  }, [])

  return (
    <div>
      <h2>Workouts</h2>
      {workouts.length === 0 ? <p>No workouts</p> : (
        <ul>
          {workouts.map(w => (
            <li key={w._id || w.id}>{w.title}</li>
          ))}
        </ul>
      )}
    </div>
  )
}
