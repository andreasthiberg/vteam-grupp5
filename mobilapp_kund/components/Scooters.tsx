import { useQuery, gql, ApolloProvider } from "@apollo/client";
import { SCOOTER_QUERY } from "./gql/Query";
import { Text, FlatList, Pressable } from 'react-native'


export default function HomeScreen() {

    const { data, error, loading } = useQuery(SCOOTER_QUERY, {
        fetchPolicy: 'network-only',
    });

    console.log("query data:", data, error);
  
    const ScooterItem = ({ scooter }) => {
      const { id } = scooter;
      return (
        <Pressable>
          <Text>{id}</Text>
        </Pressable>
      );
    };
  
    if (loading) {
      return <Text>Fetching data...</Text>
    }
  
    return (
        <FlatList
            data={data}
            renderItem={({ item }) => (
                <ScooterItem scooter={item.id} />
            )}
            keyExtractor={item => item.code}
        />
    );
  }

  