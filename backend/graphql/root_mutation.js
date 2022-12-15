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
        status: { type: GraphQLString },
        battery: { type: GraphQLInt }
      },
      resolve: async function (parent, args) {
        console.log("HEJ");
        const result = await scooterModel.addScooter(args)
        return "Scooter added."
      }
    },
    updateScooter: {
      type: GraphQLString,
      description: 'Update a scooter',
      args: {
        id: { type: GraphQLInt },
        pos: { type: GraphQLString },
        status: { type: GraphQLString },
        battery: { type: GraphQLInt }
      },
      resolve: async function (parent, args) {
        const result = await scooterModel.updateScooter(args)
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
      resolve: async function (parent, args) {
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
        start_time: { type: GraphQLString },
        end_time: { type: GraphQLString },
        start_pos: { type: GraphQLString },
        end_pos: { type: GraphQLString },
        price: { type: GraphQLFloat }
      },
      resolve: async function (parent, args) {
        const result = await tripModel.addTrip(args)
        return "Trip added."
      }
    },
    updateTrip: {
      type: GraphQLString,
      description: 'Updates a trip',
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
      resolve: async function (parent, args) {
        const result = await tripModel.updateTrip(args)
        return result
      }
    }
  })
})

module.exports = RootMutationType
