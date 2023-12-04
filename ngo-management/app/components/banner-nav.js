"use client";
import { useState, useEffect } from "react";
import { useUserAuth } from "../_utils/auth-context";
import Navbar from "./navbar";
import Logo from "./logo";
import Link from "next/link"; // Import Link from Next.js

export default function BannerNav({currentPage}) {
  const { user, gitHubSignIn, firebaseSignOut } = useUserAuth();

  const [buttonList, setButtonList] = useState([]); // Create a state for the buttons
  useEffect(() => {
    if (user) {
      setButtonList([
        { name: "Sign Out", onClick: firebaseSignOut },
      ]);
    } else {
      setButtonList([
        { name: "Sign In", link: "/", onClick: null }, // Provide the link for Sign In
        { name: "Sign Up", onClick: null }
      ]);
    }
  }, [user, firebaseSignOut]);

  return (
    <div className="">
      <div className="flex items-center p-6 backgroundDarkColor">
        <div className="w-10/12 pl-6 flex items-center"> 
            <Logo/>
            <p className="ml-6 textColor text-lg md:text-4xl">HELP YOU HELP OTHERS</p>
        </div>
        <div className="w-2/12 flex justify-evenly">
            {buttonList.map((button, index) => (
              // Check if the button has a link defined and use Link from Next.js if so
              button.link ? (
                <Link href={button.link} key={index}>
                  <p className="textColor py-1 px-2 transition duration-300 ease-in-out hover:bg-orange-500 rounded-md myBorder text-sm">
                    {button.name}
                  </p>
                </Link>
              ) : (
                <button
                  className="textColor py-1 px-2 transition duration-300 ease-in-out hover:bg-orange-500 rounded-md myBorder text-sm"
                  key={index}
                  onClick={button.onClick}
                >
                  {button.name}
                </button>
              )
            ))}
        </div>
      </div>
      <Navbar currentPage={currentPage} />
    </div>
  );
}
