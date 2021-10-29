import React, { useContext, useState, useEffect } from 'react'
import { auth } from '../firebase/firebaseConfig';
import { 
    createUserWithEmailAndPassword, 
    onAuthStateChanged, 
    signInWithEmailAndPassword,
    signOut,
    sendPasswordResetEmail,
    updateEmail,
    updatePassword,
    GoogleAuthProvider,
    signInWithPopup,
    OAuthProvider,
    FacebookAuthProvider,
    GithubAuthProvider
} from 'firebase/auth';


const AuthContext = React.createContext();

const googleProvider = new GoogleAuthProvider();
const microsoftProvider = new OAuthProvider('microsoft.com');
const facebookProvider = new FacebookAuthProvider();
const githubProvider = new GithubAuthProvider();

export const useAuth = () => {
    return useContext(AuthContext);
}

export function AuthProvider({ children }) {
    const [currentUser, setCurrentUser] = useState();
    const [loading, setLoading] = useState(true);

    const signUp = (email, pass) => {
        return createUserWithEmailAndPassword(auth, email, pass);
    }
    const logIn = (email, pass) => {
        return signInWithEmailAndPassword(auth, email, pass);
    }
    const logOut = () => {
        return signOut(auth);
    }
    const resetPass = (email) => {
        return sendPasswordResetEmail(auth, email);
    }
    const updateEm = (email) => {
        return updateEmail(currentUser, email);
    }
    const updatePass = (pass) => {
        return updatePassword(currentUser, pass);
    }
    const signInWithGoogle = () => {
        return signInWithPopup(auth, googleProvider);
    }
    const signInWithMicrosoft = () => {
        return signInWithPopup(auth, microsoftProvider);
    }
    const signInWithFacebook = () => {
        return signInWithPopup(auth, facebookProvider);
    }
    const signInWithGithub = () => {
        return signInWithPopup(auth, githubProvider);
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setCurrentUser(user);
            setLoading(false);
        })
        return unsubscribe;
    }, []);

    const value = {
        currentUser,
        signUp,
        logIn,
        logOut,
        resetPass,
        updateEm,
        updatePass,
        signInWithGoogle,
        signInWithMicrosoft,
        signInWithFacebook,
        signInWithGithub
    }


    return (
        <AuthContext.Provider value={value} >
            { !loading && children }
        </AuthContext.Provider>
    )
}