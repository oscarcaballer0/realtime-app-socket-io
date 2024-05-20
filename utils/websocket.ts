// Import necessary modules
import { Server as SocketIOServer } from "socket.io";
import http from "http";

// Create HTTP server
const server = http.createServer((req, res) => {
  // Handle HTTP requests (if needed)
});

// Create Socket.IO server
const io = new SocketIOServer(server, {
  /* Socket.IO options */
});

// Handle WebSocket connections
io.on("connection", (socket) => {
  console.log("New WebSocket connection");

  // Handle events (e.g., todo creation, updates, deletion)
  socket.on("todo_created", (todo) => {
    // Broadcast the new todo to all connected clients
    io.emit("todo_created", todo);
  });

  // Add more event handlers as needed
});

// Start server
const PORT = process.env.PORT || 4000;
server.listen(PORT, () => {
  console.log(`WebSocket server running on port ${PORT}`);
});
