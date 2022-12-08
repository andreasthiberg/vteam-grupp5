// Root query object for GraphQL API.

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt
} = require('graphql')

// Custom types
const ScooterType = require('./types/scooter.js')
const CustomerType = require('./types/customer.js')

// Models for database communication
const scooterModel = require('../models/scooter.js')
const customerModel = require('../models/customer.js')

const RootMutationType = new GraphQLObjectType({
  name: 'Mutation',
  description: 'Root Mutation',
  fields: () => ({
    addScooter: {
      type: ScooterType,
      description: 'Adds a new scooter',
      args: {
        id: { type: GraphQLInt }
      },
      resolve: async function (parent, args) {
        const result = await scooterModel.addScooter(args.id)
        return result
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
        console.log("Cykeluppdatering mottagen!");
        return("Hej!");
        const result = await scooterModel.updateScooter(args)
        return result
      }
    },
    addCustomer: {
      type: CustomerType,
      description: 'Adds a new customer',
      args: {
        firstName: { type: GraphQLString },
        lastName: { type: GraphQLString },
        email: { type: GraphQLString },
        balance: { type: GraphQLInt }   
      },
      resolve: async function (parent, args) {
        const result = await customerModel.addCustomer(firstName,lastName,email,balance)
        return result
      }
    },
    updateCustomer: {
      type: CustomerType,
      description: 'Updates a customer',
      args: {
        id: { type: GraphQLInt, required: true},
        firstName: { type: GraphQLString },
        lastName: { type: GraphQLString },
        email: { type: GraphQLString },
        balance: { type: GraphQLInt }   
      },
      resolve: async function (parent, args) {
        console.log(args);
        const result = await customerModel.updateCustomer(args)
        return result
      }
    }
  })
})

module.exports = RootMutationType
