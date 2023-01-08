import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Base } from './styles';

import Home from './components/Home';
//import Map from './components/Map';
//import List from './components/List';
import Scooter from './components/Scooter';
import Auth from './components/auth/Auth';
import Logout from './components/auth/Logout';
import customerModel from './models/customer';

import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import { IP } from "@env";

const Tab = createBottomTabNavigator();

const routeIcons = {
  "Home": "home",
  "Scooter": "scooter",
  "Map": "map",
  "List": "view-list-outline",
  "Login": "key",
  "Logout": "key",
}

// Initialize Apollo Client
const client = new ApolloClient({
  uri: `http://${IP}:3000/graphql`,
  cache: new InMemoryCache(),
});

export default function App() {
  //Authentication states
  const [jwt,setJwt] = useState("");
  const [loggedIn,setLoggedIn] = useState(false);
  const [userEmail,setUserEmail] = useState("");
  //const [user, setUser] = useState(0);

  //Scooter-related states
  const [scooters, setScooters] = useState([]);
  const [scooterId, setScooterId] = useState(0);
  const [running, setRunning] = useState(false);

  //User state
  const [user, setUser] = useState([]);

  //City state
  const [city, setCity] = useState("");

  console.log("App: scooterId, running::", scooterId, running);

  // Set user when userEmail is updated
  useEffect(() => {
    if(userEmail !== "") {
      (async () => {
        const response = await customerModel.getAllCustomers();

        const customer = response.customers.find(customer => customer.email === userEmail);
        
        if (customer) {
          setUser(customer);
        }
      })();
    }
  }, [userEmail]);


  return (
    <SafeAreaView style={Base.container}>
      <ApolloProvider client={client}>
        <NavigationContainer>
          <Tab.Navigator screenOptions={({ route }) => ({
              tabBarIcon: ({ focused, color, size }) => {
                  let iconName = routeIcons[route.name] || "alert";
                  return <MaterialCommunityIcons name={iconName} size={size} color={color} />;
              },
              tabBarActiveTintColor: 'blue',
              tabBarInactiveTintColor: 'gray',
            })}
          >
            
            {loggedIn ? (
              <>
                <Tab.Screen name="Home">
                  {() => <Home user={user} setCity={setCity} running={running} scooterId={scooterId} setScooterId={setScooterId} setRunning={setRunning} />}
                </Tab.Screen>

                {/* <Tab.Screen name="List">
                  {() => <List setScooters={setScooters} setScooterId={setScooterId} setRunning={setRunning} running={running} scooters={scooters} />}
                </Tab.Screen> */}

                {/* <Tab.Screen name="Map" component={Map} /> */}

                <Tab.Screen name="Scooter" component={Scooter} />

                <Tab.Screen name="Logout">
                  {() => <Logout setJwt={setJwt} setLoggedIn={setLoggedIn} setUserEmail={setUserEmail} />}
              </Tab.Screen>
              </>
            ) :
              <>
                {/* <Tab.Screen name="Home">
                  {() => <Home running={running} scooterId={scooterId} setScooterId={setScooterId} setRunning={setRunning} />}
                </Tab.Screen> */}

                <Tab.Screen name="Login">
                  {() => <Auth setJwt={setJwt} setLoggedIn={setLoggedIn} userEmail={userEmail} setUserEmail={setUserEmail} jwt={jwt} />}
                </Tab.Screen>
              </>
            }
          </Tab.Navigator>
        </NavigationContainer>
      </ApolloProvider>
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}
