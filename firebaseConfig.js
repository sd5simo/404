import { initializeApp } from "firebase/app";
// 1. Import Auth functions and Storage
import { initializeAuth, getReactNativePersistence, getAuth } from "firebase/auth";
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';

const firebaseConfig = {
  apiKey: "AIzaSyCS4jWXunkz8F3N7Z4c4NfRjQazXSgD4Ek",
  authDomain: "matchup-8e420.firebaseapp.com",
  projectId: "matchup-8e420",
  storageBucket: "matchup-8e420.firebasestorage.app",
  messagingSenderId: "477630136552",
  appId: "1:477630136552:web:c3decf8121d75e52eb495d",
  measurementId: "G-9NB5X7CFM3"
};

// 2. Initialize App
const app = initializeApp(firebaseConfig);

// 3. Initialize Auth with Persistence (This fixes the crash!)
// We use a try-catch block to prevent "Auth already initialized" errors during hot reload
let auth;
try {
  auth = initializeAuth(app, {
    persistence: getReactNativePersistence(ReactNativeAsyncStorage)
  });
} catch (e) {
  auth = getAuth(app);
}

// 4. Export both
export { auth };
export default app;