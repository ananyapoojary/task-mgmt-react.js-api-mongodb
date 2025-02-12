const express = require("express");
const mongoose = require("mongoose");
const Task = require("./models/task");

const app = express();
const port = 5000;

app.use(express.json());

// Add a new task
app.post("/tasks", async (req, res) => {
    try {
        const newTask = new Task(req.body);
        await newTask.save();
        res.status(201).json(newTask);  // Respond with the newly created task
    } catch (err) {
        res.status(500).json({ message: "Error adding task", error: err });
    }
});

// Fetch all tasks
app.get("/tasks", async (req, res) => {
    try {
        const tasks = await Task.find();
        res.json(tasks);
    } catch (err) {
        res.status(500).json({ message: "Error fetching tasks", error: err });
    }
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
    mongoose.connect("mongodb://localhost:27017/taskdb", { useNewUrlParser: true, useUnifiedTopology: true })
        .then(() => console.log("MongoDB connected"))
        .catch(err => console.log(err));
});
