import RunScooter from '../RunScooter';
import LundList from '../list/LundList';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

export default function LundInfo(props) {
    const running = props.running;
    const setRunning = props.setRunning;
    const setScooterId = props.setScooterId;
    const setScooters = props.setScooters;
    const scooters= props.scooters;
    const user = props.user;

    props.setCity('Lund');

    return (
        <Stack.Navigator initialRouteName="Scooters">
            <Stack.Screen name="Scooters">
                {props => (
                    <LundList
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
