import { createNativeStackNavigator } from "@react-navigation/native-stack";

import LogIn from './Login';

const Stack = createNativeStackNavigator();

export default function Auth(props) {
    return (
        <Stack.Navigator initialRouteName="LogIn">
            <Stack.Screen name="LogIn">
                {(screenProps) => <LogIn {...screenProps} setIsLoggedIn={props.setIsLoggedIn} />}
            </Stack.Screen>
        </Stack.Navigator>
    );
};
