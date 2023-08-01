

import {getAuth} from "firebase/auth";
import { getFirestore} from "firebase/firestore";

import { getStorage } from "firebase/storage";

import { getAnalytics } from "firebase/analytics";

import { initializeApp } from "firebase/app";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDD5dPSFIlq1p6ZYiWXHbm0r46BoJZoTN4",
  authDomain: "quizz-cours.firebaseapp.com",
  projectId: "quizz-cours",
  storageBucket: "quizz-cours.appspot.com",
  messagingSenderId: "455864347966",
  appId: "1:455864347966:web:adc074635b13115042d06f",
  measurementId: "G-FW2KQ10LQJ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Initialize Firebase

// Initialize Firebase


export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage= getStorage(app);