// Express server setup with GraphQL and Oauth

// Import packages
const express = require('express')
const { graphqlHTTP } = require('express-graphql')
const { GraphQLSchema } = require('graphql')
<<<<<<< HEAD
var bodyParser = require('body-parser');
var OAuthServer = require('express-oauth-server');
=======
const cors = require('cors')
>>>>>>> main
require('dotenv').config()

// Setup express server
const app = express()
const port = process.env.NODE_DOCKER_PORT || 3000

<<<<<<< HEAD
// OAuth implementation
app.oauth = new OAuthServer({
  model: {},
});
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(app.oauth.authorize());

const Request = OAuthServer.Request;
const Response = OAuthServer.Response;

let request = new Request({/*...*/}); 
let response = new Response({/*...*/});

=======
>>>>>>> main

// Setup GraphQL route with schema
const RootQueryType = require('./graphql/root_query.js')
const RootMutationType = require('./graphql/root_mutation.js')

const schema = new GraphQLSchema({
  query: RootQueryType,
  mutation: RootMutationType
})


app.use(express.json());


app.use(cors({
  origin: '*'
}));


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
