// GraphQL type representing a scooter

const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLNonNull,
    GraphQLInt
  } = require('graphql')
  
  const ScooterReportType = new GraphQLObjectType({
    name: 'Scooter_report',
    description: 'This represents a scooter report with status and station id',
    fields: () => ({
      status: { type: new GraphQLNonNull(GraphQLInt) },
      station: { type: new GraphQLNonNull(GraphQLInt) }
    })
  })
  
  module.exports = ScooterReportType

  