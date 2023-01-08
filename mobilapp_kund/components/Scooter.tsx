import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CityList from './CityList';
import StoInfo from './info/StoInfo';
import LundInfo from './info/LundInfo';
import MalmoInfo from './info/MalmoInfo';

const Stack = createNativeStackNavigator();

export default function Cities(props) {
    const running = props.running;
    const setRunning = props.setRunning;
    const setScooterId = props.setScooterId;
    const setScooters = props.setScooters;
    const scooters= props.scooters;
    const setCity = props.setCity;
    const user = props.user;

    return (
        // Stack navigator with citylist, stockholm, malmo and lund
        <Stack.Navigator initialRouteName="CityList">
            
            <Stack.Screen name="CityList" component={CityList}>
            </Stack.Screen>

            <Stack.Screen name="Stockholm">
                {props => (
                    <StoInfo
                        {...props}
                        setScooters={setScooters}
                        running={running}
                        setRunning={setRunning}
                        setScooterId={setScooterId}
                        scooters={scooters}
                        setCity={setCity}
                        user={user}
                    />
                )}
            </Stack.Screen>

            <Stack.Screen name="Malmo">
                {props => (
                    <MalmoInfo
                        {...props}
                        setScooters={setScooters}
                        running={running}
                        setRunning={setRunning}
                        setScooterId={setScooterId}
                        scooters={scooters}
                        setCity={setCity}
                        user={user}
                    />
                )}
            </Stack.Screen>

            <Stack.Screen name="Lund">
                {props => (
                    <LundInfo
                        {...props}
                        setScooters={setScooters}
                        running={running}
                        setRunning={setRunning}
                        setScooterId={setScooterId}
                        scooters={scooters}
                        setCity={setCity}
                        user={user}
                    />
                )}
            </Stack.Screen>

        </Stack.Navigator>
    );
};
