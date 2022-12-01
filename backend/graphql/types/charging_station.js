// GraphQL type representing a customer

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLNonNull,
  GraphQLInt
} = require('graphql')

const ChargingStationType = new GraphQLObjectType({
  name: 'ChargingStation',
  description: 'This represents a charging station',
  fields: () => ({
    id: { type: new GraphQLNonNull(GraphQLInt) },
    pos: { type: new GraphQLNonNull(GraphQLString) }
  })
})

module.exports = ChargingStationType
