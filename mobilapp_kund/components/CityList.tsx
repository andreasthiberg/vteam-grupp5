import { View, Button, Text } from 'react-native';
import { Typography, Base } from '../styles';

export default function CityList({ navigation }) {
    return (
        <View style={Base.base}>
            <Text style={Typography.header2}>Please select your city</Text>
            <View style={Base.btn3}>
                <Button 
                    title="Stockholm"
                    onPress={() => {
                        navigation.navigate('Stockholm');
                    }}
                    color='white'
                />
            </View>
            <View style={Base.btn3}>
                <Button
                    title="Malmö"
                    onPress={() => {
                        navigation.navigate('Malmo');
                    }}
                    color='white'
                />
            </View>
            <View style={Base.btn3}>
                <Button
                    title="Lund"
                    onPress={() => {
                        navigation.navigate('Lund');
                    }}
                    color='white'
                />
            </View>

        </View>
    )
};
