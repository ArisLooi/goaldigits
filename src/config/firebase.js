import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyDuIWNv-Lum1_L2VN7hG5gAfcPfAy26OhI",
    authDomain: "goaldigits.firebaseapp.com",
    projectId: "goaldigits",
    storageBucket: "goaldigits.firebasestorage.app",
    messagingSenderId: "717660752622",
    appId: "1:717660752622:web:d6cbea5d2ff10c477bc1ff"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);