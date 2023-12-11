'use client';
import {useState, useEffect } from "react";
import { useUserAuth } from "../../_utils/auth-context";
import Footer from "../../components/footer";
import BackgroundImage from "../../components/background-image";
import BannerNav from "@/app/components/banner-nav";
import { getAllUsers, getUserByEmail, subscribeToUsers } from "@/app/_services/user-services";
import UserList from "./user-list";
import UserEditForm from "./user-edit-form";


export default function Page(){
    const currentPage="Management";
    const [userList, setUserList] = useState([]);

    const [userByEmail, setUserByEmail] = useState({});

    //edit form control
    const [showEditForm, setShowEditForm] = useState(false);
    const [editingUser, setEditingUser] = useState();//[user, setUser

    const { user } = useUserAuth();

    // const fetchUsers = async () => {
    //     const users = await getAllUsers();
    //     setUserList(users);
    // };

    // const fetchUserByEmail = async (email) => {
    //     const user = await getUserByEmail(email);
    //     return user;
    // };


    //edit form control
    const handleEditUser = (user) => {
        setShowEditForm(true);
        setEditingUser(user);
    };

    const handleCloseEditEvent = () => {
        setShowEditForm(false);
        setEditingUser(null);
    };

    const handleIsSubmitted = () => {
        setShowEditForm(false);
        setEditingUser(null);
    };



    useEffect(() => {
        const fetchData = async () => {
            const unsubscribe = subscribeToUsers(setUserList);
            return () => unsubscribe();
        };
        fetchData();
    }, []);
    

    return(
      <main className="">
        {user ? (
        <div className="">
            <BannerNav currentPage={currentPage}/>
            <div className="text-center textColor font-semibold text-xl my-12">
                {user ? <p>Welcome {user.email}</p> : <p>Welcome, guest</p>}
                <p>Let&apos;s manage your users database with ease</p>
            </div>
            <hr className="mx-20 bg-slate-400 "/>
            <div className="mb-20 mx-10">
                <UserList userList={userList} passEditToPage={handleEditUser}/>
            </div>
            <BackgroundImage/>
            <Footer/>
        </div>
      ) : (
          <main className="">
              <BannerNav currentPage={currentPage}/>
              <div className="min-h-screen flex items-center w-full justify-center">
                  <p className="p-40 rounded-md textColor backgroundDarkColor opacity-90">Access Denied, please login</p>
              </div>
              <BackgroundImage/>
              <Footer/>
          </main>
      )};

      {showEditForm && (
        <div className={`fixed top-0 left-0 w-full h-full backgroundLightColor bg-opacity-90 py-10 flex justify-center overflow-y-auto`}>
            <div className="w-full lg:w-9/12 xl:w-1/2">
                <UserEditForm userDetails={editingUser} isSubmitted={handleIsSubmitted}/>
            </div>
            <button
                onClick={handleCloseEditEvent}
                className="itemColor textColor opacity-80 rounded-full p-4 shadow-lg transition duration-300 ease-in-out focus:outline-none hover:opacity-100 fixed right-8 bottom-8"
                style={{zIndex: 3}}
            >
                <p className="mx-3 text-5xl">x</p>
            </button>
        </div>
        
        )}
    </main>
    )
}