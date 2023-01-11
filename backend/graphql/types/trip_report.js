// GraphQL type representing a finished scooter trip in log

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLNonNull,
  GraphQLInt
} = require('graphql')

const TripReportType = new GraphQLObjectType({
  name: 'trip_report',
  description: 'This represents a report of a finished scooter trip',
  fields: () => ({
    trip_id: { type: new GraphQLNonNull(GraphQLInt) },
    scooter_id: { type: new GraphQLNonNull(GraphQLInt) },
    customer_id: { type: new GraphQLNonNull(GraphQLInt) },
    start_time: { type: new GraphQLNonNull(GraphQLString) },
    end_time: { type: new GraphQLNonNull(GraphQLString) },
    start_pos: { type: new GraphQLNonNull(GraphQLString) },
    end_pos: { type: new GraphQLNonNull(GraphQLString) },
    city: { type: new GraphQLNonNull(GraphQLString) },
    price: { type: GraphQLInt },
    city_fee: { type: GraphQLInt },
    city_fee_per_min: { type: GraphQLInt },
    duration: { type: GraphQLInt },
    discount: { type: GraphQLInt },
    penalty: { type: GraphQLInt },
    new_scooter_status:  { type: GraphQLInt }
  })
})

module.exports = TripReportType
