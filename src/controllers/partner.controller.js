const Booking = require('../models/Booking')
const Partner = require('../models/Partner')

const assignDriverToTrip = async (req, res) => {
  const { tripId } = req.params
  const { driverId } = req.body

  const trip = await Trip.findOneAndUpdate(
    { _id: tripId, partnerId: req.user._id },
    { driverId },
    { new: true }
  ).populate('driverId')

  if (!trip) return res.status(404).json({ message: 'Trip not found' })

  res.json(trip)
}

const updateSeatPricing = async (req, res) => {
  const { tripId } = req.params
  const { seater, sleeper } = req.body

  const trip = await Trip.findOneAndUpdate(
    { _id: tripId, partnerId: req.user._id },
    { seatPrices: { seater, sleeper } },
    { new: true }
  )

  res.json(trip)
}

const getPartnerEarnings = async (req, res) => {
  console.log('Calculating earnings for partner', req.user)
  const earnings = await Booking.aggregate([
    {
      $match: {
        partnerId: req.user._id,
        status: 'CONFIRMED'
      }
    },
    {
      $group: {
        _id: null,
        total: { $sum: '$amount' },
        count: { $sum: 1 }
      }
    }
  ])

  res.json(earnings[0] || { total: 0, count: 0 })
}

module.exports = {
  assignDriverToTrip,
  updateSeatPricing,
  getPartnerEarnings
}