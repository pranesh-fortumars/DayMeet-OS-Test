// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAWbFRUtnifDru5sLAVj67GQC2V6t-h684",
  authDomain: "daymeet-os-test.firebaseapp.com",
  projectId: "daymeet-os-test",
  storageBucket: "daymeet-os-test.firebasestorage.app",
  messagingSenderId: "208086716208",
  appId: "1:208086716208:web:aa5330cf5246c2994902f5",
  measurementId: "G-RSKDEY98H8"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const analytics = typeof window !== 'undefined' ? getAnalytics(app) : null;
