import React, { useEffect, useState } from 'react'
import { getApiBase, parseListResponse } from './_api'

export default function Workouts() {
  const [workouts, setWorkouts] = useState([])
  useEffect(() => {
    const base = getApiBase()
    fetch(`${base}/workouts/`)
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
