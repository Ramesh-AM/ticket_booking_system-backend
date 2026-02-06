const redis = require("../config/redis");

exports.lockSeats = async (tripId, seats, userId) => {
  for (const seat of seats) {
    const key = `seatlock:${tripId}:${seat}`;
    const locked = await redis.set(key, userId, { NX: true, EX: 300 });
    if (!locked) throw new Error(`Seat ${seat} already locked`);
  }
};

exports.releaseSeats = async (tripId, seats) => {
  for (const seat of seats) {
    await redis.del(`seatlock:${tripId}:${seat}`);
  }
};
