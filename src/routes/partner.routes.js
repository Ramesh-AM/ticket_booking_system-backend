const router = require('express').Router()
//const auth = require('../middlewares/auth.middleware').authorize()
const Bus = require('../models/Bus')
const Route = require('../models/Route')
const Trip = require('../models/Trip')
//const Driver = require('../models/Driver')
const { updateSeatPricing, getPartnerEarnings } = require('../controllers/partner.controller')

//router.use(auth('PARTNER'))

router.post('/create/buses', async (req, res) => {
  res.json(await Bus.create({ ...req.body, operatorId: req.user.id }))
})
router.get('/buses', async (req, res) => {
  res.json(await Bus.find({ operatorId: req.user.id }))
})

router.post('/create/routes', async (req, res) => {
  res.json(await Route.create({ ...req.body, operatorId: req.user.id }))
})
router.get('/routes', async (req, res) => {
  res.json(await Route.find({ operatorId: req.user.id }))
})

// router.post('/create/drivers', async (req, res) => {
//   res.json(await Driver.create({ ...req.body, operatorId: req.user.id }))
// })
// router.get('/drivers', async (req, res) => {
//   res.json(await Driver.find({ operatorId: req.user.id }))
// })

router.post('/create/trips', async (req, res) => {
  res.json(await Trip.create({ ...req.body, operatorId: req.user.id }))
})
router.get('/trips', async (req, res) => {
  res.json(await Trip.find({ operatorId: req.user.id }).populate('routeId busId driverId'))
})

// ASSIGN DRIVER
router.put('/trips/:id/assign-driver', async (req, res) => {
  await Trip.findByIdAndUpdate(req.params.id, {
    driverId: req.body.driverId
  })
  res.json({ message: 'Driver assigned' })
})

router.patch('/trips/:tripId/pricing', updateSeatPricing, async (req, res) => {
  res.json({ message: 'Seat pricing updated', trip: req.trip })
})

router.get('/earnings', getPartnerEarnings, async (req, res) => {
  console.log('Earnings', req.earnings)
  res.json({ totalEarnings: req.earnings.total, bookingCount: req.earnings.count })
})

module.exports = router