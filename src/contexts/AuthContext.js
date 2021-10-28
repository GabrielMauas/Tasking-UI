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
    signInWithPopup 
} from 'firebase/auth';


const AuthContext = React.createContext();

const googleProvider = new GoogleAuthProvider();

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
        signInWithGoogle
    }


    return (
        <AuthContext.Provider value={value} >
            { !loading && children }
        </AuthContext.Provider>
    )
}