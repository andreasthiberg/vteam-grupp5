import ScooterList from '../ScooterList';
import RunScooter from '../RunScooter';
import StoList from '../list/StoList';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

export default function Info(props) {
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
                    <StoList
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
