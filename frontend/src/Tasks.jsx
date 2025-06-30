import { useState, useEffect } from "react";

const today = new Date();

function formatDate(date) {
  return new Intl.DateTimeFormat("en-US", { weekday: "long" }).format(date);
}

function Tasks() {
  const [tasks, setTasks] = useState([]);
  const [newtask, setNewtask] = useState("");

  const fetchTasks = async () => {
    const res = await fetch("http://localhost:3000/task/1");
    const data = await res.json();
    setTasks(data);
  };
  useEffect(() => {
    fetchTasks();
  }, []);
  async function handleAddTasks(newtask) {
    const res = await fetch("http://localhost:3000/task", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: newtask,
        done: false,
        userid: "1",
      }),
    });
    if (res.ok) {
      fetchTasks();
      setNewtask("");
    } else console.log("error");
  }
  async function handleDone(id, done) {
    await fetch(`http://localhost:3000/task/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ done: !done }),
    });
    fetchTasks();
  }
  async function handleDelete(id) {
    const res = await fetch(`http://localhost:3000/task/${id}`, {
      method: "DELETE",
    });
    if (res.ok) {
      fetchTasks();
    } else {
      console.log("Failed to delete task");
    }
  }
  return (
    <div>
      ADD TASKS for {formatDate(today)}
      <br />
      <input
        value={newtask}
        onChange={(e) => setNewtask(e.target.value)}
        placeholder="Enter task name"
      />
      <button onClick={() => handleAddTasks(newtask)}
        disabled = {newtask.trim()===""}> SUBMIT </button>
      <ul>
        {tasks.map((tasks, i) => (
          <li key={tasks._id}>
            {tasks.done ? <del>{tasks.name}</del> : tasks.name}
            <button onClick={() => handleDone(tasks._id, tasks.done)}>
              Done
            </button>
            <button onClick={() => handleDelete(tasks._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Tasks;
