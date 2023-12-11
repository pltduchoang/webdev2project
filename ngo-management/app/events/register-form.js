"use client";   
import { useEffect, useState } from 'react';
import { useUserAuth } from '../_utils/auth-context';
import InputWithFloatingLabel from '../components/input-floating-label';
import { updateEvent } from '../_services/event-services';
import { getUserByUid, updateUserProfile } from '../_services/user-services';

export default function RegisterForm({event, formTitle, isSubmitted}) {
    const { user } = useUserAuth();

    const [userFromDatabase, setUserFromDatabase] = useState();

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState(user ? user.email : '');
    const [addressLine1, setAddressLine1] = useState('');
    const [addressLine2, setAddressLine2] = useState('');
    const [city, setCity] = useState('');
    const [postalCode, setPostalCode] = useState('');
    const [province, setProvince] = useState('');
    const [birthday, setBirthday] = useState('');


    const fetchUserFromDatabase = async () => {
        const response = await getUserByUid(user.uid);
        console.log('Data received by useEffect',response);
        setUserFromDatabase(response);
        if (response) {
            setFirstName(response.firstName || '');
            setLastName(response.lastName || '');
            setPhone(response.phone || '');
            setEmail(response.email || '');
            setAddressLine1(response.addressLine1 || '');
            setAddressLine2(response.addressLine2 || '');
            setCity(response.city || '');
            setPostalCode(response.postalCode || '');
            setProvince(response.province || '');
            setBirthday(response.birthday || '');
        }
    };

    useEffect(() => {
        fetchUserFromDatabase();
        console.log(userFromDatabase);
    }, []);


    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('Submit button clicked');
        
        console.log(event);
        const userData = {
            id: userFromDatabase.id,
            firstName,
            lastName,
            phone,
            email,
            addressLine1,
            addressLine2,
            city,
            postalCode,
            province,
            birthday,
        };
    
        if (formTitle === 'Attendee') {
            if (!event.attendees) {
                event.attendees = [];
            }
            event.attendees.push(userData);
        } else if (formTitle === 'Volunteer') {
            if (!event.volunteers) {
                event.volunteers = [];
            }
            event.volunteers.push(userData);
        }
    
        console.log('New user data', userData);
    
        // Update user data to database (call your updateUserProfile function here)
        await updateUserProfile(userFromDatabase.id, userData);
    
        console.log('New event', event);
        // Update event data in Firestore
        await updateEvent(event);
        isSubmitted();
    };


    return (
        <div className='backgroundDarkColor rounded-xl'>
            <div className=''>
                <h2 className='text-3xl text-center textColor py-5 itemColor rounded-t-xl'>{formTitle} Registration Form</h2>
            </div>
            <form onSubmit={handleSubmit} className='textColor flex flex-col space-y-4 p-10'>
            
            {userFromDatabase && userFromDatabase.firstName ? (
                <div className='flex flex-col'>
                <label className='text-lg ml-2 w-full' htmlFor='firstName'>
                    First Name
                </label>
                <label className='text-2xl w-full ml-10 text-slate-400'>
                    {userFromDatabase.firstName}
                </label>
                </div>
            ) : (
                <InputWithFloatingLabel
                label='First Name'
                id='firstName'
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
                />
            )}
            {userFromDatabase && userFromDatabase.lastName ? (
                <div className='flex flex-col'>
                <label className='text-lg ml-2 w-full' htmlFor='lastName'>
                    Last Name
                </label>
                <label className='text-2xl w-full ml-10 text-slate-400'>
                    {userFromDatabase.lastName}
                </label>
                </div>
            ) : (
                <InputWithFloatingLabel
                label='Last Name'
                id='lastName'
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
                />
            )}

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
                type='email'
                onChange={(e) => setEmail(e.target.value)}
            />
            )}

            {userFromDatabase && userFromDatabase.phone ? (
                <div className='flex flex-col'>
                <label className='text-lg ml-2 w-full' htmlFor='phoneNumber'>
                    Phone Number
                </label>
                <label className='text-2xl w-full ml-10 text-slate-400'>
                    {userFromDatabase.phone}
                </label>
                </div>
            ) : (
                <InputWithFloatingLabel
                label='Phone Number'
                id='phoneNumber'
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
                />
            )}

            {userFromDatabase && userFromDatabase.addressLine1 ? (
                <div className='flex flex-col'>
                <label className='text-lg ml-2 w-full' htmlFor='addressLine1'>
                    Address Line 1
                </label>
                <label className='text-2xl w-full ml-10 text-slate-400'>
                    {userFromDatabase.addressLine1}
                </label>
                </div>
            ) : (
                <InputWithFloatingLabel
                label='Address Line 1'
                id='addressLine1'
                value={addressLine1}
                onChange={(e) => setAddressLine1(e.target.value)}
                />
            )}
            
            {userFromDatabase && userFromDatabase.addressLine2 ? (
                <div className='flex flex-col'>
                <label className='text-lg ml-2 w-full' htmlFor='addressLine2'>
                    Address Line 2
                </label>
                <label className='text-2xl w-full ml-10 text-slate-400'>
                    {userFromDatabase.addressLine2}
                </label>
                </div>
            ) : (
                <InputWithFloatingLabel
                label='Address Line 2'
                id='addressLine2'
                value={addressLine2}
                onChange={(e) => setAddressLine2(e.target.value)}
                />
            )}


            {userFromDatabase && userFromDatabase.city ? (
                <div className='flex flex-col'>
                <label className='text-lg ml-2 w-full' htmlFor='city'>
                    City
                </label>
                <label className='text-2xl w-full ml-10 text-slate-400'>
                    {userFromDatabase.city}
                </label>
                </div>
            ) : (
                <InputWithFloatingLabel
                label='City'
                id='city'
                value={city}
                onChange={(e) => setCity(e.target.value)}
                />
            )}

            {userFromDatabase && userFromDatabase.postalCode ? (
                <div className='flex flex-col'>
                <label className='text-lg ml-2 w-full' htmlFor='postalCode'>
                    Postal Code
                </label>
                <label className='text-2xl w-full ml-10 text-slate-400'>
                    {userFromDatabase.postalCode}
                </label>
                </div>
            ) : (
                <InputWithFloatingLabel
                label='Postal Code'
                id='postalCode'
                value={postalCode}
                onChange={(e) => setPostalCode(e.target.value)}
                />
            )}

            {userFromDatabase && userFromDatabase.province ? (
                <div className='flex flex-col'>
                <label className='text-lg ml-2 w-full' htmlFor='province'>
                    Province
                </label>
                <label className='text-2xl w-full ml-10 text-slate-400'>
                    {userFromDatabase.province}
                </label>
                </div>
            ) : (
                <InputWithFloatingLabel
                label='Province'
                id='province'
                value={province}
                onChange={(e) => setProvince(e.target.value)}
                />
            )}
            
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

            <p className='text-center'>Filling this form will also update your profile with us</p>
            <div className='w-full flex justify-center'>
                <button
                    className='rounded-md myBorder py-2 px-5 backgroundDarkColor opacity-80 hover:opacity-100 hover:bg-stone-500 transition duration-300 ease-in-out'
                    type='submit'
                >
                Submit
                </button>
            </div>
            </form>
        </div>
    );
}
