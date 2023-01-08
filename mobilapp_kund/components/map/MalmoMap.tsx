import MapView from 'react-native-maps';
import { Text, View, StyleSheet } from "react-native";
import { Base, Typography } from '../../styles';

export default function MalmoMap() {
    return (
        <View>
            {/* <Text style={Typography.header2}>Malmö Map</Text> */}
            <View style={styles.container}>
                <MapView
                    style={styles.map}
                    initialRegion={{
                        latitude: 55.6050,
                        longitude: 13.0038,
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
        flex: 1,
        height: 400,
    },
});