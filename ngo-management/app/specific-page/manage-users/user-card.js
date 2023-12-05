"use client";
import { useState, useEffect } from "react";



export default function UserCard ({userDetails}) {
    const [user, setUser] = useState(null);

    useEffect(() => {
        setUser(userDetails);
    }, [userDetails]);

    return (
        <div className="w-full rounded-md p-10 textColor backgroundDarkColor transition-all duration-300 ease-in-out flex flex-row hover:scale-105 hover:cursor-pointer">
            {user && (
            <div>
                <p className=" inline-block">{user.firstName}</p>
                <p className=" inline-block ml-4">{user.lastName}</p>
                <p className=" inline-block ml-4">{user.email}</p>
                {user.role ? (
                    <p className=" inline-block ml-4">{user.role}</p>
                ):(
                    <p className=" inline-block ml-4">Not Available</p>
                )}
            </div>
            )}
        </div>
        
    );
}
