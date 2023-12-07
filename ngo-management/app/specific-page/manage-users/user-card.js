"use client";
import { useState, useEffect } from "react";



export default function UserCard ({userDetails}) {
    const [user, setUser] = useState(null);

    useEffect(() => {
        setUser(userDetails);
    }, [userDetails]);



    return (
        <div className="w-full rounded-md p-10 textColor backgroundDarkColor transition-all duration-300 ease-in-out flex flex-row hover:bg-stone-600 hover:cursor-pointer">
            {user && (
            <div className="w-full">
                <p className=" inline-block ml-2 w-1/12 text-left">{user.firstName}</p>
                <p className=" inline-block ml-2 w-1/12 text-left">{user.lastName}</p>
                <p className=" sm:w-3/12 inline-block ml-2 xl:w-2/12 text-left">{user.email}</p>
                {user.phone ? (
                    <p className=" inline-block ml-1 w-1/12">{user.phone}</p>
                ):(
                    <p className=" inline-block ml-1 w-1/12">No Data</p>
                )}
                {user.addressLine1 ? (
                    <p className=" sm:w-3/12 inline-block ml-1 xl:w-2/12">{user.addressLine1}</p>
                ):(
                    <p className=" sm:w-3/12 inline-block ml-1 xl:w-2/12">No Data</p>
                )}
                {user.city ? (
                    <p className=" inline-block ml-1 w-1/12">{user.city}</p>
                ):(
                    <p className=" inline-block ml-1 w-1/12">No Data</p>
                )}
                {user.postalCode ? (
                    <p className=" sm:hidden xl:inline-block ml-1 xl:w-1/12">{user.postalCode}</p>
                ):(
                    <p className=" sm:hidden xl:inline-block ml-1 xl:w-1/12">No Data</p>
                )}
                {user.birthday ? (
                    <p className=" sm:hidden xl:inline-block ml-1 xl:w-1/12">{user.birthday}</p>
                ):(
                    <p className=" sm:hidden xl:inline-block ml-1 xl:w-1/12">No Data</p>
                )}
                {user.role ? (
                    <p className=" inline-block ml-2 w-1/12">{user.role}</p>
                ):(
                    <p className=" inline-block ml-2 w-1/12">No Data</p>
                )}
            </div>
            )}
        </div>
        
    );
}
