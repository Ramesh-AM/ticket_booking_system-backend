const router = require("express").Router();
const Booking = require("../models/Booking");
const seatLock = require("../services/seatLock.service");
const { authenticate } = require("../middlewares/auth.middleware");

router.post("/lock", authenticate, async (req, res) => {
  try {
    await seatLock.lockSeats(req.body.tripId, req.body.seats, req.userId);
    res.json({ message: "Seats locked" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.post("/confirm", authenticate, async (req, res) => {
  const booking = await Booking.create({
    userId: req.user.id,
    ...req.body
  });

  await seatLock.releaseSeats(req.body.tripId, req.body.seats);
  res.json(booking);
});

router.post('/:id/cancel', authenticate, async (req, res) => {
  const booking = await Booking.findById(req.params.id)

  if (!booking) return res.sendStatus(404)
  if (booking.userId.toString() !== req.user.id) return res.sendStatus(403)

  booking.status = 'CANCELLED'
  await booking.save()

  // Simulated refund
  setTimeout(async () => {
    booking.status = 'REFUNDED'
    await booking.save()
  }, 3000)

  res.json({ message: 'Cancellation initiated' })
})

module.exports = router;
