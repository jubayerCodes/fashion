"use client"

import React, { createContext, useEffect, useState } from 'react';
import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut, updateProfile } from "firebase/auth";
import app from '@/app/utilities/firebase/firebase.config';


export const AuthContext = createContext(null)
const auth = getAuth(app);


const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(null)

    const [loading, setLoading] = useState(true)

    const [refresh, setRefresh] = useState(false)

    const signUpWithEmail = (email, password) => {
        setLoading(true)
        return createUserWithEmailAndPassword(auth, email, password)
    }

    const signInWithEmail = (email, password) => {
        setLoading(true)
        return signInWithEmailAndPassword(auth, email, password)
    }

    const updatePhotoAndName = (newUser, name, photo) => {
        setLoading(true)
        return updateProfile(newUser, {
            displayName: name,
            photoURL: photo
        })
    }

    const logOut = () => {
        setLoading(true)
        return signOut(auth)
    }


    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser)
            setLoading(false)
        })

        return () => {
            return unsubscribe()
        }
    }, [refresh])


    console.log(user);

    const authInfo = {
        user, loading, setLoading, signUpWithEmail, signInWithEmail, refresh, setRefresh, updatePhotoAndName, logOut
    }

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;