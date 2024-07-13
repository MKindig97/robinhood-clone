import { initializeApp } from "firebase/app";
import { getFirestore, collection, onSnapshot, query, where, getDocs, doc, updateDoc, addDoc, deleteDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyASnoJu480HPM30Vw9-Yozg1MWbzzicWFw",
  authDomain: "robinhood-95eaf.firebaseapp.com",
  projectId: "robinhood-95eaf",
  storageBucket: "robinhood-95eaf.appspot.com",
  messagingSenderId: "784127312297",
  appId: "1:784127312297:web:5ba4dd1fc5e50b6cb684b8"
};

const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);

export { db, collection, onSnapshot, query, where, getDocs, doc, updateDoc, addDoc, deleteDoc };

