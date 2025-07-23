// já tens isto pronto
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyDKtfZpk8yN4fi8c-jxg4IojipMQmHdCA0",
    authDomain: "react-34446.firebaseapp.com",
    projectId: "react-34446",
    storageBucket: "react-34446.firebasestorage.app",
    messagingSenderId: "949877045084",
    appId: "1:949877045084:web:569000d418da624ad3f399"
  };
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db   = getFirestore(app);