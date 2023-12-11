"use client";
import { useUserAuth } from "../_utils/auth-context";
import Link from "next/link";
import { useState, useEffect } from "react";

export default function Navbar({currentPage}) {
    const [navList, setNavList] = useState([])

    const { user, firebaseSignOut } = useUserAuth();

    const [viewSubNav, setViewSubNav] = useState(false);

    const [currentViewingPage, setCurrentViewingPage] = useState('');

    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false); // Toggle mobile menu

    // Toggle mobile menu
    const toggleMobileMenu = () => {
      setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    useEffect(() => {
      if (currentPage) {
          setCurrentViewingPage(currentPage);
          console.log(currentPage);
      }
    }, [currentPage]);

    useEffect(() => {
        if (user) {
            setNavList([
                { name: "Home", link: "/common-pages" },
                { name: "Events", link: "/events" },
                { name: "Contact Us", link: "/contact-us"},
                { name: "Management", link: "/management",
                    subNav: [
                        { name: "Manage Events", link: "/manage-events" },
                        { name: "Manage Volunteers", link: "../specific-page/manage-volunteers" },
                        { name: "Manage Users", link: "../specific-page/manage-users"},
                        { name: "Account", link: "/account"},
                    ]
                },
            ]);
        } else {
            setNavList([
                { name: "Home", link: "/common-pages" },
                { name: "Events", link: "/events" },
                { name: "Contact Us", link: "/contact-us"}
            ]);
        }
    }, [user]);

    return(
      <nav className=" h-12 flex items-center itemColor relative">
            {isMobileMenuOpen && (
              <div className="absolute top-0 left-8 itemColor w-44 h-48 md:hidden">
              </div>
            )}
            <div className="md:hidden absolute top-2 left-2">
              <button onClick={toggleMobileMenu}>
                  <svg
                      className="w-6 h-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      {/* Hamburger icon */}
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d={
                          isMobileMenuOpen
                            ? "M6 18L18 6M6 6l12 12"
                            : "M4 6h16M4 12h16m-7 6h7"
                        }
                      />
                  </svg>
              </button>
            </div>
            
            <ul className={`${
              isMobileMenuOpen ? "flex flex-col" : "hidden md:flex"
              } ml-8 p-1 h-full my-0 py-0 md:flex-row md:h-fit`}
            >
                {navList.map((navItem) => (
                    <div key={navItem.name}>
                    {navItem.name === 'Management' ? (
                      <div className="relative p-0 m-0 transition duration-300 ease-in-out" onMouseLeave={() => setViewSubNav(false)}>
                        <button className="h-full m-0" onClick={() => setViewSubNav(true)}>
                          <li
                            className={`mr-1 itemColor navItem transition duration-500 ease-in-out ${
                              navItem.name === currentViewingPage ? 'backgroundLightColor animate-pulse' : ''
                            }`}
                          >
                            <p className="my-1">{navItem.name + " ▼"}</p>
                          </li>
                        </button>
                        {viewSubNav && (
                          <ul className="absolute top-10 mt-2 py-2 bg-white rounded-b-md itemColor  w-48" style={{zIndex: 1}}>
                            {navItem.subNav.map((subNavItem) => (
                              <Link href={subNavItem.link} key={subNavItem.name} className="">
                                <li>
                                  <p className="my-1 p-3 hover:bg-stone-600 transition duration-500 ease-in-out">{subNavItem.name}</p>
                                </li>
                              </Link>
                            ))}
                          </ul>
                        )}
                      </div>
                    ) : (
                      <Link key={navItem.name} className="h-full m-0" href={navItem.link}>
                        <li
                          className={`mr-1 navItem transition duration-500 ease-in-out ${
                            navItem.name === currentViewingPage ? 'backgroundLightColor animate-pulse' : ''
                          }`}
                        >
                          <p className="my-1">{navItem.name}</p>
                        </li>
                      </Link>
                    )}
                  </div>
                ))}
            </ul>
            {user && (
                <div className="flex flex-row-reverse mr-6 pr-11 absolute right-6">
                    <p className="textColor text-sm text-center mt-0 font-bold">{user.email}</p>
                </div>
            )}
            
        </nav>
    )
}