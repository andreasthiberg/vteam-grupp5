// Root query object for GraphQL API.

const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLList
} = require('graphql');

const ScooterType = require('./types/scooter.js');

const scooterModel = require("../models/scooter.js");
const scooter = require('../models/scooter.js');

const RootQueryType = new GraphQLObjectType({
    name: 'Query',
    description: 'Root Query',
    fields: () => ({
        scooters: {
            type: new GraphQLList(ScooterType),
            description: 'List of all scooters',
            resolve: async function(parent, args) {
                let scooterArray = await scooterModel.getAll()
                console.log(scooterArray);
                return scooterArray;
            }
        },
        scooter: {
            type: ScooterType,
            description: 'A single scooter',
            args: {
                scooterId: { type: GraphQLString }
            },
            resolve: async function(parent, args) {
                let scooterArray = await scooterModel.getAll();
                return scooterArray.find(document => scooter._id.equals(args.scooterId));
            }
        },
        apiTest: {
            type: GraphQLString,
            description: 'Rooute for testing GraphQL API',
            resolve: async function(parent, args) {
                return "You connected to the High5 GraphQL API!"
            }
        }
    })
});

module.exports = RootQueryType;
