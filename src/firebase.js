import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyA7ATs7q8tDWPJA_sc5giKHw448h8UuMno",
  authDomain: "carrot-markets.firebaseapp.com",
  databaseURL:
    "https://carrot-markets-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "carrot-markets",
  storageBucket: "carrot-markets.appspot.com",
  messagingSenderId: "934878104938",
  appId: "1:934878104938:web:fd1a6d63eacf857ad22913",
  measurementId: "G-K30Z25DVR4",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Realtime Database and get a reference to the service
const database = getDatabase(app);
const storage = getStorage(app);
const auth = getAuth(app);
