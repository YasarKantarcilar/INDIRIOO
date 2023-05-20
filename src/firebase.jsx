import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  databaseURL:
    "https://indirioo-51f39-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "indirioo-51f39",
  storageBucket: "indirioo-51f39.appspot.com",
  messagingSenderId: "963832550532",
  appId: "1:963832550532:web:1e02831360356707ac1ed1",
  measurementId: "G-SXMEJNZQNV",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);
