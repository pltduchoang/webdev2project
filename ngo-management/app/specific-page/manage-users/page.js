'use client';
import {useState, useEffect } from "react";
import { useUserAuth } from "../../_utils/auth-context";
import Footer from "../../components/footer";
import BackgroundImage from "../../components/background-image";
import BannerNav from "@/app/components/banner-nav";
import { getAllUsers, getUserByEmail, subscribeToUsers } from "@/app/_services/user-services";
import UserList from "./user-list";


export default function Page(){
    const currentPage="Management";
    const [userList, setUserList] = useState([]);
    const [userByEmail, setUserByEmail] = useState([{}]);

    const { user } = useUserAuth();

    const fetchUsers = async () => {
        const users = await getAllUsers();
        setUserList(users);
    };

    const fetchUserByEmail = async (email) => {
        const user = await getUserByEmail(email);
        return user;
    };

    useEffect(() => {
        const unsubscribe = subscribeToUsers(setUserList);
        return () => unsubscribe();
    }, []);
    

    return(
      <div>
        {user ? (
          <main className=" min-h-screen">
          <BannerNav currentPage={currentPage}/>
          <div className="text-center textColor font-semibold text-xl my-12">
              {user ? <p>Welcome {user.email}</p> : <p>Welcome, guest</p>}
              <p>Let&apos;s manage your users database with ease</p>
          </div>
          <hr className="mx-20 bg-slate-400 "/>
          <UserList UserList={userList}/>
          <BackgroundImage/>
          <Footer/>
      </main>
      ) : (
          <main className=" min-h-screen">
              <BannerNav currentPage={currentPage}/>
              <div className="min-h-screen flex items-center w-full justify-center">
                  <p className="p-40 rounded-md textColor backgroundDarkColor opacity-90">Access Denied, please login</p>
              </div>
              <BackgroundImage/>
              <Footer/>
          </main>
      )};
    </div>
    )
}