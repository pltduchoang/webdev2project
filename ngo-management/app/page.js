"use client";
import Footer from "./components/footer";
import Logo from "./components/logo";
import { useUserAuth } from "./_utils/auth-context";
import { useState, useEffect } from "react";
import Link from "next/link";
import LogInCard from "./components/login-card";
import BackgroundImage from "./components/background-image";
import NavBar from "./components/navbar";
import SignUpForm from "./components/signup";
import { sendEmailVerification } from "firebase/auth";
export default function Home() {

  
  const { user, firebaseSignOut } = useUserAuth();
  const [showLoggedInMessage, setShowLoggedInMessage] = useState(false);
  const [showSignUpForm, setShowSignUpForm] = useState(false);
    //popup a message after 2 seconds if user is logged in
    
    useEffect(() => {
      let timeout;
  
      if (user) {
        timeout = setTimeout(() => {
          console.log('User: ', user);
          setShowLoggedInMessage(true);
          console.log('Verified user: ', user.emailVerified);
        }, 1000); // Show the message after 2 seconds
      }
  
      return () => {
        clearTimeout(timeout);
      };
    }, [user]);

    const handleSignUp = () => {
      setShowSignUpForm(true);
    };

    const handleCloseSignUpForm = () => {
      setShowSignUpForm(false);
    };



  const handleModalClose = () => {
    setShowLoggedInMessage(false);
  };

  return (
    <main> 
      <div className="flex items-center p-6 backgroundDarkColor">
        <div className="w-8/12 pl-6 flex items-center"> 
            <Logo/>
            <p className="ml-6 text-xl md:text-4xl textColor">HELP YOU HELP OTHERS</p>
        </div>
      </div>
      <NavBar/>
      <div className="flex justify-center lg:justify-end">
        <div className=" max-w-3xl w-full lg:w-1/2 xl:w-5/12 md:w-8/12 md:px-10 lg:px-20 pt-20">
            <LogInCard signUpState={handleSignUp}/>
        </div>
      </div>
      
      <div className="fixed bottom-0 left-0 w-full">
        <Footer/>
      </div>
      <BackgroundImage/>
      {showLoggedInMessage && (
        <Link href="/common-pages">
          <div className="fixed inset-0 flex items-center justify-center backgroundDarkColor bg-opacity-75" style={{zIndex:3}} onClick={handleModalClose}>
            <div className="backgroundLightColor p-6 rounded shadow-md textColor">
              {user.emailVerified ? (
                <p>You are logged in as<Link className='py-1 px-2 transition duration-300 ease-in-out hover:bg-orange-500 rounded-md myBorder text-sm' href='/common-pages' >Click here to proceed.</Link></p>
              ):(
                <div className="flex flex-col justify-center">
                  <p>You are logged in but your email is not verified. Please check your email for verification link.</p>
                  <p className="text-center"><Link className='py-1 px-2 transition duration-300 ease-in-out hover:bg-orange-500 rounded-md myBorder text-sm' href='/common-pages' >Click here to proceed.</Link></p>
                  <button>
                    <p className="textColor opacity-80 hover:opacity-100 transition duration-300 ease-in-out" onClick={() => sendEmailVerification(user)} >Resend verification email</p>
                  </button>
                </div>
              )}
            </div>
          </div>
        </Link>
      )}
      {showSignUpForm && (
          <div
              className="fixed top-0 left-0 min-h-screen w-full backgroundLightColor opacity-100 flex"
              style={{ zIndex: 1 }}
              onClick={(e) => e.stopPropagation()}
          >
              <div className="fixed bottom-20 right-8">
                  <button
                      onClick={handleCloseSignUpForm}
                      className="itemColor textColor opacity-80 rounded-full p-4 shadow-lg transition duration-300 ease-in-out focus:outline-none hover:opacity-100"
                      style={{zIndex: 3}}
                  >
                      <p className="mx-3 text-5xl">x</p>
                  </button>
              </div>
              <div
                  className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full md:w-8/12 lg:w-6/12"
                  onClick={(e) => e.stopPropagation()}
                  style={{zIndex: 2}}
              >
                  <SignUpForm signUpCompleted={handleCloseSignUpForm}/>
              </div>
          </div>
      )}
    </main>
  )
}
