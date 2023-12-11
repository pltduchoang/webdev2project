"use client";
import { useEffect, useState } from "react";
import { updateUserProfile, deleteUserProfile, getUserByUid } from "@/app/_services/user-services";
import InputWithFloatingLabel from "@/app/components/input-floating-label";
import { useUserAuth } from "@/app/_utils/auth-context";


export default function UserEditForm({userDetails, isSubmitted}) {

    //user details
    const [firstName, setFirstName] = useState(userDetails.firstName);
    const [lastName, setLastName] = useState(userDetails.lastName);
    const [email, setEmail] = useState(userDetails.email);
    const [phone, setPhone] = useState(userDetails.phone);
    const [addressLine1, setAddressLine1] = useState(userDetails.addressLine1);
    const [addressLine2, setAddressLine2] = useState(userDetails.addressLine2);
    const [city, setCity] = useState(userDetails.city);
    const [postalCode, setPostalCode] = useState(userDetails.postalCode);
    const [province, setProvince] = useState(userDetails.province);
    const [birthday, setBirthday] = useState(userDetails.birthday);
    const [role, setRole] = useState(userDetails.role);


    //admin check
    const [isAdmin, setIsAdmin] = useState();

    //show tip for delete button
    const [showTip, setShowTip] = useState(false);
    //show confirmation for delete button
    const [showConfirmationBox, setShowConfirmationBox] = useState(false);

    //user auth
    const { user } = useUserAuth();



    //check if user is admin
    const adminCheck = async () => {
        const response = await getUserByUid(user.uid);
        if (response && response.role === 'admin') {
            setIsAdmin(true);
        } else {
            setIsAdmin(false);
        }
    };

    useEffect(() => {
        adminCheck();
        console.log('Editinguser', userDetails);
    }, []);

    useEffect(() => {
        console.log('isAdmin', isAdmin);
    }, [isAdmin]);

    //show confirmation box
    const showConfirmation = () => {
        setShowConfirmationBox(true);
    };
    //cancel delete
    const cancelDelete = () => {
        setShowConfirmationBox(false);
    };


    // // delete user from AUTH using API
    // const deleteUserAccount = async (userId) => {
    //     try {
    //         console.log('Deleting user', userId);
    //         const response = await fetch(`/api/deleteUser?uid=${userId}`, {
    //         method: 'DELETE',
    //       });
      
    //       if (response.ok) {
    //         const data = await response.json();
    //         console.log(data.message); // User deleted successfully
    //       } else {
    //         throw new Error('Failed to delete user');
    //       }
    //     } catch (error) {
    //       console.error('Error:', error.message);
    //       // Handle error
    //     }
    //   };
      
    // delete user from database and AUTH
    const handleDelete = async () => {
        // await deleteUserAccount(userDetails.id);
        await deleteUserProfile(userDetails.id);
        setShowConfirmationBox(false);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('Submit button clicked');
        console.log('User details', userDetails);
        const userData = {
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
            role,
        };
    
        console.log('New user data', userData);
    
        // Update user data to database (call your updateUserProfile function here)
        await updateUserProfile(userDetails.id, userData);
    
        
        isSubmitted();
    };

    return(
        <div className='backgroundDarkColor rounded-xl'>
            <div className=''>
                <h2 className='text-3xl text-center textColor py-5 itemColor rounded-t-xl'>Edit User</h2>
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
        
            
            <div className='flex flex-col'>
                <label className='text-lg ml-2 w-full' htmlFor='email'>
                    Email
                </label>
                <label className='text-2xl w-full ml-10 text-slate-400'>
                    {userDetails.email}
                </label>
            </div>
            

            
            <InputWithFloatingLabel
            label='Phone Number'
            id='phoneNumber'
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
            />

            
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
            label='Postal Code'
            id='postalCode'
            value={postalCode}
            onChange={(e) => setPostalCode(e.target.value)}
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

            {isAdmin && (
                <select
                    className="w-3/12  border-b-2 p-3 px-10 backgroundDarkColor opacity-80 hover:opacity-100 hover:bg-stone-500 transition duration-300 ease-in-out"
                    value={userDetails.role}
                    onChange={(e) => setRole(e.target.value)}

                >
                    <option value="guest">Guest</option>
                    <option value="volunteer">Volunteer</option>
                    <option value="staff">Staff</option>
                </select>
                )}

            <div className='flex justify-around w-full pt-6 relative'>
                <button
                className='w-3/12 rounded-md myBorder p-3 px-10 backgroundDarkColor opacity-80 hover:opacity-100 hover:bg-stone-500 transition duration-300 ease-in-out'
                type='submit'
                >
                Update
                </button>
                
                <button
                className='relative w-3/12 rounded-md myBorder p-3 px-10 backgroundDarkColor opacity-80 hover:opacity-100 hover:bg-stone-500 transition duration-300 ease-in-out'
                disabled={!isAdmin || userDetails.role === 'admin'}
                onMouseOver={()=>setShowTip(true)}
                onMouseLeave={()=>setShowTip(false)}
                onClick={showConfirmation}
                >
                Delete
                </button>
                {showTip && (
                <div className='absolute -top-28 myBorder right-36 mt-12 ml-10 w-40 p-2 rounded-md backgroundDarkColor textColor'>
                    {userDetails.role === 'admin' && (
                        <p className='text-center'>You cannot delete an admin</p>
                    )} 
                    {!isAdmin && (
                        <p className='text-center'>Admin required</p>
                    )}
                    {isAdmin && (
                        <p className='text-center'>Caution: Deleting user</p>
                    )}
                </div>
                )}
            </div>
            </form>
            {showConfirmationBox ? (
                <div className="w-full h-full fixed top-0 left-0 flex justify-center items-center backgroundLightColor">
                    <div className="confirmation-box w-1/2 backgroundDarkColor p-10 rounded-lg shadow-lg">
                        <p className="text-center mb-6 textColor">Are you sure you want to delete?</p>
                        <div className="w-full flex justify-evenly">
                            <button className="textColor w-1/4 px-1 py-1 myBorder rounded-md hover:bg-stone-400 transition duration-300 ease-in-out" onClick={handleDelete}>Confirm</button>
                            <button className="textColor w-1/4 px-1 py-1 myBorder rounded-md hover:bg-stone-400 transition duration-300 ease-in-out" onClick={cancelDelete}>Cancel</button>
                        </div>
                    </div>
                </div>
                    
            ) : null}
        </div>
    )

}