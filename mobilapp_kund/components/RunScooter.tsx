import { View, Text, Button } from "react-native";
import { Base, Typography } from '../styles';
import ActivateBtn from './ActivateBtn';

export default function RunScooter({ route, navigation }) {
    const { item } = route.params;

    function deactivate () {
        console.log("deactivate scooter");
    }

    return (
        <View style={Base.base}>
            <Text style={Typography.header2}>Run scooter</Text>
            <Text style={Typography.normal}>ID: {item.id}</Text>
            <Text style={Typography.normal}>Status: {item.status}</Text>
            <Text style={Typography.normal}>Battery: {item.battery}</Text>
            <ActivateBtn item={item.id} />
            <Button title="Deactivate" onPress={deactivate}/>
        </View>
    )
}
