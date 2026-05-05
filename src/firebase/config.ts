import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";

// VITE_FIREBASE_API_KEY=AIzaSyB0isMnMJ2av8mONAHK_oayYmGMVzxuQbU
// VITE_FIREBASE_AUTH_DOMAIN=ecommercewehcd.firebaseapp.com
// VITE_FIREBASE_PROJECT_ID=ecommercewehcd
// VITE_FIREBASE_STORAGE_BUCKET=ecommercewehcd.firebasestorage.app
// VITE_FIREBASE_MESSAGING_SENDER_ID=221480190692
// VITE_FIREBASE_APP_ID=1:221480190692:web:0bcd1311a32b4b1ca8e2f1
// VITE_FIREBASE_MEASUREMENT_ID=G-N47MYWZLBF

const firebaseConfig = {
  apiKey: "AIzaSyB0isMnMJ2av8mONAHK_oayYmGMVzxuQbU",
  authDomain: "ecommercewehcd.firebaseapp.com",
  projectId: "ecommercewehcd",
  storageBucket: "ecommercewehcd.firebasestorage.app",
  messagingSenderId: "221480190692",
  appId: "1:221480190692:web:0bcd1311a32b4b1ca8e2f1",
  measurementId: "G-N47MYWZLBF",
};



const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);
export const analytics = getAnalytics(app);