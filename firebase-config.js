// Firebase configuration for VTC PLUS — vtc-plus-a6242
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.2.1/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/12.2.1/firebase-firestore.js";
import { getStorage } from "https://www.gstatic.com/firebasejs/12.2.1/firebase-storage.js";

const firebaseConfig = {
  apiKey: "AIzaSyABNLn0CJcxH_skC9QqRsKLbY_tvP5hvV0",
  authDomain: "vtc-plus-a6242.firebaseapp.com",
  projectId: "vtc-plus-a6242",
  storageBucket: "vtc-plus-a6242.firebasestorage.app",
  messagingSenderId: "500809490080",
  appId: "1:500809490080:web:111996fe837bad8bcdb3c5"
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);
