import ScooterList from './ScooterList';
import RunScooter from './RunScooter';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

export default function List(props) {
    //receiving 3 props(running, setRunning, setScooterId)
    const running = props.running;
    const setRunning = props.setRunning;
    const setScooterId = props.setScooterId;
    const setScooters = props.setScooters;
    const scooters= props.scooters;

    console.log("List: running::", running);

    return (
        <Stack.Navigator initialRouteName="Scooters">
            <Stack.Screen name="Scooters">
                {props => (
                    <ScooterList
                        {...props}
                        setScooters={setScooters}
                        running={running}
                        setRunning={setRunning}
                        setScooterId={setScooterId}
                        scooters={scooters}
                    />
                )}
            </Stack.Screen>

            <Stack.Screen name="Details">
                {props => (
                    <RunScooter
                        {...props}
                        setRunning={setRunning}
                        setScooterId={setScooterId}
                    />
                )}
            </Stack.Screen>
        </Stack.Navigator>
    );
}


// return (
//     <Stack.Navigator initialRouteName="Scooters">
//         <Stack.Screen name="Scooters" component={ScooterList} />
//         <Stack.Screen name="Details" component={RunScooter} />
//     </Stack.Navigator>




// return (
//     <Stack.Navigator initialRouteName="Scooters">
//         <Stack.Screen 
//             name="Scooters" 
//             component={ScooterList} 
//         />
//         <Stack.Screen 
//             name="Details" 
//             options={{props.running}}
//             component={RunScooter} 
//         />
//     </Stack.Navigator>
// );

// return (
//     <Stack.Navigator initialRouteName="Scooters">
//         <Stack.Screen 
//             name="Scooters" 
//             component={ScooterList} 
//         />
//         <Stack.Screen name="Details">
//             {(...props) => <RunScooter {...props} />}
//         </Stack.Screen>
//     </Stack.Navigator>
// );