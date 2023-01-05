import { View, Text, Button } from "react-native";
import { Base, Typography } from '../styles';
import { useState, useEffect } from 'react';
import ActivateBtn from './ActivateBtn';
import DeactivateBtn from './DeactivateBtn';

export default function RunScooter({ route, navigation }) {
    const { item } = route.params;
    const [running, setRunning] = useState(false);

    return (
        <View style={Base.base}>
            <Text style={Typography.header2}>Run scooter</Text>
            <Text style={Typography.normal}>ID: {item.id}</Text>
            <Text style={Typography.normal}>Status: {item.status}</Text>
            <Text style={Typography.normal}>Battery: {item.battery}%</Text>
            
            {running ?
                <Text style={Typography.header3}>You have activated scooter</Text>
                :
                <ActivateBtn item={item.id} setRunning={setRunning}/>
            }

            <DeactivateBtn item={item.id} setRunning={setRunning}/>
        </View>
    )
}
