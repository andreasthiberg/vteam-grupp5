import { View, Text, Button } from "react-native";
import { Base, Typography } from '../styles';
import { useState, useEffect } from 'react';
import ActivateBtn from './ActivateBtn';
import DeactivateBtn from './DeactivateBtn';

export default function RunScooter({ route, setRunning, setScooterId }) {
    //console.log("came to RunScooter:", route.params);
    const { item } = route.params;
    console.log("RunScooter: id, running, route.paramas::", item.id, route.params.running, item);

    return (
        <View style={Base.base}>
            <Text style={Typography.header2}>Run scooter</Text>
            <Text style={Typography.normal}>ID: {item.id}</Text>
            <Text style={Typography.normal}>Status: {item.status}</Text>
            <Text style={Typography.normal}>Battery: {item.battery}%</Text>
            
            {item.running ?
                <Text style={Typography.header3}>You have activated scooter</Text>
                :
                <ActivateBtn item={item.id} setRunning={setRunning} setScooterId={setScooterId} />
            }

            {/* <DeactivateBtn item={item.id} setRunning={setRunning} setScooterId={setScooterId} /> */}
        </View>
    )
}
