"use client";

import { getEventById } from '@/app/_services/event-services';
import BackgroundImage from '@/app/components/background-image';
import BannerNav from '@/app/components/banner-nav';
import Footer from '@/app/components/footer';
import { useState, useEffect } from 'react';
import { useUserAuth } from '@/app/_utils/auth-context';
export default function Page({params}) {
    const { id } = params;
    const [event, setEvent] = useState(null);
    const { user } = useUserAuth();

    useEffect(() => {
        if (id) {
            getEventById(id).then((even) => {
                console.log(even);
                setEvent(even);
            });
        }

    }, [id]);

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
            <BannerNav />
            {event && (
                <div className="w-full h-full flex items-center justify-center pt-30 px-28">
                    <div className="relative backgroundDarkColor rounded-3xl">
                        <div className="w-full itemColor m-0 text-center rounded-t-3xl p-5">
                            <h3 className="textColor text-2xl font-semibold">{event.title}</h3>
                        </div>
                        <div className="pb-10 px-10 pt-5">
                            <h3 className="textColor ">{event.description}</h3>
                            <hr className="mx-1 my-3 bg-slate-400 " />
                            <div className="flex">
                                <div className="w-1/3">
                                    {event.eventDate && <p className="textColor">Event Date:</p>}
                                    {event.dateCreated && <p className="textColor">Date Created:</p>}
                                    {event.creator && <p className="textColor">Creator:</p>}
                                    {event.dateUpdated && <p className="textColor">Date Updated:</p>}
                                    {event.attendees && <p className="textColor">Attendees:</p>}
                                    {event.volunteers && <p className="textColor">Volunteers:</p>}
                                </div>
                                <div className="w-2/3 text-right pr-1">
                                    {event.eventDate && <p className="textColor">{event.eventDate}</p>}
                                    {event.dateCreated && <p className="textColor">{getFormattedDate(event.dateCreated)}</p>}
                                    {event.creator && <p className="textColor">{event.creator}</p>}
                                    {event.dateUpdated && <p className="textColor">{getFormattedDate(event.dateUpdated)}</p>}
                                    {event.attendees && <p className="textColor">{event.attendees.join(',')}</p>}
                                    {event.volunteers && <p className="textColor">{event.volunteers.join(',')}</p>}
                                </div>
                            </div>
                            {user && (
                                <div className="flex flex-row w-full">
                                    <button onClick={handleDelete} className="w-1/2 rounded-md opacity-90 m-2 ml-0 p-2 textColor myBorder transition duration-300 ease-in-out opacity:80 hover:opacity-100 hover:bg-stone-500">
                                        Delete
                                    </button>
                                    <button onClick={handleEdit} className="w-1/2 rounded-md opacity-90 m-2 mr-0 p-2 textColor myBorder transition duration-300 ease-in-out opacity:80 hover:opacity-100 hover:bg-stone-500">
                                        Edit
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}
            <BackgroundImage />
            <Footer />
        </main>
    );
}