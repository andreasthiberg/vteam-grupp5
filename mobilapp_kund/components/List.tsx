import { View, Text } from 'react-native';
import { Base, Typography } from '../styles';
import Scooters from './Scooters';


export default function List() {

    return (
        <View style={Base.container}>
            <Text style={Typography.header2}>Scooter list</Text>
            <Scooters />
        </View>
      );
}
