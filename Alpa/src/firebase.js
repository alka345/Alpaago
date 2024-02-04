// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCThryimcpA6lQlFkkC_Xe7C_pByIwgQ_g",
  authDomain: "alpaago-ar.firebaseapp.com",
  projectId: "alpaago-ar",
  storageBucket: "alpaago-ar.appspot.com",
  messagingSenderId: "289112907726",
  appId: "1:289112907726:web:3b40c044ea7f1cb96a559f",
  measurementId: "G-E9MWT13N4E"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);

