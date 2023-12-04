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
                    <div className="flex">
                        <div className="w-1/3">
                            {event.eventDate && <p className="textColor">Event Date:</p>}
                            {event.dateCreated && <p className="textColor">Date Created:</p>}
                            {event.creator && <p className="textColor">Creator:</p>}
                            {event.dateUpdated && <p className="textColor">Date Updated:</p>}
                            <p className="textColor">Attendees:</p>
                            <p className="textColor">Volunteers:</p>
                        </div>
                        <div className="w-2/3 text-right pr-1">
                            {event.eventDate && <p className="textColor">{event.eventDate}</p>}
                            {event.dateCreated && <p className="textColor">{getFormattedDate(event.dateCreated)}</p>}
                            {event.creator && <p className="textColor">{event.creator}</p>}
                            {event.dateUpdated && <p className="textColor">{getFormattedDate(event.dateUpdated)}</p>}
                            {event.attendees != "" ? (<p className="textColor">{event.attendees.length}</p>)
                            : (<p className="textColor">No attendee registered</p>)}
                            {event.volunteers != "" ? (<p className="textColor">{event.volunteers.length}</p>)
                            : (<p className="textColor">No volunteer registered</p>)}
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
