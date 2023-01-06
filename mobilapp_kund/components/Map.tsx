import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CityList from './CityList';
import StockholmMap from './map/StockholmMap';
import MalmoMap from './map/MalmoMap.tsx';
import LundMap from './map/LundMap.tsx';
import { Text, View, StyleSheet } from "react-native";
import { Base, Typography } from '../styles';
import MapView from 'react-native-maps';
// import { Marker } from "react-native-maps";

const Stack = createNativeStackNavigator();

export default function ShowMap() {
    return (
        // <View style={Base.base}>
        //     <Text style={Typography.header2}>Select a city</Text>
        // </View>
        <Stack.Navigator initialRouteName="List">
            
            <Stack.Screen name="List" component={CityList}>
            </Stack.Screen>

            <Stack.Screen name="Stockholm" component={StockholmMap}></Stack.Screen>

            <Stack.Screen name="Malmo" component={MalmoMap}>
            </Stack.Screen>

            <Stack.Screen name="Lund" component={LundMap}>
            </Stack.Screen>

        </Stack.Navigator>
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