import { Router } from 'express'
import Leaderboard from '../models/leaderboard'

const router = Router()

router.get('/', async (req, res) => {
  const entries = await Leaderboard.find().sort({ points: -1 }).populate('user')
  res.json({ leaderboard: entries })
})

export default router
