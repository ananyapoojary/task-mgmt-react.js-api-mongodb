const express = require("express");
const Task = require("../models/taskModel"); // Import Task model
const router = express.Router();

// Get all tasks
router.get("/", async (req, res) => {
    try {
        const tasks = await Task.find();
        res.json(tasks);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Create a task
router.post("/", async (req, res) => {
    const task = new Task({
        title: req.body.title,
        completed: req.body.completed || false
    });
    try {
        const newTask = await task.save();
        res.status(201).json(newTask);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

module.exports = router;
