import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CityList from './CityList';
// import ScooterList from './ScooterList';
import Info from './info/StoInfo';
import StoList from './list/StoList';
import MalmoList from './list/MalmoList';
import LundList from './list/LundList';

import MalmoMap from './map/MalmoMap.tsx';
import LundMap from './map/LundMap.tsx';
import { Text, View, StyleSheet } from "react-native";
import { Base, Typography } from '../styles';
import MapView from 'react-native-maps';
// import { Marker } from "react-native-maps";

const Stack = createNativeStackNavigator();

export default function Cities(props) {
    const running = props.running;
    const setRunning = props.setRunning;
    const setScooterId = props.setScooterId;
    const setScooters = props.setScooters;
    const scooters= props.scooters;

    return (
        <Stack.Navigator initialRouteName="CityList">
            
            <Stack.Screen name="CityList" component={CityList}>
            </Stack.Screen>

            <Stack.Screen name="Stockholm">
                {props => (
                    <Info
                        {...props}
                        setScooters={setScooters}
                        running={running}
                        setRunning={setRunning}
                        setScooterId={setScooterId}
                        scooters={scooters}
                    />
                )}
            </Stack.Screen>

            <Stack.Screen name="Malmo" component={MalmoList}>
            </Stack.Screen>

            <Stack.Screen name="Lund" component={LundList}>
            </Stack.Screen>

        </Stack.Navigator>
    );
};