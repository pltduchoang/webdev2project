"use client";
import React, { useEffect, useState } from "react";
import { useUserAuth } from "../_utils/auth-context";
import BackgroundImage from "../components/background-image";
import BannerNav from "../components/banner-nav";
import Footer from "../components/footer";
import EventList from "./event-list";
import EventDetail from "./event-detail";
import AddEvent from "./add-event";
import { subscribeToEvents } from "../_services/event-services";
import EditEvent from "./edit-event";

export default function Page() {
    const { user } = useUserAuth();
    const [eventList, setEventList] = useState([]);


    //subscribe to events
    useEffect(() => {
        if (user) {
          const unsubscribe = subscribeToEvents(setEventList);
          return () => unsubscribe();
        }
      }, [user]);

    const [eventDetails, setEventDetails] = useState(null); //event details to be passed to event details page
    const [addingEvent, setAddingEvent] = useState(false); //state to determine if user is adding an event
    const [showConfirmation, setShowConfirmation] = useState(false); //state to determine if user is adding an event
    const [editEvent, setEditEvent] = useState(null); //event details to be passed to event details page
    // const [editPage, setEditPage] = useState(false); //state to determine if user is adding an event
    
    
    //handle add button to pop up add event page
    const handleAddButton = () => {
        setAddingEvent(true);
    }  


    //handle close add event page by pop up confirmation
    const handleCloseAddEvent = () => {

        setShowConfirmation(true);
    }

    //handle close add event page after confirmation is clicked
    const handleCloseAfterConfirm = (confirmed) => {
        if (addingEvent) {
            if (confirmed) {
                setAddingEvent(false);
                setShowConfirmation(false);
            } else {
                setShowConfirmation(false);
            }
        } else if (editEvent) {
            if (confirmed) {
                setEditEvent(null);
                setShowConfirmation(false);
            } else {
                setShowConfirmation(false);
            }
        }
      };

    // handle event details to pop up event details page
    const handleEventDetails = (event) => {
        if(event){
            setEventDetails(event);
        }
    }

    // handle close event details page
    const handleCloseDetails = () => {
        setEventDetails(null);
    }
    
    //handle edit event to pop up edit event page
    const handleEditEvent = (event) => {

        if(event){setEditEvent(event);}
    }

    //handle close edit event page
    const handleCloseEditEvent = () => {
        setShowConfirmation(true);
    }

    //pass current page to banner nav for styling
    const currentPage = "Management" 


    return (
        <main>
            {/* Add event button that is fix on screen */}
            {user && (
                <div className="fixed bottom-20 right-8" style={{zIndex: 1}}>
                <button onClick={handleAddButton} className="itemColor textColor opacity-80 rounded-full p-4 shadow-lg transition duration-300 ease-in-out focus:outline-none hover:opacity-100">
                    <p className="mx-2 text-5xl">+</p>
                </button>
                </div>
            )}

            {/* Showing list of event, if not logged in, show a message */}
            {user ? (
                <main className=" min-h-screen">
                <BannerNav currentPage={currentPage}/>
                <div className="text-center textColor font-semibold text-xl my-12">
                    {user ? <p>Welcome {user.email}</p> : <p>Welcome, guest</p>}
                    <p>Let&apos;s manage your events with ease</p>
                </div>
                <hr className="mx-20 bg-slate-400 "/>
                {eventList.length>0 && <EventList eventList={eventList} passEditEvent={handleEditEvent} passEventUp2={handleEventDetails}/>}
                <BackgroundImage/>
                <Footer/>
            </main>
            ) : (
                <main className=" min-h-screen">
                    <BannerNav currentPage={currentPage}/>
                    <div className="min-h-screen flex items-center w-full justify-center">
                        <p className="p-40 rounded-md textColor backgroundDarkColor opacity-90">Access Denied, please login</p>
                    </div>
                    <BackgroundImage/>
                    <Footer/>
                </main>
            )}


            {/* Pop up event details page */}
            {eventDetails && (
                <div
                    className="fixed top-0 left-0 min-h-screen w-full backgroundLightColor opacity-100 transition-transform duration-300 ease-in-out"
                    style={{ zIndex: 1 }}
                    onClick={handleCloseDetails}
                    cursor="pointer"
                >
                    <div className="fixed bottom-20 right-8">
                        <button
                            onClick={handleCloseDetails}
                            className="itemColor textColor opacity-80 rounded-full p-4 shadow-lg transition duration-300 ease-in-out focus:outline-none hover:opacity-100"
                        >
                            <p className="mx-3 text-5xl">x</p>
                        </button>
                    </div>
                    <div
                        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <EventDetail event={eventDetails} passEditEvent={handleEditEvent} turnOffEventDetail={handleCloseDetails}/>
                    </div>
                </div>
            )}
            
            {/* Pop up add event page */}
            {addingEvent && (
                <div
                    className="fixed top-0 left-0 min-h-screen w-full backgroundLightColor opacity-100 transition-transform duration-300 ease-in-out"
                    style={{ zIndex: 1 }}
                    onClick={(e) => e.stopPropagation()}
                >
                    <div className="fixed bottom-20 right-8">
                        <button
                            onClick={handleCloseAddEvent}
                            className="itemColor textColor opacity-80 rounded-full p-4 shadow-lg transition duration-300 ease-in-out focus:outline-none hover:opacity-100"
                            style={{zIndex: 3}}
                        >
                            <p className="mx-3 text-5xl">x</p>
                        </button>
                    </div>
                    <div
                        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-8/12"
                        onClick={(e) => e.stopPropagation()}
                        style={{zIndex: 2}}
                    >
                        <AddEvent/>
                    </div>
                </div>
            )}

            {/* Pop up confirmation page for when closing the adding event form and edit event form */}
            {showConfirmation && (
            <div className="confirmation-modal fixed inset-0 flex items-center justify-center backgroundLightColor"
            style={{zIndex:4}}>
                <div className="backgroundDarkColor p-6 rounded-lg shadow-lg textColor">
                    <p>Are you sure you want to cancel?</p>
                    <p> Unsaved data will be lost!</p>
                    <div className="flex justify-around mt-5">
                        <button onClick={() => handleCloseAfterConfirm(true)} className="w-12 hover:bg-orange-500 rounded-md myBorder transition duration-300 ease-in-out">Yes</button>
                        <button onClick={() => handleCloseAfterConfirm(false)} className="w-12 hover:bg-orange-500 rounded-md myBorder transition duration-300 ease-in-out">No</button>
                    </div>
                </div>
            </div>
            )}


            {/* Pop up edit event page */}
            {editEvent && (
            <div
            className="fixed top-0 left-0 min-h-screen w-full backgroundLightColor opacity-100 transition-transform duration-300 ease-in-out"
            style={{ zIndex: 1 }}
            onClick={(e) => e.stopPropagation()}
            >
                <div className="fixed bottom-20 right-8">
                    <button
                        onClick={handleCloseEditEvent}
                        className="itemColor textColor opacity-80 rounded-full p-4 shadow-lg transition duration-300 ease-in-out focus:outline-none hover:opacity-100"
                        style={{zIndex: 3}}
                    >
                        <p className="mx-3 text-5xl">x</p>
                    </button>
                </div>
                <div
                    className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-8/12"
                    onClick={(e) => e.stopPropagation()}
                    style={{zIndex: 2}}
                >
                    <EditEvent editEvent={editEvent}/>
                </div>
            </div>
            )}
        </main>
    )
}



//comment section
  
    
