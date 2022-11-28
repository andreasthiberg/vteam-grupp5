// Express server setup

// Import packages
const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const { GraphQLSchema } = require("graphql");
const mysql = require("mysql");
const dbConfig = require("./config/db.config");
require("dotenv").config();
  
// Setup express server
const app = express();
const port = process.env.NODE_DOCKER_PORT || 3000;

// Create db connection
const connection = mysql.createPool(dbConfig);

// Setup GraphQL route with schema
const RootQueryType = require("./graphql/root.js");
const schema = new GraphQLSchema({
    query: RootQueryType
});

// Add GraphQL route
app.use('/graphql', graphqlHTTP({
  schema: schema,
  graphiql: true,
}));
  
// Index route
app.get("/", (req, res) => {
  res.json("Welcome to the High5 GraphQL API.")
});

// Start server
app.listen(port, () => console.log("Listening on port " + port));