"use client";   
import { useState } from 'react';
import { useUserAuth } from '../_utils/auth-context';
import InputWithFloatingLabel from '../components/input-floating-label';
import { updateEvent } from '../_services/event-services';

export default function RegisterForm({event, formTitle, isSubmitted}) {
    const { user } = useUserAuth();

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [email, setEmail] = useState(user ? user.email : '');
    const [addressLine1, setAddressLine1] = useState('');
    const [addressLine2, setAddressLine2] = useState('');
    const [city, setCity] = useState('');
    const [province, setProvince] = useState('');
    const [birthday, setBirthday] = useState('');

    const handleSubmit = async (e) => {
    e.preventDefault();

    // Handle form submission here, you can send the form data to your backend or perform any necessary actions
    // For example:
    console.log(event);
    const userData = {
        firstName,
        lastName,
        phoneNumber,
        email,
        addressLine1,
        addressLine2,
        city,
        province,
        birthday,
        };

        if (formTitle === 'Attendee') {
            if (event.attendees === "") {
                event.attendees = [];
                event.attendees.push(userData);
            }
            else {
                event.attendees.push(userData);
            }
        } else if (formTitle === 'Volunteer') {
            if (event.volunteers === "") {
                event.volunteers = [];
                event.volunteers.push(userData);
            }
            else {
                event.volunteers.push(userData);
            }
        };

    await updateEvent(event);    
    isSubmitted(true);


    // Reset form fields after submission (if needed)
    setFirstName('');
    setLastName('');
    setPhoneNumber('');
    setEmail('');
    setAddressLine1('');
    setAddressLine2('');
    setCity('');
    setProvince('');
    setBirthday('');
    };

    return (
        <div className='backgroundDarkColor rounded-xl'>
            <div className=''>
                <h2 className='text-3xl text-center textColor py-5 itemColor rounded-t-xl'>{formTitle} Registration Form</h2>
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
                label='Phone Number'
                id='phoneNumber'
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                required
            />
            {user ? (
            <div className='flex flex-col'>
                <label className='text-lg ml-2 w-full' htmlFor='email'>
                    Email
                </label>
                <label className='text-2xl w-full ml-10 text-slate-400'>
                    {user.email}
                </label>
            </div>
            ):(
            <InputWithFloatingLabel
                label='Email'
                id='email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            )}
            <InputWithFloatingLabel
                label='Address Line 1'
                id='addressLine1'
                value={addressLine1}
                onChange={(e) => setAddressLine1(e.target.value)}
            />
            <InputWithFloatingLabel
                label='Address Line 2'
                id='addressLine2'
                value={addressLine2}
                onChange={(e) => setAddressLine2(e.target.value)}
            />
            <InputWithFloatingLabel
                label='City'
                id='city'
                value={city}
                onChange={(e) => setCity(e.target.value)}
            />
            <InputWithFloatingLabel
                label='Province'
                id='province'
                value={province}
                onChange={(e) => setProvince(e.target.value)}
            />
            <div className='relative'>
                <label className='text-2xl ml-2' htmlFor='birthday'>
                    Birthday
                </label>
                <input
                    type='date'
                    id='birthday'
                    value={birthday}
                    onChange={(e) => setBirthday(e.target.value)}
                    className='block text-xl w-full px-4 backgroundDarkColor textColor border-b-2 border-stone-700 outline-none h-10'
                />
            </div>
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
