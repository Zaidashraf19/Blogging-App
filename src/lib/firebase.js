import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyDfqijKxcxKtHgvLgLWlUpg9KrhZwVHdfo",
    authDomain: "blogging-app-fa73c.firebaseapp.com",
    projectId: "blogging-app-fa73c",
    storageBucket: "blogging-app-fa73c.firebasestorage.app",
    messagingSenderId: "299562151851",
    appId: "1:299562151851:web:ddbba5239b773989ab6cee",
    measurementId: "G-HB6694N2D1"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);