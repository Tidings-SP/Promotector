import { getApp, getApps, initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from 'firebase/firestore';
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD_oi3COHn4NuouB4zcZoDOtG6OMRFodRs",
  authDomain: "promodetector-7ddb1.firebaseapp.com",
  projectId: "promodetector-7ddb1",
  storageBucket: "promodetector-7ddb1.appspot.com",
  messagingSenderId: "116880552558",
  appId: "1:116880552558:web:b7db24482cea0364e8ec7f",
  measurementId: "G-N4W51BL5KE"
};

// Initialize Firebase
const app = getApps.length ? getApp() : initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore(app);
export { app, auth, db }