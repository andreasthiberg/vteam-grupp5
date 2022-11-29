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
        scooter_id: { type: new GraphQLNonNull(GraphQLString) },
        scooter_pos: { type: new GraphQLNonNull(GraphQLString) }
    })
})

module.exports = ScooterType;
