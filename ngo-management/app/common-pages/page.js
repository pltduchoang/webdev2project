"use client";
import { useEffect } from "react";
import { useUserAuth } from "../_utils/auth-context";
import BackgroundImage from "../components/background-image";
import BannerNav from "../components/banner-nav"
import Footer from "../components/footer"

export default function Page() {
    const { user, role } = useUserAuth();



    const currentPage = "Home" //pass current page to banner nav for styling
    return (
        <main className=" min-h-screen">
            <BannerNav currentPage={currentPage}/>
            <div className="text-center textColor font-semibold text-xl my-12 min-h-screen">
                {user ? <p>Welcome {user.email}</p> : <p>Welcome, guest</p>}
                <p>The powerful management tools for your organization are here</p>
                <p>We are ready!</p>
                <hr className="mx-20 my-20 bg-slate-400 "/>
                <h2 className="text-center textColor text-3xl">This page is under construction</h2>
            </div>
            <hr className="mx-20 bg-slate-400 "/>
            <BackgroundImage/>
            <Footer/>
        </main>
    )
}