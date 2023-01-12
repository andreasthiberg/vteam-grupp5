// GraphQL type representing a finished scooter trip in log

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLNonNull,
} = require('graphql')

const LogEntryType = new GraphQLObjectType({
  name: 'API_log_entry',
  description: 'This represents an entry into the piublic API usage log',
  fields: () => ({
    ip: { type: new GraphQLNonNull(GraphQLString) },
    time: { type: new GraphQLNonNull(GraphQLString) }
  })
})

module.exports = LogEntryType
