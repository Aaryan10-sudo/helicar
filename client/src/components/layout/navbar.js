"use client";
import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { assets } from "@/assets/assets";

const Navbar = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav className="h-[88px] w-full bg-white flex items-center shadow-md px-10">
      <div className="flex justify-between items-center w-full">
        {/* Logo */}
        <div className=" font-bold">
          <Image
            src={assets.navlogo.src}
            height={assets.navlogo.height}
            width={assets.navlogo.width}
            alt="navlogo"
          />
        </div>

        {/* Mobile Menu Button */}
        <button
          className="lg:hidden block focus:outline-none"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          ☰
        </button>

        {/* Navigation Links */}
        <ul
          className={`lg:flex ml-10 gap-11 items-center space-x-6 text-lg font-medium ${
            menuOpen
              ? "block absolute top-full left-0 w-full bg-white shadow-lg p-5 space-y-4"
              : "hidden lg:flex"
          }`}
        >
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
          <li className="relative" ref={dropdownRef}>
            <button
              className="flex items-center space-x-1"
              onMouseEnter={() => setDropdownOpen(true)}
              onMouseLeave={() => setDropdownOpen(false)}
            >
              <span className="font-Comfortaa font-medium leading-4 text-[#222121]">
                Heli Charter
              </span>
            </button>
            {dropdownOpen && (
              <ul
                className="absolute left-0 mt-2 w-48 bg-white shadow-lg rounded-lg py-2"
                onMouseEnter={() => setDropdownOpen(true)}
                onMouseLeave={() => setDropdownOpen(false)}
              >
                <li className="px-4 py-2 hover:bg-gray-100">
                  <Link
                    className="font-Comfortaa font-medium leading-4 text-[#222121]"
                    href="/heli-charter/option1"
                  >
                    Option 1
                  </Link>
                </li>
                <li className="px-4 py-2 hover:bg-gray-100">
                  <Link
                    className="font-Comfortaa font-medium leading-4 text-[#222121]"
                    href="/heli-charter/option2"
                  >
                    Option 2
                  </Link>
                </li>
              </ul>
            )}
          </li>
          <li>
            <Link
              href="/day-tours"
              className="font-Comfortaa font-medium leading-4 text-[#222121]"
            >
              Day Tours
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
              href="/online-payment"
              className="font-Comfortaa font-medium leading-4 text-[#222121]"
            >
              Online Payment
            </Link>
          </li>
        </ul>

        <Link
          href={"/login"}
          className=" bg-blue-500 text-white px-10 py-2 rounded-lg font-bold"
        >
          Log In
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
