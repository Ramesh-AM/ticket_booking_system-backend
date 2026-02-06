const approveTrip = async (req, res) => {
  const trip = await Trip.findByIdAndUpdate(
    req.params.tripId,
    { status: 'SCHEDULED' },
    { new: true }
  )

  res.json(trip)
}
module.exports = {
  approveTrip
}