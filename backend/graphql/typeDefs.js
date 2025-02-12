const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type Task {
    id: ID!
    title: String!
    description: String
    dueDate: String
    status: String
    priority: String
  }

  type Query {
    getTasks: [Task]
    getTask(id: ID!): Task
  }

  type Mutation {
    addTask(title: String!, description: String, dueDate: String, status: String, priority: String): Task
    updateTask(id: ID!, title: String, description: String, dueDate: String, status: String, priority: String): Task
    deleteTask(id: ID!): String
  }
`;

module.exports = typeDefs;
