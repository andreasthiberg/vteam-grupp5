import { useQuery, gql } from "@apollo/client";
import { Text, ScrollView, Button, View, StyleSheet } from 'react-native'
import { Base, Typography } from '../../styles';
import { useState, useEffect } from 'react';
import LundMap from "../map/LundMap";

export default function LundList (props) {
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

  const { data } = useQuery(SCOOTER_QUERY);

  useEffect(() => {
    setScooterData(data);
  }, [data])

  //console.log("query data:", data);

  useEffect(() => {
    if (data) {
    setScooters(data.scooters);

    const lundScooters = data.scooters
    .filter(item => item.city === "Lund")
    .filter(item => item.status == 2 || item.status == 3)

    const list = lundScooters
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
    <LundMap scooters={scooters} />
    <View style={styles.list}>
      <Text style={Typography.header2}>Available Scooters</Text>
      {scooterList}
    </View>
  </ScrollView>
);
}

const styles = StyleSheet.create({
list: {
marginTop: 400
}
})
