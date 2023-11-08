import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAx0mkxVd9s1eAsFLOF6v67uS2B2qryhK8",
  authDomain: "chatcom-me.firebaseapp.com",
  projectId: "chatcom-me",
  storageBucket: "chatcom-me.appspot.com",
  messagingSenderId: "594808666385",
  appId: "1:594808666385:web:2dc0362e97ddaeccecb4b0",
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
