import { View, Text } from 'react-native';
import { Base, Typography } from '../styles';
// import { gql, useQuery } from '@apollo/client';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
// import HomeScreen from './HomeScreen';
import Scooters from './Scooters';


// Initialize Apollo Client
const client = new ApolloClient({
    uri: 'https://localhost:3000/graphql/',
    cache: new InMemoryCache(),
});

// Tested with another uri and it worked.
// const client = new ApolloClient({
//     uri: 'https://countries.trevorblades.com/graphql',
//     cache: new InMemoryCache()
// });


export default function List() {

    return (
        <ApolloProvider client={client}>
            <View style={Base.container}>
            <Text style={Typography.header2}>Scooter list</Text>
            <Scooters />
            {/* <HomeScreen /> */}
            </View>
        </ApolloProvider>
      );
}


// https://github.com/apollographql/react-apollo/issues/1228