import { initializeApp } from "firebase/app";
import { getFirestore, collection } from "firebase/firestore";
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: process.env.REACT_APP_TASKING_FB_API_KEY,
  authDomain: process.env.REACT_APP_TASKING_FB_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_TASKING_FB_PROJECT_ID,
  storageBucket: process.env.REACT_APP_TASKING_FB_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_TASKING_FB_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_TASKING_FB_APP_ID
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
export const db = getFirestore(firebaseApp);
export const foldersRef = collection(db, 'folders');
 
export const auth = getAuth(firebaseApp);

