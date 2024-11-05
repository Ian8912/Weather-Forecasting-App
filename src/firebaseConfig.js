import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyA2iOAOb0KDad1VGYCgsvKKq8tVOqAXkgI",
  authDomain: "weatherlinkdatabase.firebaseapp.com",
  projectId: "weatherlinkdatabase",
  storageBucket: "weatherlinkdatabase.appspot.com",
  messagingSenderId: "1071771666509",
  appId: "1:1071771666509:web:d977aa23171039bfd9b404"
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

export default db;