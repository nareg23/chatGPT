import { getApp, getApps, initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// TODO: Replace the following with your app's Firebase project configuration
const firebaseConfig = {
  apiKey: "AIzaSyBaVaa4oLyo5psiy5LdlSAnq87qm55GAzc",
  authDomain: "chatgpt-clone-24d7f.firebaseapp.com",
  projectId: "chatgpt-clone-24d7f",
  storageBucket: "chatgpt-clone-24d7f.appspot.com",
  messagingSenderId: "364021754346",
  appId: "1:364021754346:web:278c6a5c41f3d085886a93",
};

const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
