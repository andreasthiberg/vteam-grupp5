import { useQuery, gql } from "@apollo/client";
import { Text, ScrollView, Button, View, StyleSheet } from 'react-native'
import { Base, Typography } from '../../styles';
import { useState, useEffect } from 'react';
import StockholmMap from "../map/StockholmMap";

export default function StoList (props) {
  // scooter graphql data
  const [scooterData, setScooterData] = useState([]);
  const [scooters, setScooters] = useState([]);
  // scooter button list
  const [scooterList, setScooterList] = useState([]);
  //const [stoScooters, setStoScooters] = useState([]);

  // gql query for parking zones
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

  // Creating each scooters as a button
  useEffect(() => {
    if (data) {
      setScooters(data.scooters);

      const stoScooters = data.scooters
      .filter(item => item.city === "Stockholm")
      .filter(item => item.status == 2 || item.status == 3);

      const list = stoScooters
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
        <StockholmMap scooters={scooters} />
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
