import { useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import {connectMongoDB} from '@/server/mongodb';

export default function Home() {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    const socket = io();

    // Listen for real-time changes from WebSocket server
    socket.on('todoChange', () => {
      fetchTodos();
    });

    // Fetch initial data
    fetchTodos();

    return () => {
      socket.disconnect();
    };
  }, []);

  const fetchTodos = async () => {
    try {
      const collection = await connectMongoDB()
      const todos = await collection.find().toArray();
      setTodos(todos);
    } catch (error) {
      console.error('Error fetching todos:', error);
    }
  };

  return (
    <div>
      <h1>Real-Time Todo List</h1>
      <ul>
        {todos.map((todo) => (
          <li key={todo._id}>{todo.text}</li>
        ))}
      </ul>
    </div>
  );
}
