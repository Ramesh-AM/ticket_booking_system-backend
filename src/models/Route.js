const mongoose = require('mongoose')

const routeSchema = new mongoose.Schema({
  from: String,
  to: String,
  totalDistance: Number,
  expectedDuration: Number
}, { timestamps: true })

module.exports = mongoose.model('Route', routeSchema)