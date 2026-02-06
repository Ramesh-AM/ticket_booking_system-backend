module.exports = (io) => {
  io.on("connection", socket => {
    socket.on("location:update", data => {
      io.emit("location:update", data);
    });
  });
};
