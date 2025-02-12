// Add a new task
const addTask = async () => {
    if (!newTask.title.trim()) return; // Prevent empty tasks
    try {
        // Send task data to backend API
        await axios.post("http://localhost:5000/tasks", newTask);

        // Update the state directly without fetching from the backend
        setTasks((prevTasks) => [
            ...prevTasks,
            { ...newTask, _id: Math.random().toString() } // Add new task to tasks state
        ]);

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
