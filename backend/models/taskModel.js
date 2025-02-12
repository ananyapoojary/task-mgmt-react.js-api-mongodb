const mongoose = require("mongoose");

const TaskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  dueDate: { type: String },
  status: { type: String, enum: ["To-Do", "In Progress", "Completed"], default: "To-Do" },
  priority: { type: String, enum: ["Low", "Medium", "High"], default: "Medium" }
});

module.exports = mongoose.model("Task", TaskSchema);
