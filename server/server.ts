import http from 'http';
import { Server as SocketIOServer, Socket } from 'socket.io';
import { MongoClient } from 'mongodb';

// Create HTTP server
const server = http.createServer();

// Create WebSocket server
const io = new SocketIOServer(server);

// Connect to MongoDB
const client = new MongoClient('mongodb+srv://oscarcaballero:TJl4LoFRVHvcpfqi@cluster-test.xyba2gy.mongodb.net/?retryWrites=true&w=majority&appName=cluster-test');

async function connectMongoDB() {
  await client.connect();
  console.log('Connected to MongoDB');

  const db = client.db('todosdb');
  const collection = db.collection('todos');

  // Watch for changes in the 'todos' collection
  const changeStream = collection.watch();

  // Handle change events
  changeStream.on('change', (change) => {
    console.log('Change:', change);

    // Broadcast the change to all connected clients
    io.emit('todoChange', change);
  });
}

connectMongoDB();

// Listen for WebSocket connections
io.on('connection', (socket: Socket) => {
  console.log('Client connected');
});

// Attach WebSocket server to HTTP server
io.attach(server);

// Start HTTP server
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`WebSocket server listening on port ${PORT}`);
});
