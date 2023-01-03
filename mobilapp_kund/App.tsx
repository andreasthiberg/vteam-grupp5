import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useState, useEffect } from 'react';
// import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

import { Base } from './styles';
import Home from './components/Home';
import Map from './components/Map';
import List from './components/List';
import Auth from './components/auth/Auth';
//import { ApolloProvider } from '@apollo/client';
//import authModel from './models/auth';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';

const Tab = createBottomTabNavigator();
const routeIcons = {
  "Home": "home",
  "Map": "map",
  "List": "list",
  "Login": "lock-closed",
}

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState<Boolean>(false);

  // useEffect(() => {
  //   (async () => {
  //     setIsLoggedIn(await authModel.loggedIn());
  //   });
  //  }, []);

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
            <Tab.Screen name="List" component={List} />
            <Tab.Screen name="Login">
              {() => <Auth setIsLoggedIn={setIsLoggedIn} />}
            </Tab.Screen>

          </Tab.Navigator>
        </NavigationContainer>
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}
