import React from "react";
import { useQuery } from "@apollo/client";
import { GET_TASKS } from "../graphql/queries";

const TaskList = () => {
  const { loading, error, data } = useQuery(GET_TASKS);

  if (loading) return <p>Loading tasks...</p>;
  if (error) return <p>Error fetching tasks</p>;

  return (
    <div>
      <h2>Tasks</h2>
      <ul>
        {data.getTasks.map(task => (
          <li key={task.id}>
            <h3>{task.title}</h3>
            <p>{task.description}</p>
            <p>Due: {task.dueDate}</p>
            <p>Status: {task.status}</p>
            <p>Priority: {task.priority}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskList;
