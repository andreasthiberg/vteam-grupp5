import { useQuery, gql, ApolloProvider } from "@apollo/client";
import { SCOOTER_QUERY } from "./gql/Query";
import { Text, FlatList, Pressable } from 'react-native'


export default function HomeScreen() {

    const SCOOTER_QUERY = gql`
      query ScooterQuery {
        scooters {
          id
          pos
          status
          battery
          city
        }
      }
    `;

    const { data, loading } = useQuery(SCOOTER_QUERY, {
        fetchPolicy: 'network-only',
    });

    console.log("query data:", data);
  
    const ScooterItem = ({ scooter }) => {
      const { id, city, battery }  = scooter;

      return (
        <Pressable>
          <Text>{id}: {city}: {battery}%</Text>
        </Pressable>
      );
    };
  
    if (loading) {
      return <Text>Fetching data...</Text>
    }
  
    return (
        <FlatList
            data={data.scooters}
            renderItem={({ item }) => (
                <ScooterItem scooter={item} />
            )}
            keyExtractor={item => item.code}
        />
    );
  }

  