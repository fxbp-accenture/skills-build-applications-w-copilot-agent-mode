// Seed the octofit_db database with test data
// Run with: npx ts-node src/scripts/seed.ts

import mongoose from 'mongoose'
import dotenv from 'dotenv'
import User from '../models/user'
import Team from '../models/team'
import Activity from '../models/activity'
import Workout from '../models/workout'
import Leaderboard from '../models/leaderboard'

dotenv.config()

const MONGO = process.env.MONGODB_URI_SEED || 'mongodb://localhost:27017/octofit_db'

async function seed() {
  console.log('Seed the octofit_db database with test data')
  await mongoose.connect(MONGO)

  // Clear existing data
  await Promise.all([
    User.deleteMany({}),
    Team.deleteMany({}),
    Activity.deleteMany({}),
    Workout.deleteMany({}),
    Leaderboard.deleteMany({})
  ])

  // Create users
  const users = await User.create([
    { name: 'Alice Rivera', email: 'alice@example.com' },
    { name: 'Ben Turner', email: 'ben@example.com' },
    { name: 'Chi Zhang', email: 'chi@example.com' }
  ])

  // Create teams
  const teamA = await Team.create({ name: 'Octo Runners', members: [users[0]._id, users[1]._id] })
  const teamB = await Team.create({ name: 'Sea Sprinters', members: [users[2]._id] })

  // Assign teams to users
  await User.findByIdAndUpdate(users[0]._id, { team: teamA._id })
  await User.findByIdAndUpdate(users[1]._id, { team: teamA._id })
  await User.findByIdAndUpdate(users[2]._id, { team: teamB._id })

  // Create activities
  const activities = await Activity.create([
    { user: users[0]._id, type: 'run', distanceKm: 5.0, durationMinutes: 28, calories: 320 },
    { user: users[1]._id, type: 'cycle', distanceKm: 20.5, durationMinutes: 60, calories: 700 },
    { user: users[2]._id, type: 'swim', distanceKm: 1.2, durationMinutes: 45, calories: 500 }
  ])

  // Create workouts
  const workouts = await Workout.create([
    { title: 'Quick HIIT', description: '20 minute high-intensity interval training', exercises: [{ name: 'Burpees', reps: 15 }, { name: 'Jump Squats', reps: 20 }], difficulty: 'medium', createdBy: users[0]._id },
    { title: 'Endurance Ride', description: '60 minute steady state cycling', exercises: [{ name: 'Cycling', durationSec: 3600 }], difficulty: 'hard', createdBy: users[1]._id }
  ])

  // Create leaderboard entries (simple points)
  await Leaderboard.create([
    { user: users[1]._id, points: 120 },
    { user: users[0]._id, points: 95 },
    { user: users[2]._id, points: 80 }
  ])

  console.log('Seed completed:')
  console.log('Users:', users.map(u => ({ id: u._id, name: u.name })))
  console.log('Teams:', [teamA.name, teamB.name])
  console.log('Activities:', activities.length)
  console.log('Workouts:', workouts.length)

  await mongoose.disconnect()
}

seed().catch(err => {
  console.error('Seed error:', err)
  process.exit(1)
})
