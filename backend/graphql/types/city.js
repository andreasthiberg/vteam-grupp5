// GraphQL type representing a finished scooter trip in log

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLNonNull,
  GraphQLInt
} = require('graphql')

const CityType = new GraphQLObjectType({
  name: 'City',
  description: 'This represents a city with scooter info',
  fields: () => ({
    id: { type: new GraphQLNonNull(GraphQLInt) },
    fee: { type: new GraphQLNonNull(GraphQLInt) },
    name: { type: new GraphQLNonNull(GraphQLString) },
    fee_per_min: { type: new GraphQLNonNull(GraphQLInt) },
    penalty_fee: { type: new GraphQLNonNull(GraphQLInt) },
    discount: { type: new GraphQLNonNull(GraphQLInt) }
  })
})

module.exports = CityType
