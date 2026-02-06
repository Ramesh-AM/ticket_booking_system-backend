const router = require('express').Router()
const Trip = require('../models/Trip')
const Route = require('../models/Route')

router.get('/', async (req, res) => {
  const { from, to, date } = req.query
  const route = await Route.findOne({
    from: new RegExp(`^${from}$`, 'i'),
    to: new RegExp(`^${to}$`, 'i')
  })

  if (!route) return res.json([])
    
  const trips = await Trip.find({
    routeId: route._id,
    journeyDate: date
  })
    .populate('busId')
    .populate('routeId')

  res.json(trips)
})

module.exports = router
