import { createNativeStackNavigator } from "@react-navigation/native-stack";

import LogIn from './Login';
//import LogOut from './Logout';

const Stack = createNativeStackNavigator();

export default function Auth(props) {
    return (
        <Stack.Navigator initialRouteName="LogIn">
            <Stack.Screen name="LogIn">
                {(screenProps) => <LogIn {...screenProps} setLoggedIn={props.setLoggedIn} setJwt={props.setJwt}  setUserEmail={props.setUserEmail} />}
            </Stack.Screen>
            
            {/* <Stack.Screen name="LogOut" component={LogOut}>
            </Stack.Screen> */}
        </Stack.Navigator>
    );
};
