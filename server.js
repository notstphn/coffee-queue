const { createServer } = require("http");
const { Server } = require("socket.io");

const PORT = process.env.SOCKET_PORT || 3001;

const httpServer = createServer();
const io = new Server(httpServer, {
  cors: {
    origin: "*",
  },
});

io.on("connection", (socket) => {
  console.log(`socket connected: ${socket.id}`);

  socket.on("new-order", (order) => {
    // Broadcast incoming orders to every connected admin client.
    io.emit("new-order", order);
  });

  socket.on("disconnect", () => {
    console.log(`socket disconnected: ${socket.id}`);
  });
});

httpServer.listen(PORT, () => {
  console.log(`Socket.IO server listening on http://localhost:${PORT}`);
});
