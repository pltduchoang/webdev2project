"use client";
import { useState, useEffect } from "react";
import { getEvents } from "@/app/_services/event-services";
import { useUserAuth } from "@/app/_utils/auth-context";



export default function StatusToggle({currentVolunteerEmail, currentWorkingEvent ,onChange}){

    const { user } = useUserAuth();
    const [activeStatus, setActiveStatus] = useState(false);
    const [busy, setBusy] = useState(false);
    const [allEventsList, setAllEventsList] = useState(); //[event, setEvent

    const [conflictEvent, setConflictEvent] = useState(); //[event, setEvent

    const [showTip, setShowTip] = useState(false);

    const determineStatus = () => {
        console.log('activeVolunteers', currentWorkingEvent.volunteers);
        if (Array.isArray(currentWorkingEvent.volunteers) && currentWorkingEvent.volunteers.length > 0) {
            const isVolunteerActive = currentWorkingEvent.volunteers.some(volunteer => volunteer.email === currentVolunteerEmail);
            setActiveStatus(isVolunteerActive);
        } else {
            setActiveStatus(false); // Set status to false if activeVolunteers is empty or not an array
        }
    };

    const getAllEvents = async () => {
        const events = await getEvents();
        setAllEventsList(events);
    };


    const CheckIfVolunteerBusy = (currentEmail, currentEvent) => {
            const filteredEvents = allEventsList.filter(event => event.id !== currentEvent.id);

            const sameDateEvents = filteredEvents.filter(event => event.eventDate === currentEvent.eventDate);
            console.log('sameDateEvents', sameDateEvents);
            if (sameDateEvents.length === 0) {
                return false; // Volunteer is not busy on this date
            }
    
            const isVolunteerBusy = sameDateEvents.some(event => {
                if (Array.isArray(event.volunteers) && event.volunteers.length > 0) {
                    return event.volunteers.some(v => v.email === currentEmail);
                }
                return false; // Return false if volunteers is empty or not an array
            });
    
            if (isVolunteerBusy) {
                const conflictEvents = sameDateEvents.filter(event =>
                    event.volunteers.some(v => v.email === currentEmail)
                );
                console.log('conflictEvents', conflictEvents[0]);
                setConflictEvent(conflictEvents[0]);

                return { isBusy: true };
            }
    
            return false; // Volunteer is not busy on this date
    };
        
    const handleToggle = () => {
        console.log('oldStatus', activeStatus);
        setActiveStatus(!activeStatus);
    };



    useEffect(() => {
        console.log('currentWorkingEvent at toggle', currentWorkingEvent);
        console.log('currentVolunteerEmail at toggle', currentVolunteerEmail);
        console.log('all event at toggle', allEventsList);
        
        if (allEventsList){
            setBusy(CheckIfVolunteerBusy(currentVolunteerEmail, currentWorkingEvent));
            determineStatus();
        }
    },[allEventsList]);

    useEffect(() => {
        console.log('currentWorkingEvent at toggle', currentWorkingEvent);
        console.log('currentVolunteerEmail at toggle', currentVolunteerEmail);
        console.log('all event at toggle', allEventsList);
        
        if (allEventsList){
            setBusy(CheckIfVolunteerBusy(currentVolunteerEmail, currentWorkingEvent));
            determineStatus();
        }
    },[user]);

    useEffect(() => {
        getAllEvents();
    },[]);


    useEffect(() => {
        onChange(currentVolunteerEmail, activeStatus);
    },[activeStatus]);



    return(
        <main className="relative">
            {busy &&
                <div className="w-full flex items-center justify-center rounded-md myBorder backgroundLightColor shadow-inner"
                onMouseOver={()=>setShowTip(true)}
                onMouseLeave={()=>setShowTip(false)}>
                    <p className="textColor">Busy</p>
                </div>
            }
            <div onClick={handleToggle}
            className=" cursor-pointer">
                {!busy &&
                    <div className="w-full flex items-center justify-center rounded-md myBorder backgroundDarkColor text-center">
                        <div className={`${activeStatus ?'w-2/3 text-green-600 bg-stone-700 shadow-inner':'w-1/3 opacity-50'} transition-none duration-300 ease-in-out`}>
                            <p>ON</p>
                        </div>
                        <div className={`${activeStatus ? 'w-1/3 opacity-50':' w-2/3 text-red-500 bg-stone-700 shadow-inner'} transition-none duration-300 ease-in-out`}>
                            <p>OFF</p>
                        </div>
                    </div>
                }
            </div>
            {showTip &&
                <div className="absolute top-10 w-full flex items-center justify-center rounded-md myBorder backgroundLightColor"
                style={{zIndex:3}}>
                    <p className="text-amber-500 p-2">Busy with same date event: {conflictEvent.title}</p>
                </div>
                }
        </main>
    )
}
