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
        if(profile){
          setRole(profile.role);
        }
      } else {
        setUser(null);
        setRole(null);
      }
    });
    return () => unsubscribe();
  }, [user]);

  const gitHubSignIn = async () => {
    try {
      const provider = new GithubAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      
      // Check if the user exists in your database
      const profile = await getUserByUid(user.uid);
      
      if (!profile) {
        // If the user profile doesn't exist, create a new profile in your database
        const newUser = {
          firstName:'',
          lastName: '',
          email: user.email,
          // Other details you want to set in the user profile
          role: 'guest', // or assign roles based on Google sign-in
          createdAt: new Date(),
          phone: '',
          addressLine1: '',
          addressLine2: '',
          city: '',
          province: '',
          postalCode: '',
          birthday: '',
          // ...
        };
        
        // Create the user profile in the database
        await createUserProfile(user.uid, newUser);

        setRole('guest');

      }
      else {
        setRole(profile.role);
      }
      
      setUser(user);
      setErrorMessages(null);
    } catch (error) {
      // Handle GitHub sign-in errors
      setErrorMessages('Error signing in with GitHub');
      console.error('GitHub Sign-In Error:', error);
    }
  };

  const googleSignIn = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      
      // Check if the user exists in your database
      const profile = await getUserByUid(user.uid);
      
      if (!profile) {
        // If the user profile doesn't exist, create a new profile in your database
        const newUser = {
          firstName: '',
          lastName: '',
          email: user.email,
          // Other details you want to set in the user profile
          role: 'guest', // or assign roles based on Google sign-in
          createdAt: new Date(),
          phone: '',
          addressLine1: '',
          addressLine2: '',
          city: '',
          province: '',
          postalCode: '',
          birthday: '',
          // ...
        };
        
        // Create the user profile in the database
        await createUserProfile(user.uid, newUser);

        setRole('guest');
      } else {
        setRole(profile.role);
      }
      
      setUser(user);
      setErrorMessages(null);
    } catch (error) {
      // Handle Google sign-in errors
      setErrorMessages('Error signing in with Google');
      console.error('Google Sign-In Error:', error);
    }
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
      value={{ user, role, setRole, gitHubSignIn, googleSignIn, emailSignIn, firebaseSignOut, errorMessages,}}
    >
      {children}
    </AuthContext.Provider>
    );
  };


export const useUserAuth = () => {
  return useContext(AuthContext);
};


