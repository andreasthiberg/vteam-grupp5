// Root query object for GraphQL API.

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLFloat
} = require('graphql')


// Models for database communication
const TripReportType = require('./types/trip_report.js')
const ScooterType = require('./types/scooter.js')
const ScooterReportType = require('./types/scooter_report.js')
const scooterModel = require('../models/scooter.js')
const customerModel = require('../models/customer.js')
const tripModel = require('../models/trip')


const RootMutationType = new GraphQLObjectType({
  name: 'Mutation',
  description: 'Root Mutation',
  fields: () => ({
    addScooter: {
      type: GraphQLString,
      description: 'Adds a new scooter',
      args: {
        pos: { type: GraphQLString },
        status: { type: GraphQLInt },
        battery: { type: GraphQLInt },
        city: { type: GraphQLString }
      },
      resolve: async function (root, args) {
        await scooterModel.addScooter(args)
        return "Scooter added."
      }
    },
    updateScooter: {
      type: ScooterType,
      description: 'Update a scooter',
      args: {
        id: { type: GraphQLInt },
        pos: { type: GraphQLString },
        status: { type: GraphQLInt },
        battery: { type: GraphQLInt }
      },
      resolve: async function (root, args) {
        const result = await scooterModel.updateScooter(args)
        return result
      }
    },
    reportScooter: {
      type: ScooterReportType,
      description: 'Update a scooter',
      args: {
        id: { type: GraphQLInt },
        pos: { type: GraphQLString },
        battery: { type: GraphQLInt }
      },
      resolve: async function (root, args) {
        const result = await scooterModel.reportScooter(args)
        return result
      }
    },
    addCustomer: {
      type: GraphQLString,
      description: 'Adds a new customer',
      args: {
        first_name: { type: GraphQLString},
        last_name: { type: GraphQLString },
        email: { type: GraphQLString },
        balance: { type: GraphQLInt }   
      },
      resolve: async function (parent, args) {
        await customerModel.addCustomer(args)
        return "Customer added."
      }
    },
    updateCustomer: {
      type: GraphQLString,
      description: 'Updates a customer',
      args: {
        id: { type: GraphQLInt, required: true},
        firstName: { type: GraphQLString },
        lastName: { type: GraphQLString },
        email: { type: GraphQLString },
        balance: { type: GraphQLInt }   
      },
      resolve: async function (root, args) {
        const result = await customerModel.updateCustomer(args)
        return result
      }
    },
    setCustomerStatus: {
      type: GraphQLString,
      description: 'Sets customer status',
      args: {
        id: { type: GraphQLInt, required: true},
        status: { type: GraphQLInt, required: true }   
      },
      resolve: async function (root, args) {
        const result = await customerModel.setCustomerStatus(args.id,args.status)
        return result
      }
    },
    addTrip: {
      type: GraphQLString,
      description: 'Adds a new trip',
      args: {
        scooter_id: { type: GraphQLInt},
        customer_id: { type: GraphQLInt },
        start_pos: { type: GraphQLString },
        city: { type: GraphQLString }
      },
      resolve: async function (root, args) {
        await tripModel.addTrip(args)
        return "Trip added."
      }
    },
    endTrip: {
      type: TripReportType,
      description: 'Ends a trip, returns info',
      args: {
        id: { type: GraphQLInt, required: true}
      },
      resolve: async function (root, args) {
        tripReport = await tripModel.endTrip(args)
        console.log(tripReport)
        return tripReport
      }
    }
  })
})

module.exports = RootMutationType
