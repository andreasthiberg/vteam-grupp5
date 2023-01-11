import RunScooter from '../RunScooter';
import StoList from '../list/StoList';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

export default function StoInfo(props) {
    const running = props.running;
    const setRunning = props.setRunning;
    const setScooterId = props.setScooterId;
    const setScooters = props.setScooters;
    const scooters = props.scooters;
    const user = props.user;
    const setCity = props.setCity;

    setCity('Stockholm');

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
                        user={user}
                    />
                )}
            </Stack.Screen>
        </Stack.Navigator>
    );
}
