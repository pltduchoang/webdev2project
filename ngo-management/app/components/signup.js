import React, { useState } from 'react';
import { useUserAuth } from '../_utils/auth-context';
import InputWithFloatingLabel from '../components/input-floating-label';

export default function SignUpForm() {
    const { user } = useUserAuth();
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
    };

    return (
        <div className='backgroundDarkColor rounded-xl'>
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
            <InputWithFloatingLabel
                label='Password'
                id='password'
                type='password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
            />
            <InputWithFloatingLabel
                label='Confirm Password'
                id='confirmPassword'
                type='password'
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
            />

            <button
                className='rounded-md myBorder p-2 mx-56 backgroundDarkColor opacity-80 hover:opacity-100 hover:bg-stone-500 transition duration-300 ease-in-out'
                type='submit'
            >
            Submit
            </button>
            </form>
        </div>
    );
}