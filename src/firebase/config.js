// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from 'firebase/firestore/lite'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
   apiKey: "AIzaSyCaSUZBg3476XkM0adMc6zBGeu0-Rw6j4c",
   authDomain: "react-vite-b0cd6.firebaseapp.com",
   projectId: "react-vite-b0cd6",
   storageBucket: "react-vite-b0cd6.appspot.com",
   messagingSenderId: "964468784502",
   appId: "1:964468784502:web:e7756eb909f302b1424e57"
};

// Initialize Firebase
export const FirebaseApp = initializeApp(firebaseConfig);

export const FirebaseAuth = getAuth(FirebaseApp);
export const FirebaseDB = getFirestore(FirebaseApp);