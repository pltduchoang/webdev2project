"use client";
import { useUserAuth } from "../_utils/auth-context";
import InputWithFloatingLabel from "./input-floating-label";
import { useState } from "react";

export default function LogInCard ({signUpState}) {
    const { user, gitHubSignIn, googleSignIn, emailSignIn, firebaseSignOut, errorMessages} = useUserAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSignIn = (event) => {
        event.preventDefault();
        emailSignIn(email, password);
    };

    const handleSignUp = () => {
        signUpState();
    };



    return (
        <div className="w-full h-full p-6 backgroundDarkColor rounded-lg  shadow-xl space-y-10 textColor opacity-100">
          <div className="mb-6">
            <h2 className="text-2xl font-semibold mb-6 ml-2">Sign In</h2>
            <form onSubmit={handleSignIn}>
              <div className="mb-4">
                <label htmlFor="email" className=" mb-1 hidden">Email</label>
                <InputWithFloatingLabel 
                label="Email" 
                id="email" 
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={user !== null}/>
                
              </div>
              <div className="mb-4">
                <label htmlFor="password" className="hidden mb-1">Password</label>
                <InputWithFloatingLabel 
                label="Password" 
                id="password" 
                type="password"
                value={password}
                onChange={(e)=> setPassword(e.target.value)}
                disabled={user !== null} />
              </div>
              {user !== null && (
                <p className="text-green-500">You are signed in as {user.email}</p>
              )}
              {errorMessages && (
                <p className="text-red-500">{errorMessages}</p>
              )}
              <div className="flex justify-between items-center mb-4">
                <button disabled={user != null} type="submit" className="w-6/12 itemColor textColor rounded-lg mt-4 py-4 opacity-80 transition duration-300 ease-in-out hover:opacity-100">Sign In</button>
                {user !== null ?(
                  <button onClick={firebaseSignOut} className="w-5/12 itemColor textColor rounded-lg mt-4 py-4 opacity-80 transition duration-300 ease-in-out hover:opacity-100">Sign Out</button>
                ):(
                  <button onClick={handleSignUp} className="w-5/12 itemColor textColor rounded-lg mt-4 py-4 opacity-80 transition duration-300 ease-in-out hover:opacity-100">Sign Up</button>
                )
                }
              </div>
            </form>
          </div>
          <hr className="mb-6 bg-slate-400" />
          <div>
            <h2 className="text-2xl font-semibold mb-6 ml-2">Or sign in with:</h2>
            <div className="flex flex-col space-y-6">
              <button onClick={gitHubSignIn} className="w-full itemColor textColor rounded-lg py-4 opacity-80 transition duration-300 ease-in-out hover:opacity-100">GitHub</button>
              <button onClick={googleSignIn} className="w-full itemColor textColor rounded-lg py-4 opacity-80 transition duration-300 ease-in-out hover:opacity-100">Google</button>
            </div>
          </div>
        </div>
      );
}
