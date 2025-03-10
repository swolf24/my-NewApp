import React from 'react';
import { TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

// Screens
import LocationsScreen from './screens/LocationsScreen';
import AddLocationScreen from './screens/AddLocationScreen';
import MapScreen from './screens/MapScreen';
import CountrySearchScreen from './screens/CountrySearchScreen';
import LoginScreen from './screens/LoginScreen';
import SignUpScreen from './screens/SignUpScreen';
import UserScreen from './screens/UserScreen';


const AppStack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const LocationsStackNav = createNativeStackNavigator();


function LocationsStack() {
  return (
    <LocationsStackNav.Navigator>
      <LocationsStackNav.Screen
        name="LocationsList"
        component={LocationsScreen}
        options={{ title: 'Locations' }}
      />
      <LocationsStackNav.Screen
        name="LocationMap"
        component={MapScreen}
        options={{ title: 'Location Map' }}
      />
    </LocationsStackNav.Navigator>
  );
}

function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          if (route.name === 'LocationsTab') {
            return <Ionicons name="list-outline" size={size} color={color} />;
          } else if (route.name === 'AddLocationTab') {
            return <Ionicons name="add-circle-outline" size={size} color={color} />;
          } else if (route.name === 'MapTab') {
            return <Ionicons name="map-outline" size={size} color={color} />;
          } else if (route.name === 'CapitalsTab') {
            return <Ionicons name="flag-outline" size={size} color={color} />;
          }
        },
      })}
    >
      {}
      <Tab.Screen
        name="LocationsTab"
        component={LocationsStack}
        options={{ title: 'Locations', headerShown: false }}
      />
      <Tab.Screen
        name="AddLocationTab"
        component={AddLocationScreen}
        options={{ title: 'Add Location' }}
      />
      <Tab.Screen
        name="MapTab"
        component={MapScreen}
        options={{ title: 'Maps' }}
      />
      <Tab.Screen
        name="CapitalsTab"
        component={CountrySearchScreen}
        options={{ title: 'Capitals' }}
      />
    </Tab.Navigator>
  );
}


function AppNavigator() {
  return (
    <AppStack.Navigator
      screenOptions={({ navigation }) => ({
        headerTitleAlign: 'center',
       
        headerLeft: () => (
          <TouchableOpacity onPress={() => navigation.navigate('UserProfile')}>
            <Ionicons
              name="person-circle-outline"
              size={28}
              color="#000"
              style={{ marginLeft: 15 }}
            />
          </TouchableOpacity>
        ),
        
        headerRight: () => (
          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <Ionicons
              name="exit-outline"
              size={28}
              color="#000"
              style={{ marginRight: 15 }}
            />
          </TouchableOpacity>
        ),
      })}
    >
      <AppStack.Screen
        name="Login"
        component={LoginScreen}
        options={{ headerShown: false }}
      />
      <AppStack.Screen
        name="SignUp"
        component={SignUpScreen}
        options={{ headerShown: false }}
      />
      <AppStack.Screen
        name="Home"
        component={MainTabs}
        options={{ title: 'Home' }}
      />
      <AppStack.Screen
        name="UserProfile"
        component={UserScreen}
        options={{ title: 'Profile' }}
      />
    </AppStack.Navigator>
  );
}

export default function Navigation() {
  return (
    <NavigationContainer>
      <AppNavigator />
    </NavigationContainer>
  );
}
