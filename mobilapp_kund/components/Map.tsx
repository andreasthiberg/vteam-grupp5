import { Text, View, StyleSheet } from "react-native";
import { Base, Typography } from '../styles';
import MapView from 'react-native-maps';
// import { Marker } from "react-native-maps";


export default function ShowMap() {
    return (
        <View style={Base.base}>
            <Text style={Typography.header2}>City Map</Text>
            <View style={styles.container}>
                <MapView
                    style={styles.map}
                    initialRegion={{
                        latitude: 56.1612,
                        longitude: 15.5869,
                        latitudeDelta: 0.1,
                        longitudeDelta: 0.1,
                    }}>
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
