import { Text, View, StyleSheet } from "react-native";
import { Base, Typography } from '../../styles';
import { useEffect, useState } from 'react';

import MapView, {Polygon} from 'react-native-maps';
import { Marker } from "react-native-maps";
import { useQuery, gql, ApolloProvider } from "@apollo/client";

import high5 from './../../assets/high5_scooter_01small.png';
import charging from './../../assets/charging.png';
import parking from './../../assets/p_small.png';


export default function MalmoMap(props) {
    const sco = props.scooters;

    // charging stations states
    const [chargingData, setChargingData] = useState([]);
    const [chargings, setChargings] = useState([]);

    // parking zones states
    //const [parkingData, setParkingData] = useState([]);
    //const [parkings, setParkings] = useState([]);

    // lists for saving map markers
    const scooterMarker = [];
    const chargingMarker = [];
    //const parkingMarker = [];
    
    // gql query for parking zones
    const PARKING_QUERY = gql`
        query ParkingQuery {
            parkingZones {
                id
                pos
                city
            }
        }
    `;

    // gql query for charging stations
    const CHARGING_QUERY = gql`
        query ChargingQuery {
            chargingStations {
                id
                pos
                city
            }
        }
    `;

    const { data: charging_data } = useQuery(CHARGING_QUERY);
    //const { data: parking_data } = useQuery(PARKING_QUERY);

    
    useEffect(() => {
        setChargingData(charging_data);
    }, [charging_data]);

    useEffect(() => {
        if (charging_data) {
          setChargings(charging_data.chargingStations);
        }
    }, [chargingData]);

    // Set charging stations markers
    if (chargings !== undefined) {
        chargings
        .filter(item => item.city === "Lund")
        .map((item, index) => {
            console.log(item.pos.slice(1, -1).split(','));
            const geo = item.pos.slice(1, -1).split(',');
            chargingMarker.push(
                <Marker
                    coordinate={{
                        latitude: geo[0],
                        longitude: geo[1]
                    }}
                    title={`Charging station: ${item.id.toString()}`}
                    key={index}
                    image={charging}
                />
            );
        });
    }

    // Setting scooter location markers
    if (sco !== undefined) {
        sco
        .map((item, index) => {
            const geo = item.pos.slice(1, -1).split(',');
            scooterMarker.push(
                <Marker
                    coordinate={{
                        latitude: geo[0],
                        longitude: geo[1]
                    }}
                    title={`Scooter ID: ${item.id.toString()}`}
                    key={index}
                    image={high5}
                />
            );
        });
    }

    // Setting parking location markers
    // if (parkings !== undefined) {
    //     parkings.map((item, index) => {
    //         const list = item.pos.split(',');
    //         parkingMarker.push(
    //             <Marker
    //                 coordinate={{
    //                     latitude: list[0],
    //                     longitude: list[1]
    //                 }}
    //                 title="Parking"
    //                 image={parking}
    //                 key={index}
    //             />
    //         );
    //     });
    // }

    //console.log("scooter marker", scooterMarker)

    return (
        <View >
            {/* <Text style={Typography.header2}>Stockholm Map</Text> */}
            <View style={styles.container}>
                <MapView
                    style={styles.map}
                    initialRegion={{
                        latitude: 55.7047,
                        longitude: 13.1910,
                        latitudeDelta: 0.1,
                        longitudeDelta: 0.1,
                    }}>

                {/* <Polygon
                    coordinates={state.coordinates}
                    strokeColor="blue"
                    fillColor="rgba(173,216,230, 0.3)"
                /> */}
                {scooterMarker}
                {chargingMarker}
                {/* {parkingMarker} */}
                </MapView>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "flex-end",
        alignItems: "center",
    },
    map: {
        ...StyleSheet.absoluteFillObject,
        flex: 1,
        height: 400,
    },
});
