const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

const app = express();
connectDB();

app.use(cors());
app.use(express.json());

app.use("/api/auth", require("./routes/auth.routes"));
app.use('/api/admin', require('./routes/admin.routes'));
app.use("/api/bookings", require("./routes/booking.routes"));
app.use('/api/seats', require('./routes/seat.routes'));
app.use('/api/search', require('./routes/search.routes'));
app.use('/api/trips', require('./routes/trip.routes'));
app.use('/api/partner', require('./routes/partner.routes'));

module.exports = app;