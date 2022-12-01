// Root query object for GraphQL API.

const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLList,
    GraphQLInt
} = require('graphql');

const ScooterType = require('./types/scooter.js');
const ScooterInputType = require('./types/scooter.js');

const scooterModel = require("../models/scooter.js");
const scooter = require('../models/scooter.js');

const RootMutationType = new GraphQLObjectType({
    name: 'Mutation',
    description: 'Root Mutation',
    fields: () => ({
        addScooter: {
            type: GraphQLString,
            description: 'Adds a new scooter',
            args: {
                id: { type: GraphQLInt}
            },
            resolve: async function(parent, args) {
                let id = args.id
                return 5
            }
        }
    })
});

module.exports = RootMutationType;
