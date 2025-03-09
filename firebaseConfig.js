// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAa3kOY6V2QXT2QwqzZXzrWBeG1BnE5WNQ",
  authDomain: "mynewapp-c221a.firebaseapp.com",
  projectId: "mynewapp-c221a",
  storageBucket: "mynewapp-c221a.firebasestorage.app",
  messagingSenderId: "1000155445350",
  appId: "1:1000155445350:web:f87d1e4e0348cfec6815a7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);