import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyAWbFRUtnifDru5sLAVj67GQC2V6t-h684",
  authDomain: "daymeet-os-test.firebaseapp.com",
  projectId: "daymeet-os-test",
  storageBucket: "daymeet-os-test.firebasestorage.app",
  messagingSenderId: "208086716208",
  appId: "1:208086716208:web:aa5330cf5246c2994902f5",
  measurementId: "G-RSKDEY98H8"
};

export const app = initializeApp(firebaseConfig);
export const analytics = typeof window !== 'undefined' ? getAnalytics(app) : null;
export const auth = getAuth(app);
export const db = getFirestore(app);
