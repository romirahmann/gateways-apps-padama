let io;
let realtimeData = { message: "Connection Socket Succesfully!" };

function init(server) {
  io = require("socket.io")(server, {
    cors: {
      origin: "*",
      method: ["GET", "POST", "PUT", "DELETE"],
      allowedHeaders: ["Content-Type", "Authorization"],
    },
  });
  io.on("connection", (socket) => {
    console.log("🔌 WebSocket client connected:", socket.id);
    socket.emit("update_data", realtimeData);
    socket.on("data_changed", (newData) => {
      realtimeData = newData;
      socket.broadcast.emit("update_data", realtimeData);
    });
    socket.on("disconnect", () => {
      console.log("🔌 WebSocket client connected:", socket.id);
    });
  });

  return io;
}

function getIo() {
  if (!io) throw new Error("Socket.io not initialized!");
  return io;
}

module.exports = { init, getIo };
