import { StatusBar } from 'expo-status-bar';
import { View, Text, Image } from 'react-native';
import { Base, Typography } from '../styles';
import high5 from './../assets/high5circle01.png';
import DeactivateBtn from './DeactivateBtn';

export default function Home(props) {

    
    const statusText = props.running ? (
        <>
            <Text style={Typography.header3}>You are using scooter ID: {props.scooterId}</Text>

            <DeactivateBtn item={props.scooterId} setRunning={props.setRunning} setScooterId={props.setScooterId}/>
        </>
    ) : (
        <Text>Welcome! Select a scooter to start your journey.</Text>
    );

    return (
        <View style={Base.home}>
            <Text style={Typography.header2}>High5 Elsparkcyklar app</Text>
            <Image source={high5} style={Base.image} />
            {/* <Text style={Typography.normal}>You are using scooter: {props.scooterId}</Text> */}
            {statusText}
        </View>
    );
}