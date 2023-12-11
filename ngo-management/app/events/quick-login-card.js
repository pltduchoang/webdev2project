"use client";
import { useUserAuth } from "../_utils/auth-context";
import InputWithFloatingLabel from "../components/input-floating-label";
import { useEffect, useState } from "react";
import PassWordInputField from "../components/password-input-field";

export default function QuickLoginCard ({signUpState, onLogin}) {
    const { user, gitHubSignIn, googleSignIn, emailSignIn, firebaseSignOut, errorMessages} = useUserAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSignIn = (event) => {
        event.preventDefault();
        emailSignIn(email, password);
        setTimeout(() => {
          onLogin();
        }, 3000);
    };

    const handleSignUp = () => {
      // setEmail('');
      // setPassword('');  
      signUpState();
    };

    //password validation process
    const [isPasswordFocus, setIsPasswordFocus] = useState(false);
    const [passwordLengthCheck, setPasswordLengthCheck] = useState(false);
    const [passwordUpperCase, setPasswordUpperCase] = useState(false);
    const [passwordLowerCase, setPasswordLowerCase] = useState(false);  
    const [passwordNumber, setPasswordNumber] = useState(false);
    const [passwordSpecialChar, setPasswordSpecialChar] = useState(false);

    // Password validation on the go
    const handlePasswordChange = (password) => {
        const minLength = 8;
        const hasUpperCase = /[A-Z]/.test(password);
        const hasLowerCase = /[a-z]/.test(password);
        const hasNumber = /[0-9]/.test(password);
        const hasSpecialChar = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/.test(password);
    
        setPassword(password);
        setPasswordLengthCheck(password.length >= minLength);
        setPasswordUpperCase(hasUpperCase);
        setPasswordLowerCase(hasLowerCase);
        setPasswordNumber(hasNumber);
        setPasswordSpecialChar(hasSpecialChar);
    };

    const handlePasswordFocus = (focused) => {
      setIsPasswordFocus(focused);
    };


    // Password validation on submit
    useEffect(() => {
        setEmail('');
        setPassword('');
    }, []);
    
    

    return (
        <div className="w-full h-full p-6 backgroundDarkColor rounded-lg  shadow-xl space-y-10 textColor opacity-100">
          <div className="mb-6">
            <h2 className="text-2xl font-semibold mb-6 ml-2">Sign In - Guest & Volunteer</h2>
            <form onSubmit={handleSignIn}>
              <div className="mb-4">
                <label htmlFor="email" className=" mb-1 hidden">Email</label>
                <InputWithFloatingLabel 
                label="Email" 
                id="email" 
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={user !== null}
                autoComplete="off"
                />
                
                
              </div>
              <div className="mb-4">
              <PassWordInputField
                label='Password'
                id='password'
                type='password'
                value={password}
                onChange={(e) => handlePasswordChange(e.target.value)}
                required
                sendFocusStatus={handlePasswordFocus}
            />
            {isPasswordFocus && (
                <div className=' rounded-md w-48 pl-4'>
                    {passwordLengthCheck ? (
                    <p className="textColor">8 characters long</p>
                ):(
                    <p className="textColor opacity-40">8 characters long</p>
                )}
                {passwordUpperCase ? (
                    <p className="textColor">Uppercase letter</p>
                ):(
                    <p className="textColor opacity-40">Uppercase letter</p>
                )}
                {passwordLowerCase ? (
                    <p className="textColor">Lowercase letter</p>
                ):(
                    <p className="textColor opacity-40">Lowercase letter</p>
                )}
                {passwordNumber ? (
                    <p className="textColor">Number</p>
                ):(
                    <p className="textColor opacity-40">Number</p>
                )}
                {passwordSpecialChar ? (
                    <p className="textColor">Special !@#$%^&*..</p>
                ):(
                    <p className="textColor opacity-40">Special !@#$%^&*..</p>
                )}
                </div> 
            )}
              </div>
              {user !== null && (
                <div>
                  <p className="text-green-500">You are signed in as {user.email}.</p>
                  <p className="text-green-500 text-lg">Please manually refresh the page for proper functionality.</p>
                </div>
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
