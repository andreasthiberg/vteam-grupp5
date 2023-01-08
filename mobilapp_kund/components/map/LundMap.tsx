import { Text, View, StyleSheet } from "react-native";
import { Base, Typography } from '../../styles';
import MapView from 'react-native-maps';
// import { Marker } from "react-native-maps";


export default function LundMap() {
    return (
        <View style={Base.base}>
            <Text style={Typography.header2}>Lund Map</Text>
            <View style={styles.container}>
                <MapView
                    style={styles.map}
                    initialRegion={{
                        latitude: 55.7047,
                        longitude: 13.1910,
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
        flex: 0.5,
        height: 300,
    },
});
