import { initializeApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCa6G0Sl990yNpVEZUDP8ok9yeJxifQoms",
  authDomain: "reducecarbon-8ed10.firebaseapp.com",
  projectId: "reducecarbon-8ed10",
  storageBucket: "reducecarbon-8ed10.firebasestorage.app",
  messagingSenderId: "691127077820",
  appId: "1:691127077820:web:a3f7dca286342b8bf8f9b9"
};

// Initialize Firebase
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

// Initialize and export Firestore and Auth
const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth };

