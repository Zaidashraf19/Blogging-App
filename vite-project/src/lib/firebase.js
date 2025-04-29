import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyCea_UnmMCwNXr58CIbK9U0w3ySZxNgzcQ",
    authDomain: "blogging-app-55135.firebaseapp.com",
    projectId: "blogging-app-55135",
    storageBucket: "blogging-app-55135.firebasestorage.app",
    messagingSenderId: "641394640781",
    appId: "1:641394640781:web:76377b92ce583b086d9fc4",
    measurementId: "G-HT7YXDLW2G"
};


const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);