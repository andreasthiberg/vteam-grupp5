import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native-safe-area-context';
// import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

import { Base } from './styles';
import Home from './components/Home';
import Map from './components/Map';
import Login from './components/Login';

const Tab = createBottomTabNavigator();
const routeIcons = {
  "Home": "home",
  "Map": "map",
  "Login": "lock-closed",
}

export default function App() {

  return (
    <SafeAreaView style={Base.container}>
      <NavigationContainer>
        <Tab.Navigator screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
                let iconName = routeIcons[route.name] || "alert";
                return <Ionicons name={iconName} size={size} color={color} />;
            },
            tabBarActiveTintColor: 'blue',
            tabBarInactiveTintColor: 'gray',
          })}
        >
        
          <Tab.Screen name="Home" component={Home} />
          <Tab.Screen name="Map" component={Map} />
          <Tab.Screen name="Login" component={Login} />

        </Tab.Navigator>
      </NavigationContainer>
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}
