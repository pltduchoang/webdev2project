"use client";
import { useUserAuth } from "../_utils/auth-context";
import BackgroundImage from "../components/background-image";
import BannerNav from "../components/banner-nav"
import Footer from "../components/footer"

export default function Page() {
    const { user } = useUserAuth();

    const currentPage = "Home" //pass current page to banner nav for styling
    return (
        <main className=" min-h-screen">
            <BannerNav currentPage={currentPage}/>
            <div className="text-center textColor font-semibold text-xl my-12">
                {user ? <p>Welcome {user.email}</p> : <p>Welcome, guest</p>}
                <p>The powerful management tools for your organization are here</p>
                <p>We are ready!</p>
            </div>
            <hr className="mx-20 bg-slate-400 "/>
            <BackgroundImage/>
            <Footer/>
        </main>
    )
}