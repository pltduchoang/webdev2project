import React, { useEffect, useState } from 'react';
import StatusToggle from './status-toggle';
import { updateEvent } from '@/app/_services/event-services';

export default function VolunteerOfEvent({ event, allVolunteers, onSave }) {
    const [currentEvent, setCurrentEvent] = useState(); //[event, setEvent
    const [allVolunteersList, setAllVolunteersList] = useState([]); //[volunteer, setVolunteer
    const [volunteerList, setVolunteerList] = useState([]);

    useEffect(() => {
        if (event && event.volunteers) {
            setCurrentEvent(event);
            setVolunteerList(event.volunteers);
        }
        console.log('Event at child',event);
        console.log('Event volunteer list',event.volunteers);
        if (allVolunteers) {
            setAllVolunteersList(allVolunteers);
        }
    }, [event]);



    useEffect(() => {
        console.log('Volunteer List', volunteerList);
    }, [volunteerList]);


    const handleToggleChange = (email, status) => {
        console.log('Email', email);
        console.log('Status', status);
        if (!status) {
            // If status is false, remove the volunteer from the volunteerList
            const updatedVolunteerList = volunteerList.filter(
                volunteer => volunteer.email !== email
            );
            setVolunteerList(updatedVolunteerList);
        } else {
            // If status is true, check if the volunteer is already in the volunteerList
            const existingVolunteer = volunteerList.find(
                volunteer => volunteer.email === email
            );

            if (!existingVolunteer) {
                // If the volunteer is not in the volunteerList, find and add them from allVolunteersList
                const volunteerToAdd = allVolunteersList.find(
                    volunteer => volunteer.email === email
                );

                if (volunteerToAdd) {
                    const updatedVolunteerList = [...volunteerList, volunteerToAdd];
                    setVolunteerList(updatedVolunteerList);
                }
            }
        }
    };


    const handleSaveVolunteer = () => {
        console.log('Volunteer List', volunteerList);
        console.log('Event', event);
        // Save volunteerList to event
        const updatedEvent = {
            ...event,
            volunteers: volunteerList
        };
        updateEvent(updatedEvent);
        onSave();
    };


    return (
        <main className='backgroundDarkColor rounded-lg flex justify-center flex-col items-center p-10 myBorder textColor'>
            <h2 className='mb-10'>Volunteers for Event: {event?.title}</h2>
            <hr className='w-full mb-10'/>
            <div className='flex flex-wrap w-full'>
                {volunteerList && volunteerList.length > 0 && (
                    <div >
                        {volunteerList.map((volunteer) => (
                            <p key={volunteer.email} className='p-2 myBorder textColor inline-block m-4 rounded-md backgroundLightColor opacity-80'>{volunteer.firstName} {volunteer.lastName}</p>
                        ))}
                    </div>
                )}
            </div>
            <hr className='w-full my-10'/>
            {allVolunteersList && allVolunteersList.length > 0 ? (
                allVolunteersList.map((volunteer) => (
                    <div key={volunteer.email} className='flex w-full lg:w-10/12 m-4 myBorder px-10 py-6 rounded-lg'>
                        <p className=' inline-block w-2/12 lg:w-1/12 ml-4'>
                            {volunteer.firstName}
                        </p>
                        <p className=' inline-block w-2/12 lg:w-1/12 ml-4'>
                            {volunteer.lastName}
                        </p>
                        <p className=' inline-block w-5/12 ml-4'>
                            {volunteer.email}
                        </p>
                        <div className=' inline-block w-3/12 ml-4'>
                            <StatusToggle currentVolunteerEmail={volunteer.email} currentWorkingEvent={event} onChange={handleToggleChange}/>
                        </div>
                    </div>
                ))
            ) : (
                <p>No volunteers found for this event.</p>
            )}
            <div className='w-full flex justify-center'>
                <button className='w-1/2 lg:w-1/4 m-4 py-2 px-4 rounded-md backgroundDarkColor textColor myBorder hover:bg-stone-500' onClick={handleSaveVolunteer}>Save</button>
            </div>
        </main>
    );
}
