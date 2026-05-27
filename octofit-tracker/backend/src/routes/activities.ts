import { Router } from 'express'
import Activity from '../models/activity'

const router = Router()

router.get('/', async (req, res) => {
  const activities = await Activity.find().populate('user')
  res.json({ activities })
})

router.post('/', async (req, res) => {
  const activity = new Activity(req.body)
  await activity.save()
  res.status(201).json({ activity })
})

router.get('/:id', async (req, res) => {
  const activity = await Activity.findById(req.params.id).populate('user')
  if (!activity) return res.status(404).json({ error: 'Not found' })
  res.json({ activity })
})

export default router
