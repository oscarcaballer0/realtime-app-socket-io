import { useEffect, useState } from "react";
import { Todo } from "../utils/types";
import Link from "next/link";
import { io } from "socket.io-client";

// Define the components props
interface IndexProps {
  todos: Array<Todo>;
}

// define the page component
function Index(props: IndexProps) {
  const { todos } = props;
  const [todosArray, setTodosArray] = useState(todos)
  
  const socketInitializer = () => {
    fetch("/api/socket")
      .then(() => {
        let socket = io();

        socket.on("connect", () => {
          console.log("connected");
        });

        socket.on('update-input', (msg: any) => {
          setTodosArray((prev) => {
            return [
              ...prev,
              {...msg}
            ]
          })
        })
      })
      .catch((error) => {
        console.error("Error initializing socket:", error);
      });
  };

  useEffect(() => socketInitializer(), []);

  return (
    <div>
      <h1>My Todo List</h1>
      <h2>Click On Todo to see it individually</h2>
      <Link href="/todos/create">
        <button>Create a New Todo</button>
      </Link>
      {/* MAPPING OVER THE TODOS */}
      {todosArray.map((t) => (
        <div key={t._id}>
          <Link href={`/todos/${t._id}`}>
            <h3 style={{ cursor: "pointer" }}>
              {t.item} - {t.completed ? "completed" : "incomplete"}
            </h3>
          </Link>
        </div>
      ))}
    </div>
  );
}

// GET PROPS FOR SERVER SIDE RENDERING
export async function getServerSideProps() {
  // get todo data from API
  const res = await fetch(process.env.API_URL as string);
  const todos = await res.json();

  // return props
  return {
    props: { todos },
  };
}

export default Index;
