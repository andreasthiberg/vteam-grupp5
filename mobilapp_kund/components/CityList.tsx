import { View, Button, Text } from 'react-native';
import { Typography } from '../styles';

export default function CityList({navigation}) {
    return (
        <View>
            <Text style={Typography.header2}>Please select your city</Text>
            <Button
                title="Stockholm"
                onPress={() => {
                    navigation.navigate('Stockholm');
                }}
            />
            <Button
                title="Malmö"
                onPress={() => {
                    navigation.navigate('Malmo');
                }}
            />
            <Button
                title="Lund"
                onPress={() => {
                    navigation.navigate('Lund');
                }}
            />

        </View>
    )
};
