import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";


const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: "line-clone-f6ad4.firebaseapp.com",
  databaseURL: "https://line-clone-f6ad4-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "line-clone-f6ad4",
  storageBucket: "line-clone-f6ad4.appspot.com",
  messagingSenderId: "1060298658183",
  appId: "1:1060298658183:web:c10a4e59923c1a2a28c322"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth };

