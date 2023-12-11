"use client";
import { useState, useEffect } from "react";



export default function VolunteerCard ({userDetails, passEdit}) {
    const [user, setUser] = useState(null);

    useEffect(() => {
        setUser(userDetails);
    }, [userDetails]);

    const handleEdit = () => {
        passEdit(user);
    };


    return (
        <div className="w-full rounded-md p-10 textColor backgroundDarkColor transition-all duration-300 ease-in-out flex flex-row hover:bg-stone-600 hover:cursor-pointer"
        onClick={handleEdit}
        >
            {user && (
            <div className="w-full">
                <p className=" inline-block ml-2 w-1/12 text-left">{user.firstName}</p>
                <p className=" inline-block ml-2 w-1/12 text-left">{user.lastName}</p>
                <p className=" w-6/12 inline-block ml-2 lg:w-3/12 xl:w-3/12 text-left">{user.email}</p>
                {user.phone ? (
                    <p className=" inline-block ml-1 w-2/12 lg:w-1/12">{user.phone}</p>
                ):(
                    <p className=" inline-block ml-1 w-2/12 lg:w-1/12">No Data</p>
                )}
                {user.addressLine1 ? (
                    <p className="hidden lg:inline-block lg:w-3/12 ml-1 xl:w-3/12">{user.addressLine1}</p>
                ):(
                    <p className="hidden lg:inline-block lg:w-3/12 ml-1 xl:w-2/12">No Data</p>
                )}
                {user.city ? (
                    <p className="hidden lg:inline-block ml-1 w-1/12">{user.city}</p>
                ):(
                    <p className="hidden lg:inline-block ml-1 w-1/12">No Data</p>
                )}
                {user.postalCode ? (
                    <p className="hidden xl:inline-block ml-1 xl:w-1/12">{user.postalCode}</p>
                ):(
                    <p className="hidden xl:inline-block ml-1 xl:w-1/12">No Data</p>
                )}

            </div>
            )}
        </div>
        
    );
}
