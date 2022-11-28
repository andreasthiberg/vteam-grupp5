//GraphQL type representing a scooter

const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLNonNull
} = require('graphql');

const ScooterType = new GraphQLObjectType({
    name: 'Scooter',
    description: 'This represents a scooter',
    fields: () => ({
        _id: { type: new GraphQLNonNull(GraphQLString) },
        position: { type: new GraphQLNonNull(GraphQLString) }
    })
})

module.exports = ScooterType;
