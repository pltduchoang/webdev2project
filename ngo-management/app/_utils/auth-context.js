// authContext.js
"use client";
import { useContext, createContext, useState, useEffect } from "react";
import {
  signInWithPopup,
  signOut,
  onAuthStateChanged,
  GithubAuthProvider,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "./firebase";

const AuthContext = createContext();


export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [errorMessages, setErrorMessages] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, [user]);

  const gitHubSignIn = () => {
    const provider = new GithubAuthProvider();
    return signInWithPopup(auth, provider);
  };

  const googleSignIn = () => {
    const provider = new GoogleAuthProvider();
    return signInWithPopup(auth, provider);
  };

  const emailSignIn = async (email, password) => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      setUser(userCredential.user);
      setErrorMessages(null);
    } catch (error) {
      switch (error.code) {
        case "auth/user-not-found":
          setErrorMessages('User does not exist.');
          console.log(errorMessages);
          break;
        case "auth/wrong-password":
          setErrorMessages('Incorrect password.');
          console.log(errorMessages);
          break;
        default:
          setErrorMessages('Error signing in: Check your email/password', error.message);
          console.log(errorMessages);
          break;
    }
    setTimeout(() => {
      setErrorMessages(null);
    }, 3000);
  };
};



  const firebaseSignOut = () => {
    return signOut(auth);
  };

  return (
    <AuthContext.Provider
      value={{ user, gitHubSignIn, googleSignIn, emailSignIn, firebaseSignOut, errorMessages }}
    >
      {children}
    </AuthContext.Provider>
    );
  };


export const useUserAuth = () => {
  return useContext(AuthContext);
};


