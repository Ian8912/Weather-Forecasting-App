import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Firebase configuration for front-end hosting
const frontendConfig = {
  apiKey: "AIzaSyA2iOAOb0KDad1VGYCgsvKKq8tVOqAXkgI",
  authDomain: "weatherlinkdatabase.firebaseapp.com",
  projectId: "weatherlinkdatabase",
  storageBucket: "weatherlinkdatabase.appspot.com",
  messagingSenderId: "1071771666509",
  appId: "1:1071771666509:web:d977aa23171039bfd9b404",
};

// Firebase configuration for feedback storage
const feedbackConfig = {
  apiKey: "AIzaSyA2iOAOb0KDad1VGYCgsvKKq8tVOqAXkgI",
  authDomain: "weatherlinkdatabase.firebaseapp.com",
  projectId: "weatherlinkdatabase",
  storageBucket: "weatherlinkdatabase.firebasestorage.app",
  messagingSenderId: "1071771666509",
  appId: "1:1071771666509:web:d977aa23171039bfd9b404",
};

// Initialize Firebase apps
const frontendApp = initializeApp(frontendConfig); // Default app
const feedbackApp = initializeApp(feedbackConfig, "feedbackApp"); // Named app

// Initialize Firestore instances
const frontendDb = getFirestore(frontendApp);
const feedbackDb = getFirestore(feedbackApp);

export { frontendDb, feedbackDb };
