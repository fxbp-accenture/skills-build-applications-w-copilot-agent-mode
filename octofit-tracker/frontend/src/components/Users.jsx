import React, { useEffect, useState } from 'react'
import { USERS_API, parseListResponse } from './_api'

export default function Users() {
  const [users, setUsers] = useState([])
  useEffect(() => {
    fetch(USERS_API)
      .then(res => parseListResponse(res))
      .then(list => setUsers(list))
      .catch(err => console.error(err))
  }, [])

  return (
    <div>
      <h2>Users</h2>
      {users.length === 0 ? <p>No users</p> : (
        <ul>
          {users.map(u => (
            <li key={u._id || u.id}>{u.name || u.email}</li>
          ))}
        </ul>
      )}
    </div>
  )
}
