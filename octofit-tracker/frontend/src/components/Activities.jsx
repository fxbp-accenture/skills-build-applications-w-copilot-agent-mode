import React, { useEffect, useState } from 'react'
import { ACTIVITIES_API, parseListResponse } from './_api'

// Codespaces API endpoint: https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/activities

export default function Activities() {
  const [activities, setActivities] = useState([])
  useEffect(() => {
    fetch(ACTIVITIES_API)
      .then(res => parseListResponse(res))
      .then(list => setActivities(list))
      .catch(err => console.error(err))
  }, [])

  return (
    <div>
      <h2>Activities</h2>
      {activities.length === 0 ? <p>No activities</p> : (
        <ul>
          {activities.map(a => (
            <li key={a._id || a.id}>{a.type} - {a.distanceKm ?? a.durationMinutes ?? ''}</li>
          ))}
        </ul>
      )}
    </div>
  )
}
