import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyByl8qw6_p7UPu9JBrQzAovpZQZgN0U3No",
  authDomain: "indirioo.firebaseapp.com",
  projectId: "indirioo",
  storageBucket: "indirioo.appspot.com",
  messagingSenderId: "57128408618",
  appId: "1:57128408618:web:4bf91bcda71f5ae923d553",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);
