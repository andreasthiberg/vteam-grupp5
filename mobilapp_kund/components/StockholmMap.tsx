import { Text, View, StyleSheet } from "react-native";
import { Base, Typography } from '../styles';
import { useEffect, useState } from 'react';

import MapView, {Polygon} from 'react-native-maps';
import { Marker } from "react-native-maps";
import * as Location from 'expo-location';
import mapModel from '../models/maps';

import high5 from './../assets/high5_scooter_01small.png';
import parking from './../assets/p_small.png';


export default function StockholmMap() {
    console.log("....Stockholm Map....");

    async function testgetparkings ()  {
        const res = await mapModel.getParkings();
        return res;
    }
    
    console.log("testgetparkings........");
    console.log(testgetparkings());

    const scootersDefo = [{
        "id": "1",
        "status": "parked",
        "battery": "70",
        "pos": [59.317142429583875, 18.070672728790377]
        },{
        "id": "2",
        "status": "parked",
        "battery": "100",
        "pos": [59.324918452205495, 18.070050456306884]
        },
    ];

    const parkingsDefo = {
        "id": 1,
        "pos": "59.402724,17.939324",
        "city": "Stockholm"
      };

    // const [currentMarker, setCurrentMarker] = useState(null);
    // const [scooters, setScooters] = useState(scootersDefo);
    const [parkings, setParkings] = useState();
    // const scooterMarker = [];
    const parkingMarker = [];

    useEffect(() => {
        (async () => {
            const response = await mapModel.getParkings();
            console.log("response from model", response.parkings);

            setParkings(response.parkings);
            console.log("set parkings", parkings);
        })();
    }, []);

    if (parkings !== undefined) {
        console.log("set parkings", parkings);
    }

    // useEffect(() => {
    //     (async () => {
    //         const response = await mapModel.getScooters();

    //         setScooters(response.scooters);
    //     })();
    // }, []);

    // setting user's current location marker
    // useEffect(() => {
    //     (async () => {
    //         const { status } = await Location.requestForegroundPermissionsAsync();

    //         if (status !== 'granted') {
    //             setErrorMessage('Permission to access location was denied');
    //             return;
    //         }
    //         const currentLocation = await Location.getCurrentPositionAsync({});

    //         setCurrentMarker(<Marker
    //             coordinate={{
    //                 latitude: currentLocation.coords.latitude,
    //                 longitude: currentLocation.coords.longitude
    //             }}
    //             title="Current position"
    //             pinColor="red"
    //         />);
    //     })();
    // }, []);

    // setting scooter location markers
    // scooters.map((item, index) => {
    //     scooterMarker.push(
    //         <Marker
    //             coordinate={{
    //                 latitude: item.pos[0],
    //                 longitude: item.pos[1]
    //             }}
    //             title="Scooter"
    //             description={item.battery}
    //             key={index}
    //             image={high5}
    //         />
    //     );
    // });

    // setting parking location markers
    if (parkings !== undefined) {
        parkings.map((item, index) => {
            console.log("parking item", item);
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

    // setting parking zone markers
    const state = {
        coordinates: [
            { latitude: 59.317233, longitude: 18.053635 },
            { latitude: 59.317320, longitude: 18.066681 },
            { latitude: 59.313115, longitude: 18.068054 },
            { latitude: 59.312984, longitude: 18.058012 }
        ]
    };

    return (
        <View style={Base.base}>
            <Text style={Typography.header2}>Stockholm Map</Text>
            <View style={styles.container}>
                <MapView
                    style={styles.map}
                    initialRegion={{
                        latitude: 59.3293,
                        longitude: 18.0686,
                        latitudeDelta: 0.1,
                        longitudeDelta: 0.1,
                    }}>

                <Polygon
                    coordinates={state.coordinates}
                    strokeColor="blue"
                    fillColor="rgba(173,216,230, 0.3)"
                />
                {/* {scooterMarker} */}
                {parkingMarker}
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
    },
});
