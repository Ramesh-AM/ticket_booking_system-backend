const mongoose = require('mongoose')

const partnerSchema = new mongoose.Schema({
  companyName: String,
  email: { type: String, unique: true },
  password: String,
  role: { type: String, default: 'PARTNER' }
}, { timestamps: true })

module.exports = mongoose.model('Partner', partnerSchema)