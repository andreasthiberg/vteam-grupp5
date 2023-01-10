import { useQuery, gql, ApolloProvider } from "@apollo/client";
import { Text, ScrollView, Button } from 'react-native'
import { Base, Typography } from '../styles';
import { useState, useEffect } from 'react';

export default function ScooterList (props) {
  const [scooterData, setScooterData] = useState([]);
  const [scooters, setScooters] = useState([]);
  const [scooterList, setScooterList] = useState([]);

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

  const { loading, error, data } = useQuery(SCOOTER_QUERY);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error.message}</p>

  useEffect(() => {
    setScooterData(data);
  }, [data])

  //console.log("query data:", data);

  useEffect(() => {
    if(data) {
    setScooters(data.scooters)
    const list = data.scooters
    .filter(item => item.status == 1)
    .map((item, index) => {
        return<Button
            title={`Scooter ID: ${item.id.toString()}`}
            key={index}
            onPress={() => {
              props.navigation.navigate('Details', {
                  item: item,
                  running: props.running,
                  setRunning: props.setRunning,
                  setScooterId: props.setScooterId,
              });
          }}
        />;
    });
    setScooterList(list);
    }
}, [scooterData]);

  return (
    <ScrollView style={Base.base}>
      <Text style={Typography.header2}>Available Scooters</Text>
      {scooterList}
    </ScrollView>
  );
}
