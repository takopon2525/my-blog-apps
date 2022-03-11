import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyC38roUl3AOn6KV_AsThBI4tiCC4jp-TTE",
  authDomain: "my-blog-apps-acca5.firebaseapp.com",
  projectId: "my-blog-apps-acca5",
  storageBucket: "my-blog-apps-acca5.appspot.com",
  messagingSenderId: "342809991961",
  appId: "1:342809991961:web:7aff22948ed7688ae14388",
};

initializeApp(firebaseConfig);

const db = getFirestore();
const storage = getStorage();

export { db, storage };
