import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: "chatcom-me.firebaseapp.com",
  projectId: "chatcom-me",
  storageBucket: "chatcom-me.appspot.com",
  messagingSenderId: "594808666385",
  appId: "1:594808666385:web:2dc0362e97ddaeccecb4b0",
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore();
