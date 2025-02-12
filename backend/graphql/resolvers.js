const Task = require("../models/taskModel");

const resolvers = {
  Query: {
    getTasks: async () => await Task.find(),
    getTask: async (_, { id }) => await Task.findById(id),
  },

  Mutation: {
    addTask: async (_, { title, description, dueDate, status, priority }) => {
      const task = new Task({ title, description, dueDate, status, priority });
      await task.save();
      return task;
    },

    updateTask: async (_, { id, ...updates }) => {
      return await Task.findByIdAndUpdate(id, updates, { new: true });
    },

    deleteTask: async (_, { id }) => {
      await Task.findByIdAndDelete(id);
      return "Task deleted successfully";
    }
  }
};

module.exports = resolvers;
