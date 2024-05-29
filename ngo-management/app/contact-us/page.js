import Link from "next/link";
import BackgroundImage from "../components/background-image";
import BannerNav from "../components/banner-nav";
import Footer from "../components/footer";




export default function Page () {
    return (
        <main>
            <BannerNav/>
            <div className="text-center textColor font-semibold text-xl my-12 min-h-screen">
                <p>Get in touch with us</p>
                <hr className="mx-20 my-20 bg-slate-400 "/>
                <h2 className="text-center textColor text-2xl">This project is developed by Duc Hoang</h2>
                <p className="textColor text-2xl">Contact me via:</p>
                <div className="w-full flex space-x-6 justify-center py-20">
                    <Link href="mailto:plt.duchoang@gmail.com">Email</Link>
                    <Link href="https://www.linkedin.com/in/hoanganhduc/">LinkedIn</Link>
                    <Link href="https://github.com/pltduchoang">Github</Link>
                </div>
            </div>
            <BackgroundImage/>
            <Footer/>
        </main>
    );
}