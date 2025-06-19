"use client";
import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { assets } from "@/assets/assets";
import TimesArrowIcon from "@/ui/TimesArrowIcon";

const Navbar = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState(null);
  const dropdownRef = useRef(null);
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const handleTab = (index) => {
    setActive(index);
  };
  const navLinks = [
    { title: "Home", path: "/" },
    { title: "Vehicle Rental", path: "/vehicle-rental" },
    { title: "Company", path: "/company" },
    { title: "Blog", path: "/blog" },
    { title: "Tarrif Rate", path: "/tarrif-rate" },
    { title: "Trekking", path: "/trekking" },
  ];

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

        <ul className="sm:flex hidden items-center justify-center gap-12">
          {navLinks.map((value, index) => (
            <li key={index}>
              <Link
                href={value.path}
                onClick={() => handleTab(index)}
                style={{
                  boxShadow:
                    active === index
                      ? "0 4px 6px rgba(8, 125, 194, 0.15)"
                      : "none",
                }}
                className={`px-4 py-2 rounded-sm transition-all duration-200
              hover:bg-primary hover:text-white
              ${active === index ? "bg-primary  text-white" : "text-black"}`}
              >
                {value.title}
              </Link>
            </li>
          ))}
        </ul>

        <Link
          href={"/login"}
          className=" underline decoration-1 text-primary px-10 py-2 rounded-lg font-medium sm:block hidden"
        >
          Log in
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
                className="hover:text-[#e3a253]"
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
