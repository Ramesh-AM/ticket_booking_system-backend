const router = require('express').Router()
const User = require('../models/User')
const Bus = require('../models/Bus')
const { approveTrip } = require('../controllers/admin.controller')

router.get('/users', async (req, res) => {
  const users = await User.find().select('-password')
  console.log('users', users)
  res.json(users)
})

router.patch('/users/:id/status', async (req, res) => {
  const user = await User.findByIdAndUpdate(
    req.params.id,
    { isActive: req.body.isActive },
    { new: true }
  )
  res.json(user)
})

router.get('/buses', async (req, res) => {
  const buses = await Bus.find()
  res.json(buses)
})

router.post('/buses', async (req, res) => {
  const bus = await Bus.create(req.body)
  res.status(201).json(bus)
})

router.patch('/buses/:id', async (req, res) => {
  const bus = await Bus.findByIdAndUpdate(req.params.id, req.body, { new: true })
  res.json(bus)
})

router.patch('/trips/:tripId/approve', approveTrip, async (req, res) => {
  res.json({ message: 'Trip approved', trip: req.trip })
})

module.exports = router