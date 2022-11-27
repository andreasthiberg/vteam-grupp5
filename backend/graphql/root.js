const {
    GraphQLObjectType,
    GraphQLString,
} = require('graphql');

const ScooterType = require('./types/scooter.js.js');

const scooterModel = require("../models/scooter.js")

const RootQueryType = new GraphQLObjectType({
    name: 'Query',
    description: 'Root Query',
    fields: () => ({
        scooters: {
            type: ScooterTypeGraphQLList(ScooterType),
            description: 'List of all scooters',
            resolve: async function(parent, args) {
                let scooterArray = await scooterModel.getAll()
    
                return documentArray.find(document => document._id.equals(args.documentId));
            }
        },
        scooter: {
            type: ScooterType,
            description: 'A single scooter',
            args: {
                documentId: { type: GraphQLString }
            },
            resolve: async function(parent, args) {
                let documentArray = await documents.getAll()
    
                return documentArray.find(document => document._id.equals(args.documentId));
            }
        }
    })
});

module.exports = RootQueryType;
