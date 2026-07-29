// Import the functions you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

// Your Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyBJSU5b8EGUd25I4g53TbXswCgP7uwB9AE",
  authDomain: "goclean-f62e2.firebaseapp.com",
  projectId: "goclean-f62e2",
  storageBucket: "goclean-f62e2.firebasestorage.app",
  messagingSenderId: "47145277594",
  appId: "1:47145277594:web:5acbdd2294e0579b5fa723",
  measurementId: "G-CHWSKSMFB6"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);

// ✅ ADD THIS (IMPORTANT)
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();