import { initializeApp } from "firebase/app";
import { getFirestore, collection } from "firebase/firestore";
import { getAuth } from 'firebase/auth';


const isProduction = () => {
  if(process.env.NODE_ENV === 'production') {
    return true
  } else {
    return false
  }
}

const firebaseApp = initializeApp({
  apiKey: isProduction() ? process.env.REACT_APP_TASKING_FB_API_KEY_PROD : process.env.REACT_APP_TASKING_FB_API_KEY,
  authDomain: isProduction() ? process.env.REACT_APP_TASKING_FB_AUTH_DOMAIN_PROD : process.env.REACT_APP_TASKING_FB_AUTH_DOMAIN,
  projectId: isProduction() ? process.env.REACT_APP_TASKING_FB_PROJECT_ID_PROD : process.env.REACT_APP_TASKING_FB_PROJECT_ID,
  storageBucket: isProduction() ? process.env.REACT_APP_TASKING_FB_STORAGE_BUCKET_PROD : process.env.REACT_APP_TASKING_FB_STORAGE_BUCKET,
  messagingSenderId: isProduction() ? process.env.REACT_APP_TASKING_FB_MESSAGING_SENDER_ID_PROD : process.env.REACT_APP_TASKING_FB_MESSAGING_SENDER_ID,
  appId: isProduction() ? process.env.REACT_APP_TASKING_FB_APP_ID_PROD : process.env.REACT_APP_TASKING_FB_APP_ID
})



// console.log(isProduction());

// Initialize Firebase
// const firebaseApp = initializeApp(firebaseConfig);
export const db = getFirestore(firebaseApp);
export const foldersRef = collection(db, 'folders');
 export const auth = getAuth(firebaseApp);

