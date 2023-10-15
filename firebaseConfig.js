// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { ref, getStorage } from "firebase/storage";
import {
  getAuth,
  initializeAuth,
  setPersistence,
  browserLocalPersistence,
} from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDR-27xJcIMO8MQzbCz1xGMYi0MvIH5V5U",
  authDomain: "legato-70a5f.firebaseapp.com",
  projectId: "legato-70a5f",
  storageBucket: "legato-70a5f.appspot.com",
  messagingSenderId: "35873083403",
  appId: "1:35873083403:web:fec8abe96bd37c8cc5770e",
  measurementId: "G-LXV797LM9E",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

// Initialize Firebase Authentication and get a reference to the service

const auth = getAuth(app);

const db = getFirestore(app);

export { storage, auth, db };
