require("dotenv").config();
const http = require("http");
const app = require("./src/app");
const socketio = require("socket.io");

const server = http.createServer(app);
const io = socketio(server, { cors: { origin: "*" } });

require("./src/sockets/tracking.socket")(io);

server.listen(5000, () => console.log("Server running on 5000"));
