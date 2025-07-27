// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyD7aV4Z6_5-d_uUWkoTwRropta9r9GH8IA",
    authDomain: "mi-proyectito-front-reto.firebaseapp.com",
    projectId: "mi-proyectito-front-reto",
    storageBucket: "mi-proyectito-front-reto.firebasestorage.app",
    messagingSenderId: "279223600512",
    appId: "1:279223600512:web:f9b89efee38feaaddc6d65",
    measurementId: "G-4M6YQSV59J"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export const auth = getAuth(app);