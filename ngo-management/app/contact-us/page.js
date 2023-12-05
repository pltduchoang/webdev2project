import BackgroundImage from "../components/background-image";
import BannerNav from "../components/banner-nav";
import Footer from "../components/footer";




export default function Page () {
    return (
        <main>
            <BannerNav/>
            <div className="text-center textColor font-semibold text-xl my-12 min-h-screen">
                <p>Get in touch with us</p>
            </div>
            <BackgroundImage/>
            <Footer/>
        </main>
    );
}