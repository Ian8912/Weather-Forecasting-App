import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyBFCQ9eBUEmc7FkERC0tzvfOpZQmzoGIWs",
  authDomain: "weatherlink-ac684.firebaseapp.com",
  projectId: "weatherlink-ac684",
  storageBucket: "weatherlink-ac684.appspot.com",
  messagingSenderId: "586202821312",
  appId: "1:586202821312:web:5c6daf4b660634eed6f325",
  measurementId: "G-GT64NDNBQG"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);

export { app, analytics, db };