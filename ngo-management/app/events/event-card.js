"use client";
import { useState, useEffect } from "react";
import { useUserAuth } from "../_utils/auth-context";
import { updateEvent } from "../_services/event-services";


export default function EventCard({ event, showDetails, passAttend, passVolunteer, passLoginRequest}) {
    const { user } = useUserAuth();
    const [eventAttendedCheck, setEventAttendedCheck] = useState(false);
    const [eventVolunteeredCheck, setEventVolunteeredCheck] = useState(false);

    
    const HandleAttend = () => {
        passAttend(event);
    };

    const HandleVolunteer = () => {
        passVolunteer(event);
    };

    const handleDetail = () => {
        showDetails(event);
    };

    const HandleQuickLogin = () => {
        passLoginRequest(true);
    };

    useEffect(() => {
        if (user) {
            if (event){
                if (Array.isArray(event.attendees) && event.attendees.some(attendee => attendee.email === user.email)) {
                    setEventAttendedCheck(true);
                }
                if (Array.isArray(event.volunteers) && event.volunteers.some(volunteer => volunteer.email === user.email)) {
                    setEventVolunteeredCheck(true);
                }
            }
        }
    }, [event]);



    const HandleUnAttend = async () => {
        if (Array.isArray(event.attendees) && event.attendees.some(attendee => attendee.email === user.email)) {
            event.attendees = event.attendees.filter(attendee => attendee.email !== user.email);
            await updateEvent(event);
            setEventAttendedCheck(false);
        }
    }

    const HandleUnVolunteer = async () => {
        if (Array.isArray(event.volunteers) && event.volunteers.some(volunteer => volunteer.email === user.email)) {
            event.volunteers = event.volunteers.filter(volunteer => volunteer.email !== user.email);
            await updateEvent(event);
            setEventVolunteeredCheck(false);
        }
    }

    return (
        <div className="flex flex-wrap w-full">           
            <div className="w-full rounded-md backgroundDarkColor opacity-100 m-6 shadow-xl transition duration-150 ease-in-out hover:scale-105 cursor-pointer"
                onClick={handleDetail}>
                <div className="w-full itemColor m-0 p-3 text-center rounded-t-md">
                    <h3 className="textColor text-lg font-semibold">{event.title}</h3>
                </div>
                <div className="p-6">
                    <p className="textColor">{event.description}</p>
                    <hr className="mx-1 my-3 bg-slate-400 "/>
                    <div className="flex flex-col">
                        <div className="w-full flex justify-between">
                            <div className="">
                                {event.eventDate && <p className="textColor">Event Date: </p>}
                            </div>
                            <div className="">
                                {event.eventDate && <p className="textColor">{event.eventDate}</p>}
                            </div>
                        </div>
                        <div className="w-full flex justify-between">
                            <div className="">
                                {event.creator && <p className="textColor">Creator: </p>}
                            </div>
                            <div className="">
                                {event.creator && <p className="textColor">{event.creator}</p>}
                            </div>
                        </div>
                        <div className="w-full flex justify-between">
                            <div className="">
                                <p className="textColor">Attendees: </p>
                            </div>
                            <div className="">
                                {event.attendees != "" ? (<p className="textColor">{event.attendees.length}</p>)
                                : (<p className="textColor">0</p>)}
                            </div>
                        </div>
                        <div className="w-full flex justify-between">
                            <div className="">
                                <p className="textColor">Volunteers:</p>
                            </div>
                            <div className="">
                                {event.volunteers != "" ? (<p className="textColor">{event.volunteers.length}</p>)
                                : (<p className="textColor">0</p>)}
                            </div>
                        </div>
                    </div>

                    {user ? (
                    <div className="flex flex-row w-full">
                        {eventAttendedCheck ? (
                        <button onClick={(e)=> {e.stopPropagation(); HandleUnAttend()}} className="w-1/2 rounded-md opacity-90 m-2 ml-0 p-2 textColor myBorder transition duration-300 ease-in-out opacity:80 hover:opacity-100 bg-stone-500 hover:bg-stone-700">
                            UnAttend
                        </button>
                        ) : (
                        <button onClick={(e)=> {e.stopPropagation(); HandleAttend()}} className="w-1/2 rounded-md opacity-90 m-2 ml-0 p-2 textColor myBorder transition duration-300 ease-in-out opacity:80 hover:opacity-100 hover:bg-stone-500">
                            Attend
                        </button>
                        )}
                        {eventVolunteeredCheck ? (
                        <button onClick={(e)=> {e.stopPropagation(); HandleUnVolunteer()}} className="w-1/2 rounded-md opacity-90 m-2 ml-0 p-2 textColor myBorder transition duration-300 ease-in-out opacity:80 hover:opacity-100 bg-stone-500 hover:bg-stone-700">
                            UnVolunteer
                        </button>
                        ) : (
                        <button onClick={(e)=> {e.stopPropagation(); HandleVolunteer()}} className="w-1/2 rounded-md opacity-90 m-2 ml-0 p-2 textColor myBorder transition duration-300 ease-in-out opacity:80 hover:opacity-100 hover:bg-stone-500">
                            Volunteer
                        </button>
                        )}
                    </div>
                    )
                    : (
                    <div className="pt-4">
                        <hr/>
                        <p className="textColor pt-4">To attend or volunteer, please log in!</p>
                        <div className="flex justify-center">
                            <button onClick={(e)=> {e.stopPropagation(); HandleQuickLogin()}} className="w-1/2 rounded-md opacity-90 m-2 ml-0 p-2 textColor myBorder transition duration-300 ease-in-out opacity:80 hover:opacity-100 hover:bg-stone-500">
                                Log In
                            </button> 
                        </div>
                    </div>
                    )}

                </div>
            </div>
        </div>
    );
}
