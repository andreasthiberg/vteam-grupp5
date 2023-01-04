import { useQuery, gql, ApolloProvider } from "@apollo/client";
// import { SCOOTER_QUERY } from "./gql/Query";
import { Text, View, Button } from 'react-native'
import { Base, Typography } from '../styles';
import { useState, useEffect } from 'react';


export default function Scooters ({ route, navigation }) {
    const [scooters, setScooters] = useState([]);

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

    const { data } = useQuery(SCOOTER_QUERY);
    //console.log("query data:", data);
  
    useEffect(() => {
      if (data) {
          setScooters(data.scooters)
      }
    }, []);


    // if (scooters !== undefined) {
    //   console.log("scooters", scooters);
    // }

    const listOfScooters = scooters
        // .filter(item => item.status == 1)
        .map((item, index) => {
          //console.log("item", item);
            return <Button
                title="scooter"
                key={index}
                onPress={() => {
                    navigation.navigate('Details', {
                        item: item
                    });
                }}
            />
        });

    return (
      <View style={Base.base}>
        <Text style={Typography.header2}>Available Scooters</Text>
        {listOfScooters}
      </View>
    );
  }
  