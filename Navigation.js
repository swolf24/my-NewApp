import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import LoginScreen from "./screens/LoginScreen";
import LocationsScreen from "./screens/LocationsScreen";
import MapScreen from "./screens/MapScreen";
import SignUpScreen from "./screens/SignUPScreen";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const MainTabs = () => (
    <Tab.Navigator>
        <Tab.Screen name="Locations" component={LocationsScreen} />
        <Tab.Screen name="Map" component={MapScreen} />
    </Tab.Navigator>
);

const Navigation = () => (
    <NavigationContainer>
        <Stack.Navigator>
            <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
            <Stack.Screen name="SignUp" component={SignUpScreen}/>
            <Stack.Screen name="Home" component={MainTabs} />
        </Stack.Navigator>
    </NavigationContainer>
);

export default Navigation;
