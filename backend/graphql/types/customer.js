// GraphQL type representing a customer

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLNonNull,
  GraphQLInt
} = require('graphql')

const CustomerType = new GraphQLObjectType({
  name: 'Customer',
  description: 'This represents a customer (user who rents scooters)',
  fields: () => ({
    id: { type: new GraphQLNonNull(GraphQLInt) },
    firstName: { type: GraphQLString},
    lastName: { type: GraphQLString},
    email: { type: GraphQLString},
    balance: { type: GraphQLInt}
  })
})

module.exports = CustomerType
