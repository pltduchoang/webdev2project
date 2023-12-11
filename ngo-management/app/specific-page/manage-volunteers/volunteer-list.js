import { useState, useEffect } from 'react';
import VolunteerCard from './volunteer-card';


export default function VolunteerList ({userList, passEditToPage}) {
    const [users, setUsers] = useState(userList);

    useEffect(() => {
        if (Array.isArray(userList)) {
            setUsers(userList);
        }
    }, [userList]);

    const handleEdit = (user) => {
        passEditToPage(user);
    };

    return (
        <div className="w-full rounded-md p-10 textColor myBorder transition-all duration-300 ease-in-out flex flex-col mt-10">
            <div className='w-full rounded-md px-10 py-4 textColor transition-all duration-300 ease-in-out flex flex-row itemColor'>
                <p className=" inline-block ml-2 w-1/12 text-left font-semibold">First Name</p>
                <p className=" inline-block ml-2 w-1/12 text-left font-semibold">Last Name</p>
                <p className=" sm:w-6/12 inline-block ml-2 lg:w-3/12 xl:w-3/12 text-left font-semibold">Email</p>
                <p className=" inline-block ml-1 w-2/12 lg:w-1/12 font-semibold">Phone</p>
                <p className=" hidden lg:inline-block ml-1 lg:w-3/12 xl:w-3/12 font-semibold">Address</p>
                <p className=" hidden lg:inline-block ml-1 w-1/12 font-semibold">City</p>
                <p className=" hidden xl:inline-block ml-1 xl:w-1/12 font-semibold">Postal Code</p>
            </div>
            {users && users.map((user) => (
                <div  key={user.id} className='my-4'>
                    <VolunteerCard userDetails={user} passEdit={handleEdit}/>
                </div>
            ))}
        </div>
        
    );
}