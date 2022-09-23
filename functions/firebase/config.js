

import {initializeApp} from 'firebase/app';
import {getDatabase} from 'firebase/database';
import {getAuth} from 'firebase/auth';
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

export const firebaseConfig = {
    apiKey: "AIzaSyA6J8Ynqh94npErRcZA9ED9Rp_M_jnBzP4",
    authDomain: "app2-87ac4.firebaseapp.com",
    databaseURL: "https://app2-87ac4-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "app2-87ac4",
    storageBucket: "app2-87ac4.appspot.com",
    messagingSenderId: "554437468745",
    appId: "1:554437468745:web:282ebec53916e2b64b5598",
    measurementId: "G-3WCFQX27LR"
};

export const app = initializeApp(firebaseConfig)
export const db = getDatabase(app)
export const firestore = getFirestore(app)
export const storage = getStorage(app)
export const auth = getAuth(app)
