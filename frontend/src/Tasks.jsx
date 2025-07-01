import { useState, useEffect } from "react";

const today = new Date();

function formatDate(date) {
  return new Intl.DateTimeFormat("en-US", {
    weekday: "long",
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  }).format(date);
}


function Tasks() {
  const [tasks, setTasks] = useState([]);
  const [newtask, setNewtask] = useState("");
  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    setTasks(savedTasks);
  }, []);
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  function handleAddTasks(taskName) {
    const newTaskObj = {
      id: Date.now(), 
      name: taskName,
      done: false,
    };
    setTasks((prev) => prev.concat(newTaskObj));
    setNewtask("");
  }

  function handleDone(id) {
    const updated = tasks.map((t) =>
      t.id === id ? { ...t, done: !t.done } : t
    );
    setTasks(updated);
  }

  function handleDelete(id) {
    const updated = tasks.filter((t) => t.id !== id);
    setTasks(updated);
  }

  return (
    <div>
      <h2>ADD TASKS </h2>
      <form
  onSubmit={(e) => {
    e.preventDefault(); // Prevent default form submission behavior
    if (newtask.trim() !== "") {
      handleAddTasks(newtask);
    }
  }}
>
      <input
        value={newtask}
        onChange={(e) => setNewtask(e.target.value)}
        placeholder="Enter task name"
      />

      <button
        onSubmit={() => handleAddTasks(newtask)}
        disabled={newtask.trim() === ""}
      >
        SUBMIT
      </button>
      </form>
      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
            {task.done ? <del>{task.name}</del> : task.name}
             | {formatDate(new Date(task.id))}
            <button onClick={() => handleDone(task.id)}>Done</button>
            <button onClick={() => handleDelete(task.id)}>Delete</button>
          
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Tasks;
