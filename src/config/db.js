const mongoose = require("mongoose");

module.exports = () => {
  mongoose.connect(process.env.MONGO_URI || "mongodb://localhost:27017/ticketing_system")
    .then(() => console.log("MongoDB connected"))
    .catch(err => console.error(err));
};
