// Root query object for GraphQL API.

const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLList,
    GraphQLInt
} = require('graphql');

const ScooterType = require('./types/scooter.js');
const UserType = require('./types/user.js');

const scooterModel = require("../models/scooter.js");
const userModel = require("../models/user.js");


let root = {
    
}
const RootQueryType = new GraphQLObjectType({
    name: 'Query',
    description: 'Root Query',
    fields: () => ({
        scooters: {
            type: new GraphQLList(ScooterType),
            description: 'List of all scooters',
            resolve: async function(parent, args) {
                let scooterArray = await scooterModel.getAll()
                return scooterArray;
            }
        },
        scooter: {
            type: ScooterType,
            description: 'A single scooter',
            args: {
                scooterId: { type: GraphQLInt }
            },
            resolve: async function(parent, args) {
                let scooterArray = await scooterModel.getAll();
                return scooterArray.find(document => scooter.scooter_id.equals(args.scooterId));
            }
        },
        apiTest: {
            type: GraphQLString,
            description: 'Rooute for testing GraphQL API',
            resolve: async function(parent, args) {
                return "You connected to the High5 GraphQL API! Good job!"
            }
        },
        user: {
            type: UserType,
            description: 'A single user',
            args: {
                userId: { type: GraphQLInt }
            },
            resolve: async function(parent, args) {
                let userArray = await userModel.getAll();
                return userArray.find(user => user.id.equals(args.userId));
            }
        },
        users: {
            type: new GraphQLList(UserType),
            description: 'List of all users',
            resolve: async function(parent, args) {
                let userArray = await userModel.getAll();
                return userArray;
            }
        },
    })
});

module.exports = RootQueryType;
