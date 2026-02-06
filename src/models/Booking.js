const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
  userId: mongoose.Schema.Types.ObjectId,
  tripId: mongoose.Schema.Types.ObjectId,
  partnerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  seats: [String],
  amount: Number,
  status: { 
    type: String,
    enum: ['CONFIRMED', 'CANCELLED', 'REFUNDED'],
    default: "CONFIRMED"
  }
}, { timestamps: true });

module.exports = mongoose.model("Booking", bookingSchema);