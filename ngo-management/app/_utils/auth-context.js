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
import { getUserByUid } from "../_services/user-services";

const AuthContext = createContext();


export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null); // Assuming the role information is available in the userProfile fetched from the database
  const [errorMessages, setErrorMessages] = useState(null);
  const [databaseVersion, setDatabaseVersion] = useState(0);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        const profile = await getUserByUid(currentUser.uid);
        setRole(profile.role);
      } else {
        setUser(null);
        setRole(null);
      }
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
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const profile = await getUserByUid(userCredential.user.uid);
      setRole(profile.role);
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
      value={{ user, role, gitHubSignIn, googleSignIn, emailSignIn, firebaseSignOut, errorMessages,}}
    >
      {children}
    </AuthContext.Provider>
    );
  };


export const useUserAuth = () => {
  return useContext(AuthContext);
};


