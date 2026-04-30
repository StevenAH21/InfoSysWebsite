// firebase-config.js — shared Firebase initialisation
// Import this file first on every page that needs Firestore or Auth.
 
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";
import { getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";
 
const firebaseConfig = {
  apiKey: "AIzaSyA4nOTz_M-YrOqByWXKavk8DjxTYWED-9E",
  authDomain: "uw-iss-website.firebaseapp.com",
  projectId: "uw-iss-website",
  storageBucket: "uw-iss-website.firebasestorage.app",
  messagingSenderId: "717398282101",
  appId: "1:717398282101:web:7941bf48695735280d4d3c"
};
 
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export { onAuthStateChanged, signInWithEmailAndPassword, signOut };
