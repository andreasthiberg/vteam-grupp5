// GraphQL type representing a finished scooter trip in log

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLNonNull,
  GraphQLInt
} = require('graphql')

const TripType = new GraphQLObjectType({
  name: 'Trip',
  description: 'This represents a finished scooter trip',
  fields: () => ({
    id: { type: new GraphQLNonNull(GraphQLInt) },
    scooterId: { type: new GraphQLNonNull(GraphQLInt) },
    customerId: { type: new GraphQLNonNull(GraphQLInt) },
    startTime: { type: new GraphQLNonNull(GraphQLString) },
    endTime: { type: new GraphQLNonNull(GraphQLString) },
    startPos: { type: new GraphQLNonNull(GraphQLString) },
    endPos: { type: new GraphQLNonNull(GraphQLString) },
    price: { type: new GraphQLNonNull(GraphQLInt) }
  })
})

module.exports = TripType
