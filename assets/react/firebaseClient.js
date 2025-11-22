import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyCeGrIbrGaQD2v7c57fZPc2JGaNzGwcMV4",
  authDomain: "cultura-x.firebaseapp.com",
  projectId: "cultura-x",
  storageBucket: "cultura-x.firebasestorage.app",
  messagingSenderId: "725630864234",
  appId: "1:725630864234:web:6b3deb3240a84f329d7313",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);

