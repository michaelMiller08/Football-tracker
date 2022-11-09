// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth} from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBoZEgX0ZH3OTOvql-UTp2oARaehX0_Q1M",
  authDomain: "fifatracker-1fc62.firebaseapp.com",
  databaseURL: "https://fifatracker-1fc62-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "fifatracker-1fc62",
  storageBucket: "fifatracker-1fc62.appspot.com",
  messagingSenderId: "728295469967",
  appId: "1:728295469967:web:a9f358fcfc83efd3d151fa",
  measurementId: "G-5HCME0VP2F"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth(app);