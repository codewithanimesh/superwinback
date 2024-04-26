// // Import the functions you need from the SDKs you need
// import { initializeApp } from 'firebase/app';
// import { getAuth } from 'firebase/auth';
// import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// // import { getAnalytics } from "firebase/analytics"; // Uncomment if you need analytics

// // Firebase configuration
// const firebaseConfig = {
//   apiKey: "AIzaSyAkVJf80lA15cFZz28649ESTw2R68Q-RHQ",
//   authDomain: "mytestapp-d154c.firebaseapp.com",
//   projectId: "mytestapp-d154c",
//   storageBucket: "mytestapp-d154c.appspot.com",
//   messagingSenderId: "645527485504",
//   appId: "1:645527485504:web:48ec52443332939b39f3a5",
//   measurementId: "G-7ME6QM5E6Z"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);

// // Get the Auth service for the default app
// const auth = getAuth(app);

// // Optionally, if using analytics:
// // const analytics = getAnalytics(app);

// // Export auth for use in other parts of your app
// export { auth };




// Import necessary Firebase modules
import { initializeApp, getApp, getApps } from 'firebase/app';
import { getAuth, initializeAuth, getReactNativePersistence } from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAkVJf80lA15cFZz28649ESTw2R68Q-RHQ",
  authDomain: "mytestapp-d154c.firebaseapp.com",
  projectId: "mytestapp-d154c",
  storageBucket: "mytestapp-d154c.appspot.com",
  messagingSenderId: "645527485504",
  appId: "1:645527485504:web:48ec52443332939b39f3a5",
  measurementId: "G-7ME6QM5E6Z"
};

// Initialize Firebase App
if (!getApps().length) {
  initializeApp(firebaseConfig);
}

const app = getApp();

// Initialize Firebase Auth with AsyncStorage persistence
let auth;
try {
  auth = getAuth(app);
} catch {
  auth = initializeAuth(app, {
    persistence: getReactNativePersistence(AsyncStorage)
  });
}

export { auth };
