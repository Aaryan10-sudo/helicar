"use client";
import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { assets } from "@/assets/assets";
import TimesArrowIcon from "@/ui/TimesArrowIcon";

const Navbar = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const dropdownRef = useRef(null);
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [menuOpen]);

  return (
    <nav className="sm:h-[80px] w-full bg-white flex items-center shadow-md px-5 sm:px-10 sticky top-0 z-50 h-[70px]">
      <div className="flex justify-between items-center w-full max-w-[1700px] mx-auto">
        <Link className=" font-bold" href={"/"}>
          <Image
            src={assets.navlogo.src}
            height={assets.navlogo.height}
            width={assets.navlogo.width}
            alt="navlogo"
          />
        </Link>

        <button
          className="lg:hidden block focus:outline-none"
          onClick={toggleMenu}
        >
          ☰
        </button>

        <ul className="lg:flex ml-10 gap-11 items-center space-x-6 text-lg font-medium hidden">
          <li>
            <Link
              href="/"
              className="font-Comfortaa font-medium leading-4 text-[#222121]"
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              href="/vehicle-rental"
              className="font-Comfortaa font-medium leading-4 text-[#222121]"
            >
              Vehicle Rental
            </Link>
          </li>

          <li>
            <Link
              href="/company"
              className="font-Comfortaa font-medium leading-4 text-[#222121]"
            >
              Company
            </Link>
          </li>
          <li>
            <Link
              href="/tariff-rate"
              className="font-Comfortaa font-medium leading-4 text-[#222121]"
            >
              Tariff Rate
            </Link>
          </li>
          <li>
            <Link
              href="/trekking"
              className="font-Comfortaa font-medium leading-4 text-[#222121]"
            >
              Trekking
            </Link>
          </li>
        </ul>

        <Link
          href={"/login"}
          className=" bg-primary text-white px-10 py-2 rounded-lg font-bold sm:block hidden"
        >
          Log In
        </Link>
      </div>

      <div
        className={`fixed top-0 left-0 h-full w-full z-50 flex transition-all duration-300 ease-in-out ${
          menuOpen ? "translate-x-0 opacity-100" : "-translate-x-full opacity-0"
        }`}
      >
        <div className="w-[70%] bg-white h-full flex flex-col items-start p-6">
          <div className="flex justify-between w-full items-center pb-[10px] border-b border-black">
            <div className="flex gap-2 items-center">
              <img src={assets.navlogo.src} className="h-[30px] " alt="Logo" />
            </div>
            <div
              className="text-black text-2xl cursor-pointer border-2"
              onClick={toggleMenu}
            >
              <TimesArrowIcon />
            </div>
          </div>
          <ul className="flex flex-col gap-8 mt-10 text-black text-[15px]">
            {[
              { label: "Home", path: "/" },
              { label: "Vehicle Rental", path: "/vehicle-rental" },
              { label: "Company", path: "/company" },
              { label: "Tarrif Rate", path: "/tarrif-rates" },
              { label: "Trekking", path: "/trekking" },
            ].map((link, index) => (
              <Link
                key={index}
                href={link.path}
                className={({ isActive }) =>
                  isActive ? "text-[#e3a253]" : "hover:text-[#e3a253]"
                }
                onClick={toggleMenu}
              >
                {link.label}
              </Link>
            ))}
          </ul>

          <div className="w-full flex justify-center">
            <Link
              href={"/login"}
              className="mt-6 text-blue-500 font-semibold text-center"
              onClick={toggleMenu}
            >
              Log In
            </Link>
          </div>
        </div>
        {/* Overlay */}
        <div
          className="w-[30%] bg-transparent backdrop-blur-md bg-opacity-75 transition-opacity duration-300 ease-in-out"
          onClick={toggleMenu}
          style={{ opacity: menuOpen ? 1 : 0 }}
        />
      </div>
    </nav>
  );
};

export default Navbar;
