const mongoose = require('mongoose')

const busSchema = new mongoose.Schema({
  busNumber: String,
  operator: String,
  type: String,
  totalSeats: Number,
  amenities: [String],
  isActive: { type: Boolean, default: true }
}, { timestamps: true })

module.exports = mongoose.model('Bus', busSchema)
