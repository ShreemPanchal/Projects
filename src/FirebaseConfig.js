// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCk8s6EnEKL4mGxRdraypLcson80KumqhI",
  authDomain: "my-project-d42c4.firebaseapp.com",
  projectId: "my-project-d42c4",
  storageBucket: "my-project-d42c4.appspot.com",
  messagingSenderId: "26929503514",
  appId: "1:26929503514:web:2b2c6053f0ac9f5bcce0a3",
  measurementId: "G-32XMJ2GEHN",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);
const storage = getStorage(app);
export { app, analytics, db, storage };
