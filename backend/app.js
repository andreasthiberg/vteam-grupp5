// Express server setup with GraphQL and Oauth

// Import packages
const express = require('express')
const { graphqlHTTP } = require('express-graphql')
const { GraphQLSchema } = require('graphql')
const cors = require('cors')
require('dotenv').config()

// Setup express server
const app = express()
const port = process.env.NODE_DOCKER_PORT || 3000

// Setup GraphQL route with schema
const RootQueryType = require('./graphql/root_query.js')
const RootMutationType = require('./graphql/root_mutation.js')

const schema = new GraphQLSchema({
  query: RootQueryType,
  mutation: RootMutationType
})

app.use(express.json());
app.use(cors());

// Add GraphQL route
app.use('/graphql', graphqlHTTP({
  schema,
  graphiql: true
}))

// Oauth router
const authRouter = require('./routes/auth');
app.use('/auth', authRouter);

// Index route
app.get('/', (req, res) => {
  res.json('Welcome to the High5 GraphQL API.')
})



// Start server
app.listen(port, () => console.log('Listening on port ' + port))
