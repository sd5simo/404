import * as React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { useState, useEffect } from "react";

// --- IMPORT SCREENS ---
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

// --- CRITICAL FIX: Import 'auth' directly ---
import { auth } from "../../firebaseConfig"; 
import iconPref, { customTabButton } from "../utils/NavBarUtils";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function AuthStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="LoginScreen" component={LoginScreen} options={{ headerShown: false }} />
            <Stack.Screen name="SignUpScreen" component={SignUpScreen} options={{ headerShown: false }} />
            <Stack.Screen name="UserProfileScreen" component={UserProfileScreen} options={{ headerShown: false }} />
            <Stack.Screen name="ServiceBookingScreen" component={ServiceBookingScreen} options={{ headerShown: false }} />
            <Stack.Screen name="BookingHistoryScreen" component={BookingHistoryScreen} options={{ headerShown: false }} />
            <Stack.Screen name="UserInfosScreen" component={UserInfosScreen} options={{ headerShown: false }} />
            <Stack.Screen name="FeedBackScreen" component={FeedBackScreen} options={{ headerShown: false }} />
        </Stack.Navigator>
    );
}

function SearchStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="SearchScreen" component={SearchScreen} options={{ headerShown: false }} />
            <Stack.Screen name="ServiceDetailScreen" component={ServiceDetailScreen} options={{ headerShown: false }} />
            <Stack.Screen name="ServiceBookingScreen" component={ServiceBookingScreen} options={{ headerShown: false }} />
            <Stack.Screen name="LoginScreen" component={LoginScreen} options={{ headerShown: false }} />
        </Stack.Navigator>
    );
}

function HomeStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="HomeScreen" component={HomeScreen} options={{ headerShown: false }} />
            <Stack.Screen name="CalendarScreen" component={CalendarScreen} options={{ headerShown: false }} />
            <Stack.Screen name="NotificationsScreen" component={NotificationsScreen} options={{ headerShown: false }} />
            <Stack.Screen name="SearchScreen" component={SearchScreen} options={{ headerShown: false }} />
            <Stack.Screen name="ServiceDetailScreen" component={ServiceDetailScreen} options={{ headerShown: false }} />
            <Stack.Screen name="ServiceBookingScreen" component={ServiceBookingScreen} options={{ headerShown: false }} />
        </Stack.Navigator>
    );
}

function MapStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="MapScreen" component={MapScreen} options={{ headerShown: false }} />
            <Stack.Screen name="ServiceDetailScreen" component={ServiceDetailScreen} options={{ headerShown: false }} />
        </Stack.Navigator>
    );
}

const Navigation = () => {
    // FIX: Use auth.currentUser directly (Do not use getAuth(app))
    const [user, setUser] = useState(auth.currentUser);

    // Check authentication status
    useEffect(() => {
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