import { useUserAuth } from "../_utils/auth-context";
import { deleteEvent } from "../_services/event-services";
import { useState } from "react";

export default function EventCard({ event, editEvent, passEventUp1 }) {
    const { user } = useUserAuth();
    const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false); //state to determine if user is adding an event
    
    const HandleDelete = async () => {
        setShowDeleteConfirmation(true);
    };

    const handleCloseAfterConfirm = async (confirmed) => {
        if (confirmed) {
            await deleteEvent(event.id);
            setShowDeleteConfirmation(false);
        } else {
            setShowDeleteConfirmation(false);
        }
    };

    const HandleEdit = () => {
        editEvent(event);
    };

    const handleDetail = (e) => {
        passEventUp1(event);
    };


    return (
        <div className="flex flex-wrap w-full">           
            <div href="manage-events/[id]" as={`manage-events/${event.id}`} className="w-full rounded-md backgroundDarkColor opacity-100 m-6 shadow-xl transition duration-150 ease-in-out hover:scale-105 hover:cursor-pointer"
                onClick={handleDetail}>
                <div className="w-full itemColor m-0 p-3 text-center rounded-t-md">
                    <h3 className="textColor text-lg font-semibold">{event.title}</h3>
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
                            <button onClick={(e) => {e.stopPropagation(); HandleDelete();}} className="w-1/2 rounded-md opacity-90 m-2 ml-0 p-2 textColor myBorder transition duration-300 ease-in-out opacity:80 hover:opacity-100 hover:bg-stone-500">
                                Delete
                            </button>
                            <button onClick={(e) => {e.stopPropagation(); HandleEdit();}} className="w-1/2 rounded-md opacity-90 m-2 mr-0 p-2 textColor myBorder transition duration-300 ease-in-out opacity:80 hover:opacity-100 hover:bg-stone-500">
                                Edit
                            </button>
                        </div>
                    )}
                </div>
            </div>
            
            {/* Pop up confirmation page for when closing the adding event form and edit event form */}
            {showDeleteConfirmation && (
                <div className="confirmation-modal fixed inset-0 flex items-center justify-center backgroundLightColor placeholder-opacity-100"
                style={{zIndex:6}}>
                    <div className="backgroundDarkColor p-6 rounded-lg shadow-lg textColor">
                        <p>Are you sure you want to delete?</p>
                        <p>Event will be permanently deleted</p>
                        <div className="flex justify-around mt-5">
                            <button onClick={() => handleCloseAfterConfirm(true)} className="w-12 hover:bg-orange-500 rounded-md myBorder transition duration-300 ease-in-out">Yes</button>
                            <button onClick={() => handleCloseAfterConfirm(false)} className="w-12 hover:bg-orange-500 rounded-md myBorder transition duration-300 ease-in-out">No</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
