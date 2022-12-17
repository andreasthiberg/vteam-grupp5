// GraphQL type representing a scooter

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLNonNull,
  GraphQLInt
} = require('graphql')

const ScooterType = new GraphQLObjectType({
  name: 'Scooter',
  description: 'This represents a scooter',
  fields: () => ({
    id: { type: new GraphQLNonNull(GraphQLInt) },
    pos: { type: new GraphQLNonNull(GraphQLString) },
    status: { type: new GraphQLNonNull(GraphQLInt) },
    battery: { type: new GraphQLNonNull(GraphQLInt) }
  })
})

module.exports = ScooterType
