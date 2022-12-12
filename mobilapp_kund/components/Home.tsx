import { StatusBar } from 'expo-status-bar';
import { View, Text, Image } from 'react-native';
import { Base, Typography } from '../styles';
import high5 from './../assets/high5.png';

export default function Home() {
    return (
        <View style={Base.base}>
            <Text style={Typography.header2}>High5 Elsparkcyklar app</Text>
            {/* <Image source={high5} style={Base.image} /> */}
        </View>
    );
}