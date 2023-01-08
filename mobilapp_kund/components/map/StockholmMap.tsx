import { Text, View, StyleSheet } from "react-native";
import { Base, Typography } from '../../styles';
import { useEffect, useState } from 'react';

import MapView, {Polygon} from 'react-native-maps';
import { Marker } from "react-native-maps";
// import * as Location from 'expo-location';
import { useQuery, gql, ApolloProvider } from "@apollo/client";

import high5 from './../../assets/high5_scooter_01small.png';
import parking from './../../assets/p_small.png';


export default function StockholmMap() {
    
    // gql query for parking zones in Stockholm
    const STO_PARKING_QUERY = gql`
        query StoParkingQuery {
            parkingZones {
                id
                pos
                city
            }
        }
    `;

    // gql query for scooters in Stockholm
    const STO_SCOOTER_QUERY = gql`
        query StoScooterQuery {
            scooters {
                id
                pos
                status
                battery
                city
            }
        }
    `;

    const [scooters, setScooters] = useState([]);
    const [parkings, setParkings] = useState([]);
    const scooterMarker = [];
    const parkingMarker = [];

    const { data:parking_data } = useQuery(STO_PARKING_QUERY);
    //const parkings = parking_data.parkingZones;

    const { data:scooter_data } = useQuery(STO_SCOOTER_QUERY);
    //console.log("scooterdata:::", scooter_data);
    
    useEffect(() => {
        if (parking_data) {
            setParkings(parking_data.parkingZones);
        }
    }, []);

    //console.log("parking marker", parkingMarker);

    useEffect(() => {
        if (scooter_data) {
            setScooters(scooter_data.scooters)
        }
    }, []);

    // Setting scooter location markers
    if (scooters !== undefined) {
        scooters.map((item, index) => {
            const geo = item.pos.slice(1, -1).split(',');
            scooterMarker.push(
                <Marker
                    coordinate={{
                        latitude: geo[0],
                        longitude: geo[1]
                    }}
                    title="Scooter"
                    key={index}
                    image={high5}
                />
            );
        });
    }

    //console.log("scooters:", scooters);

    // Setting parking location markers
    if (parkings !== undefined) {
        parkings.map((item, index) => {
            const list = item.pos.split(',');
            parkingMarker.push(
                <Marker
                    coordinate={{
                        latitude: list[0],
                        longitude: list[1]
                    }}
                    title="Parking"
                    image={parking}
                    key={index}
                />
            );
        });
    }

    //console.log("scooter marker", scooterMarker)

    return (
        <View >
            {/* <Text style={Typography.header2}>Stockholm Map</Text> */}
            <View style={styles.container}>
                <MapView
                    style={styles.map}
                    initialRegion={{
                        latitude: 59.3293,
                        longitude: 18.0686,
                        latitudeDelta: 0.1,
                        longitudeDelta: 0.1,
                    }}>

                {/* <Polygon
                    coordinates={state.coordinates}
                    strokeColor="blue"
                    fillColor="rgba(173,216,230, 0.3)"
                /> */}
                {scooterMarker}
                {/* {parkingMarker} */}
                {/* {currentMarker} */}
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
        flex: 0.5,
        height: 300,
    },
});
