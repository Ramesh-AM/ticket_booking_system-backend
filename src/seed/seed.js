const mongoose = require("mongoose");
const connectDB = require('../config/db.js')

const Route = require ('../models/Route.js')
const Bus = require ('../models/Bus.js')
const Trip = require ('../models/Trip.js')
const Booking = require ('../models/Booking.js')

const seedData = async () => {
  await connectDB()

  // Clean DB
  // await Route.deleteMany()
  // await Bus.deleteMany()
  // await Trip.deleteMany()
  // await Booking.deleteMany()

  console.log('🧹 Database cleared')

  // await Route.create({
  //   from: 'Chennai',
  //   to: 'Trichy',
  //   totalDistance: 330,
  //   expectedDuration: 360
  // })

  // await Bus.create({
  //   operator: 'SRM Travels',
  //   busNumber: 'TN01AB1234',
  //   type: 'AC Sleeper',
  //   totalSeats: 32,
  //   amenities: ['AC', 'WiFi'],
  //   driver: '',
  //   isActive: true
  // })

await Trip.create({
  routeId: '697856705453464337534d30',
  busId: '69785593c71738ae88af1302',
  journeyDate: '2026-01-24',
  departureTime: '22:30',
  arrivalTime: '04:30',
  fare: 850,
  availableSeats: 32
})

  // Booking
  // await Booking.create({
  //   userName: 'Ramesh',
  //   trip: null,
  //   seats: ['A1', 'A2'],
  //   amount: 1798
  // })

  console.log('✅ Sample data seeded successfully')
  process.exit()
}

seedData()
