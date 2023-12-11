'use client';
import BackgroundImage from "@/app/components/background-image";
import BannerNav from "@/app/components/banner-nav";
import Footer from "@/app/components/footer";
import { getAllUsers, getUserByEmail, subscribeToUsers } from "@/app/_services/user-services";
import { getAllEvents, getEventById, subscribeToEvents } from "@/app/_services/event-services";
import { useState, useEffect } from "react";
import VolunteerList from "./volunteer-list";
import { useUserAuth } from "../../_utils/auth-context";
import EventList from "./event-list";
import EventDetail from "./event-detail";
import VolunteerOfEvent from "./volunteers-of-event";


export default function Page(){
    const currentPage="Management";
    const { user } = useUserAuth();

    const [userList, setUserList] = useState([]);
    const [volunteerList, setVolunteerList] = useState([]);

    const [eventList, setEventList] = useState([]);

    //Show event details
    const [eventDetails, setEventDetails] = useState(); 
    
    //Show Edit Volunteer
    const [editingEventVolunteer, setEditingEventVolunteer ] = useState(null);

    //make event date list
    const [eventDateList, setEventDateList] = useState([]);
    
    //show volunteer schedule
    const [volunteerSchedule, setVolunteerSchedule] = useState(null);

    const handleEditVolunteer = (event) => {
        console.log(event);
        setEditingEventVolunteer(event);
    }

    const handleDetail = (event) => {
        setEventDetails(event);
    }
    const handleCloseDetails = () => {
        setEventDetails(null);
    }   
    const handleCloseEditEvent = () => {
        setEditingEventVolunteer(null);
    }

    const handleSchedule = (user) => {
        setVolunteerSchedule(user);
    }


    useEffect(() => {
        const fetchUserData = async () => {
            const unsubscribe = subscribeToUsers(setUserList);
            return () => unsubscribe();
        };
        fetchUserData();
        //filter users by role volunteer
        const fetchEventData = async () => {
            const unsubscribe = subscribeToEvents(setEventList);
            return () => unsubscribe();
        }
        fetchEventData();
        
    }, []);

    useEffect(() => {
        const volunteers = userList.filter(user => user.role === 'volunteer');
        setVolunteerList(volunteers);
    }, [userList]);
    





    //preparing complex data
    const dateList = {};

    const populateEventDateList = () => {
        eventList.forEach(event => {
            const date = event.eventDate;

            if (!dateList[date]) {
                dateList[date] = [];
            }

            dateList[date].push(event);
            }
        );
    }

    const sortedDateList = Object.entries(dateList)
        .sort(([dateA], [dateB]) => new Date(dateA) - new Date(dateB))
        .reduce((acc, [date, events]) => {
            acc[date] = events;
            return acc;
    }, {});






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
            <h2 className="textColor text-xl font-semibold my-12 w-full text-center">Volunteers List</h2>
            <div className="mb-20 mx-10">
                <VolunteerList userList={volunteerList} passEditToPage={handleSchedule}/>
            </div>
            <hr className="mx-20 bg-slate-400 "/>
            <div className="mb-20 mx-10">
                <EventList eventList={eventList} passEditVolunteer={handleEditVolunteer} passEventUp2={handleDetail}/>
            </div>
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

    {eventDetails && (
        <div
            className="fixed top-0 left-0 min-h-screen w-full backgroundLightColor opacity-100 transition-transform duration-300 ease-in-out"
            style={{ zIndex: 1 }}
            onClick={handleCloseDetails}
            cursor="pointer"
        >
            <div className="fixed bottom-20 right-8">
                <button
                    onClick={handleCloseDetails}
                    className="itemColor textColor opacity-80 rounded-full p-4 shadow-lg transition duration-300 ease-in-out focus:outline-none hover:opacity-100"
                >
                    <p className="mx-3 text-5xl">x</p>
                </button>
            </div>
            <div
                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full"
                onClick={(e) => e.stopPropagation()}
            >
                <EventDetail event={eventDetails} passEditVolunteer={handleEditVolunteer} turnOffEventDetail={handleCloseDetails}/>
            </div>
        </div>
    )}  
    {editingEventVolunteer && (
        <div
        className="fixed top-0 left-0 min-h-screen w-full backgroundLightColor opacity-100 flex justify-center items-center"
        style={{ zIndex: 1 }}
        >
            <div className="fixed bottom-20 right-8">
                <button
                onClick={handleCloseEditEvent}
                className="itemColor textColor opacity-80 rounded-full p-4 shadow-lg transition duration-300 ease-in-out focus:outline-none hover:opacity-100"
                >
                    <p className="mx-3 text-5xl">x</p>
                </button>
            </div>
            <div
            className="w-full lg:w-10/12 xl:w-8/12"
            >
                <VolunteerOfEvent event={editingEventVolunteer} allVolunteers={volunteerList} onSave={()=>setEditingEventVolunteer(null)}/>
            </div>
        </div>
        
    )}
    </div>
    );
}