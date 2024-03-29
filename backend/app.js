// Express server setup with GraphQL and Oauth

// Import packages
const express = require('express')
const { graphqlHTTP } = require('express-graphql')
const { GraphQLSchema } = require('graphql')
const cors = require('cors')
const rateLimit = require('express-rate-limit')
require('dotenv').config()

const publicAPIModel = require('./models/publicAPI')

// Setup express server
const app = express()
const port = process.env.NODE_DOCKER_PORT || 3000

// Setup GraphQL route with schema
const RootQueryType = require('./graphql/root_query.js')
const RootMutationType = require('./graphql/root_mutation.js')

// Setup Public API route with schema
const RootQueryTypePublic = require('./graphql/root_public.js')

app.use(express.json())
app.use(cors())

let schema = new GraphQLSchema({
  query: RootQueryType,
  mutation: RootMutationType
})

// Add GraphQL route
app.use('/graphql', graphqlHTTP({
  schema,
  graphiql: true
}))


//Public API

schema = new GraphQLSchema({
  query: RootQueryTypePublic
})

// Limit to 900 requests per 15 minutes for public API

const placeHolderAPIKey = process.env.API_KEY

const apiLimiter = rateLimit({
	windowMs: 15 * 60 * 1000,
	max: 900, 
	standardHeaders: true, 
	legacyHeaders: false,
})

app.use('/v1/high5api',(req,res,next)=>{
  let ip = req.socket.remoteAddress;
  publicAPIModel.addLogEntry(ip)
  let key = req.query.api_key;
  if(key===placeHolderAPIKey){
    next()
  } else {
    res.send("Incorrect or no API key.")
  }
})

app.use('/v1/high5api',apiLimiter)

app.use('/v1/high5api', graphqlHTTP({
  schema,
  graphiql: true
}))





// Oauth router
const authRouter = require('./routes/auth')
app.use('/auth', authRouter)

// Index route
app.get('/', (req, res) => {
  res.json('Welcome to the High5 GraphQL API.')
})

// Start server
app.listen(port, () => console.log('Backend running.'))
