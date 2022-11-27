const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLNonNull
} = require('graphql');

const ScooterType = new GraphQLObjectType({
    name: 'Scooter',
    description: 'This represents a scooter',
    fields: () => ({
        _id: { type: GraphQLNonNull(GraphQLString) },
        position: { type: GraphQLNonNull(GraphQLString) }
    })
})

module.exports = ScooterType;
