import { useState, useEffect } from "react";
import EventCard from "./event-card";

export default function EventList({eventList, passEditEvent, passEventUp2}) {
    const [eventWorkingList, setEventList] = useState([]);

    useEffect(() => {
        setEventList(eventList);
    }, [eventWorkingList]);

    const handlePassEvent = (event) => {
        passEventUp2(event);
    };

    const handlePassEdit = (event) => {
        passEditEvent(event);
    }


    return (
        <main>
            <div className="flex flex-col items-center md:flex-row md:flex-wrap md:justify-center w-full">
                <h2 className="textColor text-2xl font-semibold my-12 w-full text-center">Upcoming Events</h2>
                {eventList.map((event,index) => (
                    <div key={index}>
                        {event.eventDate && new Date(event.eventDate) >= new Date() && (
                        <div className=" w-96" >
                            <EventCard  event={event} passEventUp1={handlePassEvent} editEvent={handlePassEdit}/>
                        </div>
                    )}
                    </div>
                ))}
            </div>
            <hr className="mx-20 bg-slate-400 "/>
            <div className="flex flex-col items-center md:flex-row md:flex-wrap md:justify-center w-full">
                <h2 className="textColor text-2xl font-semibold my-12 w-full text-center">Past Events</h2>
                {eventList.map((event,index) => (
                    <div key={index}>
                        {event.eventDate && new Date(event.eventDate) < new Date() && (
                        <div className=" w-96 opacity-80" >
                            <EventCard  event={event} passEventUp1={handlePassEvent} editEvent={handlePassEdit}/>
                        </div>
                    )}
                    </div>
                ))}
            </div>
        </main>
    );
}