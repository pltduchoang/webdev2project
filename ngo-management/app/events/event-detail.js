"use client";
import { useUserAuth } from '../_utils/auth-context';

export default function EventDetail({ event }) {
    const { user } = useUserAuth();
    const handleDelete = () => {
        return null;
    }
    const handleEdit = () => {
        return null;
    }

    const getFormattedDate = (date) => {
        return date ? date.toLocaleString() : ''; // Convert Firestore Timestamp to JS Date and format it
    };

 

  return (
    <main>     
        <div className="fixed top-0 left-0 w-full h-full flex flex-col items-center justify-center">
            <h2 className='text-4xl textColor mb-10'>Event Details</h2>
            <div className="relative backgroundDarkColor rounded-3xl">

                <div className="w-full itemColor m-0 text-center rounded-t-3xl p-5">
                    <h3 className="textColor text-2xl font-semibold">{event.title}</h3>
                </div>
                <div className="pb-10 px-10 pt-5">
                    <h3 className="textColor ">{event.description}</h3>
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
                                {event.dateCreated && <p className="textColor">Date Created: </p>}
                            </div>
                            <div className="">
                                {event.dateCreated && <p className="textColor">{getFormattedDate(event.dateCreated)}</p>}
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
                                {event.dateUpdated && <p className="textColor">Date Updated: </p>}
                            </div>
                            <div className="">
                                {event.dateUpdated && <p className="textColor">{getFormattedDate(event.dateUpdated)}</p>}
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
                    
                    <div className="flex flex-row w-full">
                        <button onClick={handleDelete} className="w-1/2 rounded-md opacity-90 m-2 ml-0 p-2 textColor myBorder transition duration-300 ease-in-out opacity:80 hover:opacity-100 hover:bg-stone-500">
                            Attend
                        </button>
                        <button onClick={handleEdit} className="w-1/2 rounded-md opacity-90 m-2 mr-0 p-2 textColor myBorder transition duration-300 ease-in-out opacity:80 hover:opacity-100 hover:bg-stone-500">
                            Volunteer
                        </button>
                    </div>
                    
                </div>
          </div>
        </div>
    </main>
  );
}
