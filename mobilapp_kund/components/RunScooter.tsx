import { View, Text, Button } from "react-native";
import { Base, Typography } from '../styles';
import ActivateBtn from './ActivateBtn';
//import DeactivateBtn from './DeactivateBtn';

export default function RunScooter({ route, setRunning, setScooterId, user }) {
    //console.log("came to RunScooter:", route.params);
    const { item } = route.params;
    // console.log("RunScooter: route.paramas::", item);
    // console.log("RunScooter: user::", user);

    return (
        <View style={Base.base}>
            <Text style={Typography.header2}>Run scooter</Text>
            <Text style={Typography.normal}>Scooter ID: {item.id}</Text>
            <Text style={Typography.normal}>Status: {item.status}</Text>
            <Text style={Typography.normal}>Position: {item.pos}</Text>
            <Text style={Typography.normal}>Battery: {item.battery}%</Text>
            
            {item.running ?
                <Text style={Typography.header3}>You have activated scooter</Text>
                :
                <ActivateBtn setRunning={setRunning} setScooterId={setScooterId} start_pos={item.pos} scooter_id={item.id}  city={item.city} customer_id={user.id} />
            }

            {/* <DeactivateBtn item={item.id} setRunning={setRunning} setScooterId={setScooterId} /> */}
        </View>
    )
}
