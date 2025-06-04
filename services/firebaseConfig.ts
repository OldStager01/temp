// app/services/firebaseConfig.ts
import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAT5y4Px6OWCeFduUSdu3gXkdWvi1QG_E4",
  authDomain: "sportified-9a50f.firebaseapp.com",
  projectId: "sportified-9a50f",
  storageBucket: "sportified-9a50f.firebasestorage.app",
  messagingSenderId: "450933998064",
  appId: "1:450933998064:web:eaca3a9d2c199a0e715d35",
  measurementId: "G-L78WQ4D6VK",
};

// ✅ Prevent multiple initializations during hot reload
// const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
console.log("Firebase initialized:", app.name);
const db = getFirestore(app);
const storage = getStorage(app);

export { auth, db, storage };
