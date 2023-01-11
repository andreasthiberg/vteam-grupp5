import { View, Text, Image } from 'react-native';
import { Base, Typography } from '../styles';
import high5 from './../assets/high5circle01.png';
import StopBtn from './StopBtn';
import DeactivateBtn from './DeactivateBtn';

export default function Home(props) {

    // Show text and button depands on user is activating a scooter or not
    const statusText = props.running ? (
        <>
            <Text style={Typography.header3}>You are using scooter ID: {props.scooterId}</Text>

            <DeactivateBtn item={props.scooterId} setRunning={props.setRunning} setScooterId={props.setScooterId}/>
        </>
    ) : (
        <>
            <Text style={Typography.header3}>Welcome {props.user.first_name}!</Text>
            <Text style={Typography.header4}>Select a scooter to start your journey.</Text>
        </>
    );

    return (
        <View style={Base.home}>
            <Text style={Typography.header2}>High5 Elsparkcyklar</Text>
            <Image source={high5} style={Base.image} />
            {statusText}
        </View>
    );
}