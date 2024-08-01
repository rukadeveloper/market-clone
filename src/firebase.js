// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA7ATs7q8tDWPJA_sc5giKHw448h8UuMno",
  authDomain: "carrot-markets.firebaseapp.com",
  projectId: "carrot-markets",
  storageBucket: "carrot-markets.appspot.com",
  messagingSenderId: "934878104938",
  appId: "1:934878104938:web:fd1a6d63eacf857ad22913",
  measurementId: "G-K30Z25DVR4",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
