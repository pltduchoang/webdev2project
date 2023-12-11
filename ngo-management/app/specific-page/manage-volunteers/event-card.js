import { useUserAuth } from "../../_utils/auth-context";
import { useState } from "react";

export default function EventCard({ event, editVolunteers, passEventUp1 }) {
    const { user } = useUserAuth();
    const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false); //state to determine if user is adding an event
    



    const handleEditVolunteer = () => {
        editVolunteers(event);
    };

    const handleDetail = () => {
        passEventUp1(event);
    };


    return (
        <div className="flex flex-wrap w-full">           
            <div href="manage-events/[id]" as={`manage-events/${event.id}`} className="w-full rounded-md backgroundDarkColor opacity-100 m-6 shadow-xl transition duration-150 ease-in-out hover:scale-105 hover:cursor-pointer"
                onClick={handleDetail}>
                <div className="w-full itemColor m-0 p-3 text-center rounded-t-md">
                    <h3 className="textColor text-lg font-semibold">{event.title}</h3>
                    <h4 className="textColor text-lg font-semibold">{event.id}</h4>
                </div>
                <div className="p-6">
                    <p className="textColor ">{event.description}</p>
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
                    {user && (
                        <div className="flex flex-row w-full">
                            <button onClick={(e) => {e.stopPropagation(); handleEditVolunteer();}} className="w-full rounded-md opacity-90 m-2 ml-0 p-2 textColor myBorder transition duration-300 ease-in-out opacity:80 hover:opacity-100 hover:bg-stone-500">
                                Manage Volunteers
                            </button>
                        </div>
                    )}
                </div>
            </div>
            
        </div>
    );
}
