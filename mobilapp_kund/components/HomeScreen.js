import { useQuery } from "@apollo/client";
import { CONTINENT_QUERY } from "./gql/Query";
import { Text, FlatList, Pressable } from 'react-native'


export default function HomeScreen() {
    const { data, loading } = useQuery(CONTINENT_QUERY);

    console.log("query data:", data);
  
    const ContinentItem = ({ continent }) => {
      const { name, code } = continent;
      return (
        <Pressable>
          <Text>{name}</Text>
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
            <ContinentItem continent={item.name} />
          )}
          keyExtractor={item => item.code}
        />
    );
  }
  