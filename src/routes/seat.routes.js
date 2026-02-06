const router = require('express').Router()
const redis = require('../config/redis')
const { authenticate } = require("../middlewares/auth.middleware");

router.post('/lock', authenticate, async (req, res) => {
  const { tripId, seatNo } = req.body
  const key = `seat:${tripId}:${seatNo}`

  const locked = await redis.set(key, req.user.id, {
    NX: true,
    EX: 300   // 5 minutes
  })

  if (!locked) {
    return res.status(409).json({ message: 'Seat already locked' })
  }

  res.json({ message: 'Seat locked' })
})

router.post('/unlock', authenticate, async (req, res) => {
  const { tripId, seatNo } = req.body
  await redis.del(`seat:${tripId}:${seatNo}`)
  res.json({ message: 'Seat unlocked' })
})

module.exports = router