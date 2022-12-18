// GraphQL type representing a customer

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLNonNull,
  GraphQLInt
} = require('graphql')

const ParkingZoneType = new GraphQLObjectType({
  name: 'ParkingZone',
  description: 'This represents a parking zone',
  fields: () => ({
    id: { type: new GraphQLNonNull(GraphQLInt) },
    pos: { type: new GraphQLNonNull(GraphQLString) },
    city: { type: new GraphQLNonNull(GraphQLString) }
  })
})

module.exports = ParkingZoneType
