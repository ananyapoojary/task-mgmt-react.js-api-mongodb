import React, { useState, useEffect } from "react";
import axios from "axios";

// App Component
function App() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
    dueDate: "",
    status: "To-Do",
    priority: "Medium"
  });

  // Fetch tasks from the backend
  const fetchTasks = async () => {
    try {
      const response = await axios.get("http://localhost:5000/tasks");
      setTasks(response.data);  // Update state with tasks from backend
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  // Call fetchTasks on component mount
  useEffect(() => {
    fetchTasks();
  }, []);

  // Handle changes in the form
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewTask((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  // Add a new task
  const addTask = async () => {
    if (!newTask.title.trim()) return;  // Prevent empty tasks
    try {
      // Send task data to backend API
      const response = await axios.post("http://localhost:5000/tasks", newTask);
      
      // Update the state to include the newly added task
      setTasks((prevTasks) => [...prevTasks, response.data]);

      // Reset the new task form
      setNewTask({
        title: "",
        description: "",
        dueDate: "",
        status: "To-Do",
        priority: "Medium"
      });
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  // Render the tasks in a list
  return (
    <div className="App">
      <h1>Task Management</h1>
      
      {/* Task Form */}
      <div>
        <input
          type="text"
          name="title"
          placeholder="Task Title"
          value={newTask.title}
          onChange={handleInputChange}
        />
        <textarea
          name="description"
          placeholder="Task Description"
          value={newTask.description}
          onChange={handleInputChange}
        />
        <input
          type="date"
          name="dueDate"
          value={newTask.dueDate}
          onChange={handleInputChange}
        />
        <select
          name="status"
          value={newTask.status}
          onChange={handleInputChange}
        >
          <option value="To-Do">To-Do</option>
          <option value="In Progress">In Progress</option>
          <option value="Completed">Completed</option>
        </select>
        <select
          name="priority"
          value={newTask.priority}
          onChange={handleInputChange}
        >
          <option value="Medium">Medium</option>
          <option value="Low">Low</option>
          <option value="High">High</option>
        </select>
        <button onClick={addTask}>Add Task</button>
      </div>

      {/* Display Task List */}
      <div>
        <h2>Task List</h2>
        {tasks.length === 0 ? (
          <p>No tasks available</p>
        ) : (
          <ul>
            {tasks.map((task) => (
              <li key={task._id}>
                <h3>{task.title}</h3>
                <p>{task.description}</p>
                <p>Due: {task.dueDate}</p>
                <p>Status: {task.status}</p>
                <p>Priority: {task.priority}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default App;
