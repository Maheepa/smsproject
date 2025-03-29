// Import Firebase SDK
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getDatabase } from "firebase/database";

// Your Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAwxUvubYUYO01XaowFhVqrT3pllex-8a8",
    authDomain: "smsproject-4e026.firebaseapp.com",
    projectId: "smsproject-4e026",
    storageBucket: "smsproject-4e026.firebasestorage.app",
    messagingSenderId: "47478991174",
    appId: "1:47478991174:web:821af2ba9fd51aa89d9d47",
    databaseURL: "https://smsproject-4e026-default-rtdb.asia-southeast1.firebasedatabase.app/",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
//const db = getFirestore(app);
const db = getDatabase(app);
const storage = getStorage(app);

export { auth, db, storage };
