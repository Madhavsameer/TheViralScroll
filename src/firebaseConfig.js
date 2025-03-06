import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAhnH6PUXeW3hUjotOzvCNpd177resne7A",
  authDomain: "myapp-12a88.firebaseapp.com",
  projectId: "myapp-12a88",
  storageBucket: "myapp-12a88.firebasestorage.app",
  messagingSenderId: "1054712308041",
  appId: "1:1054712308041:web:f3b759f666daa857e6fa98",
  measurementId: "G-X4X0BWWXFQ"
};
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);

export { db, storage };
