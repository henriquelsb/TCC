import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCot3FeHeu8zNANnePS8OCwUQmQaGWVW8M",
  authDomain: "meu-site-login-d5f13.firebaseapp.com",
  projectId: "meu-site-login-d5f13",
  storageBucket: "meu-site-login-d5f13.firebasestorage.app",
  messagingSenderId: "281554246984",
  appId: "1:281554246984:web:93ce8912fdceafccc4a77d",
  measurementId: "G-LNXVDTG3NZ"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);