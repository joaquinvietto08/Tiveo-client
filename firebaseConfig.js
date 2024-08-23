// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBruaC-FOOdr9dpoDNJ_he7dDduLBZni8c",
  authDomain: "tiveoauth.firebaseapp.com",
  projectId: "tiveoauth",
  storageBucket: "tiveoauth.appspot.com",
  messagingSenderId: "66759050414",
  appId: "1:66759050414:web:2dd5959a98aa29b402193f",
};

// Initialize Firebase
const FIREBASE_APP = initializeApp(firebaseConfig);
const FIREBASE_AUTH = getAuth(FIREBASE_APP);

export { FIREBASE_AUTH };
