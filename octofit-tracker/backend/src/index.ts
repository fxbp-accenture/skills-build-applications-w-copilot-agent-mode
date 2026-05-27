import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'

import usersRouter from './routes/users'
import teamsRouter from './routes/teams'
import activitiesRouter from './routes/activities'
import leaderboardRouter from './routes/leaderboard'
import workoutsRouter from './routes/workouts'

dotenv.config()

const app = express()
app.use(express.json())
app.use(cors())

const PORT = Number(process.env.PORT || 8000)
const MONGO = process.env.MONGODB_URI || undefined

import connectDB, { getMongoUri } from './config/database'

// Connect to MongoDB
connectDB(MONGO || getMongoUri())

// Mount API routers
app.use('/api/users', usersRouter)
app.use('/api/teams', teamsRouter)
app.use('/api/activities', activitiesRouter)
app.use('/api/leaderboard', leaderboardRouter)
app.use('/api/workouts', workoutsRouter)

// Root status
app.get('/', (req, res) => {
  res.json({ message: 'OctoFit Tracker backend running (port 8000).' })
})

// Codespaces-aware API URL support
app.get('/api/url', (req, res) => {
  const port = PORT
  const codespace = process.env.CODESPACE_NAME
  if (codespace) {
    // GitHub Codespaces preview URL pattern
    const url = `https://${codespace}-${port}.githubpreview.dev`
    return res.json({ apiUrl: url })
  }
  const local = `http://localhost:${port}`
  res.json({ apiUrl: local })
})

// Listen on all interfaces to support Codespaces port forwarding
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server listening on port ${PORT}`)
})
