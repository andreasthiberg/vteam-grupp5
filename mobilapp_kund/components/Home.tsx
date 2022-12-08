import { StatusBar } from 'expo-status-bar';
import { View, Text, Image } from 'react-native';
import { Base, Typography } from '../styles';

export default function Home() {
    return (
        <View style={Base.base}>
            <Text style={Typography.header2}>High5 Elsparkcyklar app</Text>
        </View>
    );
}