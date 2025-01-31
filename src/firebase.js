// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getDatabase } from "firebase/database";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDYpblKjrWM-oxEirnF1gEa7Ms7Q4KcXNU",
  authDomain: "learnlingo-10d21.firebaseapp.com",
  databaseURL:
    "https://learnlingo-10d21-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "learnlingo-10d21",
  storageBucket: "learnlingo-10d21.firebasestorage.app",
  messagingSenderId: "884692477345",
  appId: "1:884692477345:web:3884d33d7c57751de097e0",
  measurementId: "G-4LZ0KPVFC9",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export const database = getDatabase(app);
export const auth = getAuth(app);
