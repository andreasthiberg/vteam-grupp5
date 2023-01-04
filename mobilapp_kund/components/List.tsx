import ScooterList from './ScooterList';
import RunScooter from './RunScooter';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();


export default function List() {
    return (
        <Stack.Navigator initialRouteName="Scooters">
            <Stack.Screen name="Scooters" component={ScooterList} />
            <Stack.Screen name="Details" component={RunScooter} />
        </Stack.Navigator>
    );
}

// export default function List() {

//     return (
//         <View style={Base.container}>
//             <Text style={Typography.header2}>Scooter list</Text>
//             <Scooters />
//         </View>
//       );
// }
