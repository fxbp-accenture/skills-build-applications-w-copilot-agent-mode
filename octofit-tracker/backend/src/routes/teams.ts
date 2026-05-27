import { Router } from 'express'
import Team from '../models/team'

const router = Router()

router.get('/', async (req, res) => {
  const teams = await Team.find().populate('members')
  res.json({ teams })
})

router.post('/', async (req, res) => {
  const team = new Team(req.body)
  await team.save()
  res.status(201).json({ team })
})

router.get('/:id', async (req, res) => {
  const team = await Team.findById(req.params.id).populate('members')
  if (!team) return res.status(404).json({ error: 'Not found' })
  res.json({ team })
})

export default router
