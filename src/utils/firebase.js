// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "collabdocs-cac80.firebaseapp.com",
  projectId: "collabdocs-cac80",
  storageBucket: "collabdocs-cac80.firebasestorage.app",
  messagingSenderId: "894041951905",
  appId: "1:894041951905:web:73e41d0cde7e3233f86ae0",
  measurementId: "G-3Z3LK0DDBD",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
