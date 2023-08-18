import { useState } from "react";
import { v4 as uuid } from "uuid";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import Task from "./components/task";

function App() {
  // set new task to change state
  const [newTask, setNewTask] = useState("");
  // set change in tasks to change state to refresh
  const [tasks, setTasks] = useState([]);

  const saved = false;

  // Set defult task structure and values
  const defaultTask = {
    id: uuid(),
    title: "",
    completed: false,
    note: null,
    closed: true,
    checked: false,
    saved: false,
  };

  // Here you can insert code to save ToDo list, on server or localy, up to you
  function saveTasks() {
    console.log("saving tasks");
  }

  // Function to update tasks state on any change
  function handleChange(newtask, insert = false, save = false) {
    // if some task values are not set, fill them with defaults
    if (insert) {
      Object.keys(defaultTask).map((key) => {
        newtask[key] = newtask[key] || defaultTask[key];
      });
      setTasks((currentTasks) => [...currentTasks, newtask]);

      saveTasks();
    } else {
      // Set changed task values
      setTasks((currentTasks) => {
        return currentTasks.filter((task) => {
          if (task.id === newtask.id) {
            Object.keys(newtask).map((key) => {
              task[key] = newtask[key];
            });
            if (!task.completed) {
              if (save) saveTasks();
              return { ...task };
            }
            if (save) saveTasks();
          } else {
            return task;
          }
        });
      });
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    handleChange({ title: newTask }, true);
    setNewTask("");
  }

  return (
    <div id="to-do-app">
      <h1>To Do</h1>
      <form className="form-group" onSubmit={handleSubmit}>
        <input
          id="input-field"
          className="input-field form-control"
          placeholder="Add task"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          tabIndex="0"
        />
        <button id="submit" className="btn btn-primary">
          Add
        </button>
      </form>
      <ul id="to-do-list" className="list-group">
        {/* Add a message if task list is empty */}
        {tasks.length === 0 && "No scheduled tasks"}
        {/* List tasks if there are any */}
        {tasks.map((task) => {
          return <Task key={task.id} task={task} callback={handleChange} />;
        })}
      </ul>
    </div>
  );
}

export default App;
