"use client";
import { useUserAuth } from "../_utils/auth-context";
import BackgroundImage from "../components/background-image";
import BannerNav from "../components/banner-nav"
import Footer from "../components/footer"
import EventList from "./event-list";
import { useState, useEffect } from "react";
import { subscribeToEvents } from "../_services/event-services";
import EventDetail from "./event-detail";
import RegisterForm from "./register-form";
import QuickLoginCard from "./quick-login-card";


export default function Page() {
    const { user } = useUserAuth();
    const [eventList, setEventList] = useState([]);
    const [eventDetails, setEventDetails] = useState(null);
    const [registerForm, setRegisterForm] = useState(false);
    const [targetForm, setTargetForm] = useState(null);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [showLogInCard, setShowLogInCard] = useState(false);
    

    useEffect(() => {
        
          const unsubscribe = subscribeToEvents(setEventList);
          return () => unsubscribe();
        
      }, []);
    
    const handleEventDetails = (event) => {
        if(event){
            setEventDetails(event);
        }
    }

    const handleCloseDetails = () => {
      setEventDetails(null);
    }

    const handleAttend = (event) => {
        setRegisterForm(event);
        setTargetForm("Attendee");
    }

    const handleVolunteer = (event) => {
        setRegisterForm(event);
        setTargetForm("Volunteer");
    }

    const handleCloseRegisterForm = () => {
        setRegisterForm(null);
    }

    const handleSubmitted = () => {
        setRegisterForm(false);
        setTargetForm(null);
    }

    const handleLoginFromCard = (e) => {
        setShowLogInCard(e);
    }
    
    const currentPage = "Events" //pass current page to banner nav for styling
    return (
        <main className=" min-h-screen">
            <BannerNav currentPage={currentPage}/>
            <div className="text-center textColor font-semibold text-2xl my-12">
                {user ? <p>Welcome {user.email}</p> : <p>Welcome, guest</p>}
                <p>The exciting events are here</p>
            </div>
            <hr className="mx-20 bg-slate-400 "/>
            <EventList eventList={eventList} passEvent={handleEventDetails} passAttend={handleAttend} passVolunteer={handleVolunteer} isSubmitted={isSubmitted} passLoginRequest={handleLoginFromCard}/>
            <BackgroundImage/>
            <Footer/>
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
                        <EventDetail event={eventDetails} />
                    </div>
                </div>
            )}
            {/* Pop up register form */}
            {registerForm && (
                <div
                    className="fixed top-0 left-0 min-h-screen w-full backgroundLightColor opacity-100 flex"
                    style={{ zIndex: 1 }}
                    onClick={(e) => e.stopPropagation()}
                >
                    <div className="fixed bottom-20 right-8">
                        <button
                            onClick={handleCloseRegisterForm}
                            className="itemColor textColor opacity-80 rounded-full p-4 shadow-lg transition duration-300 ease-in-out focus:outline-none hover:opacity-100"
                            style={{zIndex: 3}}
                        >
                            <p className="mx-3 text-5xl">x</p>
                        </button>
                    </div>
                    <div
                        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full md:w-8/12 lg:w-6/12"
                        onClick={(e) => e.stopPropagation()}
                        style={{zIndex: 2}}
                    >
                        <RegisterForm event={registerForm} formTitle={targetForm} isSubmitted={handleSubmitted}/>
                    </div>
                </div>
            )}

            {/* pop up login card */}
            {showLogInCard && (
            <div
                className="fixed top-0 left-0 min-h-screen w-full backgroundLightColor opacity-100 flex"
                style={{ zIndex: 1 }}
                onClick={(e) => e.stopPropagation()}
                >
                <div className="fixed bottom-20 right-8">
                    <button
                        onClick={handleCloseRegisterForm}
                        className="itemColor textColor opacity-80 rounded-full p-4 shadow-lg transition duration-300 ease-in-out focus:outline-none hover:opacity-100"
                        style={{zIndex: 3}}
                    >
                        <p className="mx-3 text-5xl">x</p>
                    </button>
                </div>
                <div
                    className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full md:w-8/12 lg:w-6/12"
                    onClick={(e) => e.stopPropagation()}
                    style={{zIndex: 2}}
                >
                    <QuickLoginCard onLogin={() => setShowLogInCard(false)}/>
                </div>
                <div className="fixed bottom-20 right-8" style={{zIndex: 1}}>
                <button onClick={() => setShowLogInCard(false)} className="itemColor textColor opacity-80 rounded-full p-4 shadow-lg transition duration-300 ease-in-out focus:outline-none hover:opacity-100">
                    <p className="mx-2 text-5xl">X</p>
                </button>
                </div>
            </div>
            )}
        </main>
    )
}