// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASEAPIKEY,
  authDomain: "creatorstudio-fa3f6.firebaseapp.com",
  projectId: "creatorstudio-fa3f6",
  storageBucket: "creatorstudio-fa3f6.appspot.com",
  messagingSenderId: "312310647318",
  appId: "1:312310647318:web:e5c1bef84ec9324e558337",
  measurementId: "G-NETB9X73S4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export default app;
export const auth = getAuth(app);
export const storage = getStorage(app);