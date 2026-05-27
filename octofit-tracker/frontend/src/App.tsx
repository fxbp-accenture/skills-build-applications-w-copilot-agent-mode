import React from 'react'
import { Routes, Route, NavLink } from 'react-router-dom'
import Users from './components/Users'
import Activities from './components/Activities'
import Teams from './components/Teams'
import Workouts from './components/Workouts'
import Leaderboard from './components/Leaderboard'

export default function App() {
  return (
    <div style={{ padding: 20 }}>
      <header>
        <h1>OctoFit Tracker</h1>
        <nav style={{ marginBottom: 12 }}>
          <NavLink to="/users" style={{ marginRight: 8 }}>Users</NavLink>
          <NavLink to="/teams" style={{ marginRight: 8 }}>Teams</NavLink>
          <NavLink to="/activities" style={{ marginRight: 8 }}>Activities</NavLink>
          <NavLink to="/workouts" style={{ marginRight: 8 }}>Workouts</NavLink>
          <NavLink to="/leaderboard">Leaderboard</NavLink>
        </nav>
      </header>

      <main>
        <Routes>
          <Route path="/" element={<div>Welcome to OctoFit Tracker</div>} />
          <Route path="/users" element={<Users />} />
          <Route path="/teams" element={<Teams />} />
          <Route path="/activities" element={<Activities />} />
          <Route path="/workouts" element={<Workouts />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
        </Routes>
      </main>
    </div>
  )
}
