"use client";
import { useState, useEffect } from "react";
import { useUserAuth } from "../_utils/auth-context";
import { updateEvent } from "../_services/event-services";


export default function EventCard({ event, showDetails, passAttend, passVolunteer, }) {
    const { user } = useUserAuth();
    const [eventAttendedCheck, setEventAttendedCheck] = useState(false);
    const [eventVolunteeredCheck, setEventVolunteeredCheck] = useState(false);

    
    const HandleAttend = () => {
        passAttend(event);
    }

    const HandleVolunteer = () => {
        passVolunteer(event);
    }

    const handleDetail = () => {
        showDetails(event);
    }


    useEffect(() => {
        if (event){
            if (Array.isArray(event.attendees) && event.attendees.some(attendee => attendee.email === user.email)) {
                setEventAttendedCheck(true);
            }
            if (Array.isArray(event.volunteers) && event.volunteers.some(volunteer => volunteer.email === user.email)) {
                setEventVolunteeredCheck(true);
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
                    <div className="flex">
                        <div className="w-1/3">
                            {event.eventDate && <p className="textColor">Event Date:</p>}
                            {/* <p className="textColor">Date Created: {event.dateCreated}</p> */}
                            {event.creator && <p className="textColor">Creator:</p>}
                            {/* <p className="textColor">Date Updated: {event.dateUpdated}</p> */}
                            <p className="textColor">Attendees: </p>
                            <p className="textColor">Volunteers:</p>
                        </div>
                        <div className="w-2/3 text-right pr-1">
                            {event.eventDate && <p className="textColor">{event.eventDate}</p>}
                            {/* <p className="textColor">{event.creator}</p> */}
                            {event.creator && <p className="textColor">{event.creator}</p>}
                            {/* <p className="textColor">{event.dateUpdated}</p> */}
                            {event.attendees != "" ? (<p className="textColor">{event.attendees.length}</p>)
                            : (<p className="textColor">0</p>)}
                            {event.volunteers != "" ? (<p className="textColor">{event.volunteers.length}</p>)
                            : (<p className="textColor">0</p>)}
                        </div>
                    </div>

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

                </div>
            </div>
        </div>
    );
}
