import BackgroundImage from "../components/background-image";
import BannerNav from "../components/banner-nav";
import Footer from "../components/footer";




export default function Page () {
    return (
        <main>
            <BannerNav/>
            <div className="text-center textColor font-semibold text-xl my-12 min-h-screen">
                <p>This is where you can manage your profile</p>
                <hr className="mx-20 my-20 bg-slate-400 "/>
                <h2 className="text-center textColor text-3xl">This page is under construction</h2>
            </div>
            <BackgroundImage/>
            <Footer/>
        </main>
    );
}