// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBhvw2X2KetklU_Bz7SOM_GZpvc9nqafww",
  authDomain: "tiveo.firebaseapp.com",
  projectId: "tiveo-5f6c4",
  storageBucket: "tiveo.appspot.com",
  messagingSenderId: "1051392459652",
  appId: "1:1051392459652:web:2dd5959a98aa29b402193f",
};

// Initialize Firebase
const FIREBASE_APP = initializeApp(firebaseConfig);
const FIREBASE_AUTH = getAuth(FIREBASE_APP);

export { FIREBASE_AUTH };
