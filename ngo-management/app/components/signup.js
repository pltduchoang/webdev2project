import React, { useEffect, useState } from 'react';
import InputWithFloatingLabel from '../components/input-floating-label';
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from '../_utils/firebase';
import { createUserProfile } from '../_services/user-services';
import PassWordInputField from './password-input-field';
import { sendEmailVerification } from "firebase/auth";



export default function SignUpForm({signUpCompleted}) {

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isVolunteer, setIsVolunteer] = useState(false); // You may use this state to determine if the user is a volunteer or not


    // This play any error with the password validation
    const [errorMessages, setErrorMessages] = useState(''); // You may use this state to display error messages to the user

    //password validation process
    const [isPasswordFocus, setIsPasswordFocus] = useState(false);
    const [passwordLengthCheck, setPasswordLengthCheck] = useState(false);
    const [passwordUpperCase, setPasswordUpperCase] = useState(false);
    const [passwordLowerCase, setPasswordLowerCase] = useState(false);  
    const [passwordNumber, setPasswordNumber] = useState(false);
    const [passwordSpecialChar, setPasswordSpecialChar] = useState(false);
    const [errorSignUp, setErrorSignUp] = useState(null); // You may use this state to display error messages to the user

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


    // Password validation on submit
    const validatePassword = (password) => {
        // Minimum password length
        const minLength = 8;
      
        // Regular expressions to check for specific criteria
        const hasUpperCase = /[A-Z]/.test(password);
        const hasLowerCase = /[a-z]/.test(password);
        const hasNumber = /[0-9]/.test(password);
        const hasSpecialChar = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/.test(password);
        


        // Password must meet all criteria
        const isValid =
          password.length >= minLength &&
          hasUpperCase &&
          hasLowerCase &&
          hasNumber &&
          hasSpecialChar;
      
        return isValid;
      };

    const handlePasswordFocus = (focused) => {
        setIsPasswordFocus(focused);
    };


    // Handle form submission, create new credential and create new user profile in database
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
          setErrorMessages('Passwords do not match');
        } else if (!validatePassword(password)) {
            setErrorMessages('Password must be at least 8 characters long, and must contain at least one uppercase letter, one lowercase letter, one number, and one special character');
        } else {
          try {
            // Create the user with email and password
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const newUser = {
                firstName,
                lastName,
                email,
                phone: '',
                addressLine1: '',
                addressLine2: '',
                city: '',
                province: '',
                postalCode: '',
                role: isVolunteer ? 'volunteer' : 'guest',
                createAt: new Date(),
                birthday,
              // You may add other details here as needed
            };
            await sendEmailVerification(userCredential.user);
            // Save user profile to Firestore
            await createUserProfile(userCredential.user.uid, newUser); // Define createUserProfile function
    
            signUpCompleted(); // Trigger the completion callback after successful signup
          
        } catch (error) {
            // Handle any signup errors
            console.error("Error signing up:", error.message);
            setErrorSignUp(error.message);
            // Set an error state to display the error message to the user
          }
        }
      };
        
    useEffect(() => {
        setErrorMessages(null);
        setErrorSignUp('');
    }, []);

    return (
        <div className='backgroundDarkColor rounded-xl flex flex-col'>
            <div className=''>
                <h2 className='text-3xl text-center textColor py-5 itemColor rounded-t-xl'>Sign Up Form</h2>
            </div>
            <form onSubmit={handleSubmit} className='textColor flex flex-col space-y-4 p-10'>
            
            <InputWithFloatingLabel
                label='First Name'
                id='firstName'
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
            />
            <InputWithFloatingLabel
                label='Last Name'
                id='lastName'
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
            />
            <InputWithFloatingLabel
                label='Email'
                id='email'
                type='email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
            />
            <div className='flex items-center justify-center'>
                <button 
                onClick={() => setIsVolunteer(!isVolunteer)}
                className={`p-2 rounded-md textColor transition-all duration-300 ease-in-out  myBorder hover:bg-stone-500 hover:opacity-100 ${isVolunteer? 'itemColor opacity-100' : 'backgroundDarkColor opacity-30'}`}>
                    <p>I want to Volunteer</p>
                </button>
            </div>
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

            <InputWithFloatingLabel
                label='Confirm Password'
                id='confirmPassword'
                type='password'
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
            />
            {errorMessages && (
                <p className="text-red-500">{errorMessages}</p>
            )}
            {errorSignUp  && (
            <p className="text-red-500">{errorSignUp}</p>
            )}
            <div className='w-full flex justify-center items-center'>
                <button
                    className='rounded-md myBorder p-2 backgroundDarkColor opacity-80 hover:opacity-100 hover:bg-stone-500 transition duration-300 ease-in-out w-40 md-w-48 lg-w-56'
                    type='submit'
                >
                Submit
                </button>
            </div>
            </form>
        </div>
    );
}