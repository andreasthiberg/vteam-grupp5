import { useQuery, gql, ApolloProvider } from "@apollo/client";
import { Text, ScrollView, Button } from 'react-native'
import { Base, Typography } from '../styles';
import { useState, useEffect } from 'react';

export default function Scooters (props) {
  const [scooters, setScooters] = useState([]);
  //console.log("came to ScooterList:", props);
  //console.log("came to Run:", running, setRunning);
  //receiving 3 props(running, setRunning, setScooterId)


  //console.log("ScooterList: running::", props.running);

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

  // if (reload) {
  //   reloadScooters();
  // }

  // async function reloadScooters() {
  //   const { data } = useQuery(SCOOTER_QUERY);
  //   setScooters(data.scooters);
  // }

  // //const { navigate } = props.navigation;
  const { data } = useQuery(SCOOTER_QUERY);
  // //console.log("query data:", data);

  // useEffect(() => {
  //   reloadScooters();
  // }, []);

  useEffect(() => {
    if (data) {
        setScooters(data.scooters)
    }
  }, []);


  const listOfScooters = scooters
      //.filter(item => item.status == 1)
      .map((item, index) => {
        //console.log("item", item);
          return <Button
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
          />
      });



  return (
    <ScrollView style={Base.base}>
      <Text style={Typography.header2}>Available Scooters</Text>
      {listOfScooters}
    </ScrollView>
  );
}
