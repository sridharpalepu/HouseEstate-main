// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC3X6LJe0z3kNucLfUDMZ4H0K62bPCskOQ",
  authDomain: "housestate-8a16a.firebaseapp.com",
  projectId: "housestate-8a16a",
  storageBucket: "housestate-8a16a.appspot.com",
  messagingSenderId: "6689281089",
  appId: "1:6689281089:web:aac16a1d2d5c6156b0a2c0",
  measurementId: "G-26K0MZQ0TB"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);