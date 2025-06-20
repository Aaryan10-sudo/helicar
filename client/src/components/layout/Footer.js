import { assets } from "@/assets/assets";
import FacebookIcon from "@/ui/FacebookIcon";
import InstagramIcon from "@/ui/InstagramIcon";
import LinkedinIcon from "@/ui/LinkedinIcon";
import TiktokIcon from "@/ui/TiktokIcon";
import YoutubeIcon from "@/ui/YoutubeIcon";
import Image from "next/image";
import React from "react";

const Footer = () => {
  return (
    <footer className="bg-[#D7E9FB] w-full font-Comfortaa px-4 sm:px-8">
      <section className="py-8 sm:py-12 flex flex-col sm:flex-row justify-between border border-transparent border-b-black max-w-[1700px] mx-auto flex-wrap gap-8">
        <ul className="flex flex-col justify-center gap-2 cursor-pointer min-w-[150px]">
          <h1 className="font-bold text-xl sm:text-2xl md:text-3xl">Company</h1>
          <li className="text-base sm:text-lg md:text-xl">About us</li>
          <li className="text-base sm:text-lg md:text-xl">Contact us</li>
          <li className="text-base sm:text-lg md:text-xl">Policy</li>
        </ul>
        <ul className="flex flex-col justify-center gap-2 cursor-pointer min-w-[150px]">
          <h1 className="font-bold text-xl sm:text-2xl md:text-3xl">Partners</h1>
          <li className="text-base sm:text-lg md:text-xl">Trip Sansaar</li>
          <li className="text-base sm:text-lg md:text-xl">Helicar</li>
          <li className="text-base sm:text-lg md:text-xl">Nnine Solution</li>
        </ul>
        <ul className="flex flex-col justify-center gap-2 cursor-pointer min-w-[150px]">
          <h1 className="font-bold text-xl sm:text-2xl md:text-3xl">Services</h1>
          <li className="text-base sm:text-lg md:text-xl">Vehicle Rentals</li>
          <li className="text-base sm:text-lg md:text-xl">Heli Charter Service</li>
          <li className="text-base sm:text-lg md:text-xl">Booking</li>
        </ul>
        <div className="flex flex-col gap-3 py-5 sm:py-0 w-full sm:w-[350px]">
          <div className="flex flex-col items-center sm:items-start gap-2">
            <Image
              src={assets.navlogo.src}
              height={assets.navlogo.height}
              width={assets.navlogo.width}
              alt="navlogo"
              className="w-32 sm:w-40 h-auto"
            />
            <p className="text-center sm:text-left text-sm sm:text-base">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
          </div>
          <span className="flex justify-center sm:justify-start gap-4 mt-2">
            <FacebookIcon />
            <YoutubeIcon />
            <InstagramIcon />
            <LinkedinIcon />
            <TiktokIcon />
          </span>
        </div>
      </section>
      <p className="text-center py-4 text-base sm:text-lg font-medium">
        Contact us : +977 9751262833
      </p>
    </footer>
  );
};

export default Footer;
