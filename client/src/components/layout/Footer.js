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
    <footer className="bg-[#D7E9FB] w-full  font-Comfortaa px-[10px] sm:px-0">
      <section className="py-[50px] flex justify-between border border-transparent border-b-black max-w-[1700px] mx-auto flex-wrap gap-5 sm:gap-0">
        {" "}
        <ul className="flex flex-col justify-center gap-2 cursor-pointer ">
          <h1 className="font-bold text-[30px]">Company</h1>
          <li className="text-[20px]">About us</li>
          <li className="text-[20px]">Contact us</li>
          <li className="text-[20px]">Policy</li>
        </ul>
        <ul className="flex flex-col justify-center gap-2 cursor-pointer">
          <h1 className="font-bold text-[30px]">Partners</h1>
          <li className="text-[20px]">Trip Sansaar</li>
          <li className="text-[20px]">Helicar</li>
          <li className="text-[20px]">Nnine Solution</li>
        </ul>
        <ul className="flex flex-col justify-center gap-2 cursor-pointer ">
          <h1 className="font-bold text-[30px]">Services</h1>
          <li className="text-[20px]">Vehicle Rentals</li>
          <li className="text-[20px]">Heli Charter Service</li>
          <li className="text-[20px]">Booking</li>
        </ul>
        <div className="w-[400px] flex flex-col gap-3  py-5 sm:py-0">
          <Image
            src={assets.navlogo.src}
            height={assets.navlogo.height}
            width={assets.navlogo.width}
            alt="navlogo"
          />
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>

          <span className="flex gap-5">
            <FacebookIcon />
            <YoutubeIcon />
            <InstagramIcon />
            <LinkedinIcon />
            <TiktokIcon />
          </span>
        </div>
      </section>
      <p className="text-center py-4 text-[18px] font-medium">
        Contact us : +977 9751262833
      </p>
    </footer>
  );
};

export default Footer;
