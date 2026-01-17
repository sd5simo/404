import * as React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { useState, useEffect } from "react";

// FIX 1: Import 'auth' directly from config
import { auth } from "../../firebaseConfig"; 
import iconPref, { customTabButton } from "../utils/NavBarUtils";

// Import Screens
import HomeScreen from "../screens/HomeScreen";
import LoginScreen from "../screens/LoginScreen";
import SignUpScreen from "../screens/SignUpScreen";
import CalendarScreen from "../screens/CalendarScreen";
import SearchScreen from "../screens/SearchScreen";
import ServiceDetailScreen from "../screens/ServiceDetailScreen";
import ServiceBookingScreen from "../screens/ServiceBookingScreen";
import NotificationsScreen from "../screens/NotificationsScreen";
import MapScreen from "../screens/MapScreen";
import UserProfileScreen from "../screens/UserProfileScreen";
import UserInfosScreen from "../screens/UserInfosScreen";
import BookingHistoryScreen from "../screens/BookingHistoryScreen";
import FeedBackScreen from "../screens/FeedBackScreen";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

// --- Define Stacks ---
function AuthStack() {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="LoginScreen" component={LoginScreen} />
            <Stack.Screen name="SignUpScreen" component={SignUpScreen} />
            <Stack.Screen name="UserProfileScreen" component={UserProfileScreen} />
            <Stack.Screen name="ServiceBookingScreen" component={ServiceBookingScreen} />
            <Stack.Screen name="BookingHistoryScreen" component={BookingHistoryScreen} />
            <Stack.Screen name="UserInfosScreen" component={UserInfosScreen} />
            <Stack.Screen name="FeedBackScreen" component={FeedBackScreen} />
        </Stack.Navigator>
    );
}

function SearchStack() {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="SearchScreen" component={SearchScreen} />
            <Stack.Screen name="ServiceDetailScreen" component={ServiceDetailScreen} />
            <Stack.Screen name="ServiceBookingScreen" component={ServiceBookingScreen} />
            <Stack.Screen name="LoginScreen" component={LoginScreen} />
        </Stack.Navigator>
    );
}

function HomeStack() {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="HomeScreen" component={HomeScreen} />
            <Stack.Screen name="CalendarScreen" component={CalendarScreen} />
            <Stack.Screen name="NotificationsScreen" component={NotificationsScreen} />
            <Stack.Screen name="SearchScreen" component={SearchScreen} />
            <Stack.Screen name="ServiceDetailScreen" component={ServiceDetailScreen} />
            <Stack.Screen name="ServiceBookingScreen" component={ServiceBookingScreen} />
        </Stack.Navigator>
    );
}

function MapStack() {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="MapScreen" component={MapScreen} />
            <Stack.Screen name="ServiceDetailScreen" component={ServiceDetailScreen} />
        </Stack.Navigator>
    );
}

// --- Main Navigation Component ---
const Navigation = () => {
    // FIX 2: Use 'auth.currentUser' directly. DO NOT USE getAuth(app)
    const [user, setUser] = useState(auth.currentUser);

    // Check authentication status
    useEffect(() => {
        // FIX 3: Use the imported 'auth' variable
        const unsubscribe = auth.onAuthStateChanged((user) => {
            setUser(!!user);
        });
        return unsubscribe;
    }, []);

    function getTabScreen(authenticatedComponent, defaultComponent) {
        return user ? authenticatedComponent : defaultComponent;
    }

    return (
        <Tab.Navigator screenOptions={iconPref} initialRouteName="Anasayfa">
            <Tab.Screen name="Anasayfa" component={HomeStack} />
            <Tab.Screen name="Ara" component={SearchStack} />
            <Tab.Screen
                name="Harita"
                component={MapStack}
                options={{ tabBarButton: customTabButton }}
            />
            <Tab.Screen
                name="Randevularım"
                component={getTabScreen(CalendarScreen, AuthStack)}
            />
            <Tab.Screen
                name="Profil"
                component={getTabScreen(UserProfileScreen, AuthStack)}
            />
        </Tab.Navigator>
    );
};

export default Navigation;