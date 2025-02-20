import { gql } from "@apollo/client";

export const ADD_TASK = gql`
  mutation AddTask($title: String!, $description: String, $dueDate: String, $status: String, $priority: String) {
    addTask(title: $title, description: $description, dueDate: $dueDate, status: $status, priority: $priority) {
      id
      title
      description
      dueDate
      status
      priority
    }
  }
`;
