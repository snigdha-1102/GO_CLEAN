// Import the functions you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

// Your Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyCwVC-wF8nRFAobqtnaswfrEfbhu-sadJg",
  authDomain: "go-clean-26fa7.firebaseapp.com",
  projectId: "go-clean-26fa7",
  storageBucket: "go-clean-26fa7.firebasestorage.app",
  messagingSenderId: "213128728552",
  appId: "1:213128728552:web:1b308f857d364fab9e1e5d",
  measurementId: "G-4R3D08C533"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);

// ✅ ADD THIS (IMPORTANT)
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();