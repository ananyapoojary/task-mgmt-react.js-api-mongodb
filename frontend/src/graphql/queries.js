import { gql } from "@apollo/client";

export const GET_TASKS = gql`
  query {
    getTasks {
      id
      title
      description
      dueDate
      status
      priority
    }
  }
`;
