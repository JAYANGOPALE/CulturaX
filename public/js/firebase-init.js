// Firebase initialization for CulturaX
// Replace the placeholder config with your real Firebase project values.

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import {
  getAuth,
  onAuthStateChanged,
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import {
  getFirestore,
  serverTimestamp,
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";
import { getStorage } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-storage.js";

const firebaseConfig = {
  apiKey: "AIzaSyCeGrIbrGaQD2v7c57fZPc2JGaNzGwcMV4",
  authDomain: "https://culturax.vercel.app/",
  projectId: "cultura-x",
  storageBucket: "cultura-x.firebasestorage.app",
  messagingSenderId: "725630864234",
  appId: "1:725630864234:web:6b3deb3240a84f329d7313",
  measurementId: "G-6HCP82K72Q",
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export { serverTimestamp, onAuthStateChanged };

// Helper to get current user as a Promise
export function getCurrentUser() {
  return new Promise((resolve) => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      unsubscribe();
      resolve(user || null);
    });
  });
}


