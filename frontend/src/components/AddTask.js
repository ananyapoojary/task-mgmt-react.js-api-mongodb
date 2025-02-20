import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { ADD_TASK } from "../graphql/mutations";
import { GET_TASKS } from "../graphql/queries";

const AddTask = () => {
  const [task, setTask] = useState({ title: "", description: "", dueDate: "", status: "To-Do", priority: "Medium" });

  const [addTask] = useMutation(ADD_TASK, {
    refetchQueries: [{ query: GET_TASKS }],
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    addTask({ variables: task });
    setTask({ title: "", description: "", dueDate: "", status: "To-Do", priority: "Medium" });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" placeholder="Title" value={task.title} onChange={e => setTask({ ...task, title: e.target.value })} required />
      <textarea placeholder="Description" value={task.description} onChange={e => setTask({ ...task, description: e.target.value })}></textarea>
      <button type="submit">Add Task</button>
    </form>
  );
};

export default AddTask;
