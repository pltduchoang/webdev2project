"use client";
import Link from "next/link";
import { useState } from "react";

export default function Logo() {
  const [hovered, setHovered] = useState(false);

  const handleMouseEnter = () => {
    setHovered(true);
  };

  const handleMouseLeave = () => {
    setHovered(false);
  };

  return (
    <Link href="../common-pages">
      <div
        className={`w-36 h-20 flex flex-col backgroundDarkColor rounded-xl p-1 justify-center myBorder transition-all duration-300 ease-in-out ${hovered ? 'scale-105 backgroundLightColor' : 'backgroundDarkColor'}`}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <p className="textColor text-4xl text-center my-0 font-bold">NGO</p>
        <p className="textColor text-sm text-center mt-0 font-bold">management</p>
      </div>
    </Link>
  );
}
