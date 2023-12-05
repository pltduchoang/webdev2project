import { useState, useEffect } from 'react';
import UserCard from './user-card';


export default function UserList (userList) {
    const [users, setUsers] = useState(userList);

    useEffect(() => {
        setUsers(userList);
    }, [userList]);

    return (
        <div className="w-full rounded-md p-10 textColor myBorder transition-all duration-300 ease-in-out flex flex-row">
            {users && users.map((user) => (
                <UserCard userDetails={user} key={user.id}/>
            ))}
        </div>
        
    );
}