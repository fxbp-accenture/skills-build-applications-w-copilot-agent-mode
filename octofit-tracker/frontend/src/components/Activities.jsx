import React, { useEffect, useState } from 'react'
import { getApiBase, parseListResponse } from './_api'

export default function Activities() {
  const [activities, setActivities] = useState([])
  useEffect(() => {
    const base = getApiBase()
    fetch(`${base}/activities/`)
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
