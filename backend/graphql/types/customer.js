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
    first_name: { type: new GraphQLNonNull(GraphQLString)},
    last_name: { type: new GraphQLNonNull(GraphQLString)},
    email: { type: new GraphQLNonNull(GraphQLString)},
    balance: { type: new GraphQLNonNull(GraphQLInt)},
    status: { type: new GraphQLNonNull(GraphQLInt)}
  })
})

module.exports = CustomerType
