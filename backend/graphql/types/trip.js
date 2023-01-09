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
    scooter_id: { type: new GraphQLNonNull(GraphQLInt) },
    customer_id: { type: new GraphQLNonNull(GraphQLInt) },
    start_time: { type: new GraphQLNonNull(GraphQLString) },
    end_time: { type: GraphQLString },
    start_pos: { type: new GraphQLNonNull(GraphQLString) },
    end_pos: { type: GraphQLString },
    city: { type: new GraphQLNonNull(GraphQLString) },
    price: { type: GraphQLInt }
  })
})

module.exports = TripType
