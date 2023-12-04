import React, { useEffect, useState } from 'react';
import InputWithFloatingLabel from '../components/input-floating-label';
import { updateEvent } from '../_services/event-services';
import { useUserAuth } from '../_utils/auth-context';

export default function EditEvent({editEvent}) {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [eventDate, setEventDate] = useState('');
    const [location, setLocation] = useState('');
    const [locationGPS, setLocationGPS] = useState('');
    const [createdAt, setCreatedAt] = useState('');
    const [creator, setCreator] = useState('');
    const [dateUpdated, setDateUpdated] = useState('');
    const [attendees, setAttendees] = useState('');
    const [volunteers, setVolunteers] = useState('');
    const { user } = useUserAuth();
    const [showConfirmation, setShowConfirmation] = useState(false); //state to determine if user is adding an event

   

    useEffect(() => {
        if(editEvent){
            setTitle(editEvent.title);
            setDescription(editEvent.description);
            setEventDate(editEvent.eventDate);
            setLocation(editEvent.location);
            setLocationGPS(editEvent.locationGPS);

            setCreator(editEvent.creator);

            setAttendees(editEvent.attendees);
            setVolunteers(editEvent.volunteers);
        }
    }, [editEvent]);

    const handleCloseAfterConfirm = (confirmed) => {
            if (confirmed) {
                const newEvent = {
                    id: editEvent.id,
                    title,
                    description,
                    eventDate,
                    location,
                    locationGPS,
                    createdAt: editEvent.createdAt,
                    creator,
                    updatedBy: user.email,
                    dateUpdated: new Date(),
                    attendees,
                    volunteers,
                };
                console.log('Edit Event:', newEvent);
                updateEvent(newEvent);

                // Reset form fields after submission (if needed)
                setTitle('');
                setDescription('');
                setEventDate('');
                setLocation('');
                setLocationGPS('');
                setCreatedAt('');
                setCreator('');
                setDateUpdated('');
                setAttendees('');
                setVolunteers('');
                
                setShowConfirmation(false);
            } else {
                setShowConfirmation(false);
            }
        
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setShowConfirmation(true);
    };

    return (
        <div className='backgroundDarkColor rounded-xl p-10'>
            <form onSubmit={handleSubmit} className='textColor flex flex-col'>
                <InputWithFloatingLabel label="Title" id="title" value={title} onChange={(e) => setTitle(e.target.value)} />
                <br />

                <div>
                    <label className='text-2xl ml-2' htmlFor="description">
                        Description
                    </label>
                    <textarea
                        id="description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className={`block text-xl w-full px-4 backgroundDarkColor textColor border-b-2 border-stone-700 outline-none h-20`}
                    />
                </div>
                <br />

                <div className="relative">
                    <label className='text-2xl ml-2' htmlFor="eventDate">
                        Event Date
                    </label>
                    <input
                        type="date"
                        id="eventDate"
                        value={eventDate}
                        onChange={(e) => setEventDate(e.target.value)}
                        className={`block text-xl w-full px-4 backgroundDarkColor textColor border-b-2 border-stone-700 outline-none h-10`}
                    />
                </div>
                <br />

                <InputWithFloatingLabel label="Location" id="location" value={location} onChange={(e) => setLocation(e.target.value)} />
                <br />

                <InputWithFloatingLabel label="Location GPS" id="locationGPS" value={locationGPS} onChange={(e) => setLocationGPS(e.target.value)} />
                <br />
                
                                
                <br />

                <InputWithFloatingLabel label="Attendees" id="attendees" value={attendees} onChange={(e) => setAttendees(e.target.value)} />
                <br />

                <InputWithFloatingLabel label="Volunteers" id="volunteers" value={volunteers} onChange={(e) => setVolunteers(e.target.value)} />
                <br />

                <button className="rounded-md myBorder p-2 mx-20 backgroundDarkColor opacity-80 hover:opacity-100 hover:bg-stone-500 transition duration-300 ease-in-out" type="submit">Update Event</button>
            </form>
            {showConfirmation && (
            <div className="confirmation-modal fixed inset-0 flex items-center justify-center backgroundLightColor"
            style={{zIndex:4}}>
                <div className="backgroundDarkColor p-6 rounded-lg shadow-lg textColor">
                    <p>Are you sure you want to post your update?</p>
                    <div className="flex justify-around mt-5">
                        <button onClick={() => handleCloseAfterConfirm(true)} className="w-12 hover:bg-orange-500 rounded-md myBorder transition duration-300 ease-in-out">Yes</button>
                        <button onClick={() => handleCloseAfterConfirm(false)} className="w-12 hover:bg-orange-500 rounded-md myBorder transition duration-300 ease-in-out">No</button>
                    </div>
                </div>
            </div>
            )}
        </div>
    );
};
