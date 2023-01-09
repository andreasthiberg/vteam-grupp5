// Root query object for GraphQL API.

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLFloat
} = require('graphql')


// Models for database communication
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
      type: GraphQLString,
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
      type: GraphQLInt,
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
    chargeScooter: {
      type: GraphQLString,
      description: 'Move a scooter to its closest charging station',
      args: {
        id: { type: GraphQLInt }
      },
      resolve: async function (root, args) {
        const result = await scooterModel.moveToClosestChargingStation(args.id);
        return "Scooter moved."
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
        console.log(args);
        await tripModel.addTrip(args)
        return "Trip added."
      }
    },
    endTrip: {
      type: GraphQLString,
      description: 'Ends a trip',
      args: {
        id: { type: GraphQLInt, required: true},
        scooter_id: { type: GraphQLInt},
        customer_id: { type: GraphQLInt },
        start_time: { type: GraphQLString },
        end_time: { type: GraphQLString },
        start_pos: { type: GraphQLString },
        end_pos: { type: GraphQLString },
        price: { type: GraphQLFloat }
      },
      resolve: async function (root, args) {
        const result = await tripModel.endTrip(args)
        // return result
        return "Trip ended"
      }
    }
  })
})

module.exports = RootMutationType
