"use client";
import React from "react";
import Image from "next/image";
import vehicleImage from "../../assets/heroBg.png";
const Hero = () => {
  return (
    <section
      className="flex flex-col items-center bg-cover bg-center min-h-[816px] px-4 sm:px-6 lg:px-8 py-[196px]"
      style={{
        backgroundImage: `url(${vehicleImage?.src || "/default-hero.jpg"})`,
      }}
    >
      {/* Centered Container */}
      <div className="max-w-[978px] w-full flex flex-col gap-10 md:gap-16 items-center text-center">
        {/* Heading Section */}
        <header>
          <h1 className="font-Comfortaa font-bold leading-tight text-4xl md:text-5xl lg:text-7xl text-[#222121]">
            Are You Ready To Travel
          </h1>
          <h2 className="font-Comfortaa font-bold leading-tight text-4xl md:text-5xl lg:text-7xl text-primary">
            Nepal With Us?
          </h2>

          {/* Paragraph */}
          <p className="text-[14px] md:text-[16px] text-start font-light leading-[18px] md:leading-[22px] max-w-[90%] md:max-w-[785px] text-subheading mx-auto">
            Explore Nepal like never before with our top-notch vehicle rental
            services. Travel with ease and comfort, discovering breathtaking
            landscapes, rich cultures, and unforgettable experiences. Your
            adventure starts here!
          </p>
        </header>

        {/* Button Section */}
        <div className="w-full flex justify-center">
          <div className="flex items-center gap-6 md:gap-14">
            <a
              href="/about"
              className="relative overflow-hidden bg-[#045B8F] px-6 py-2 rounded-2xl font-Comfortaa text-white font-bold transition-all duration-300 ease-in-out hover:cursor-pointer 
  before:absolute before:inset-0 before:bg-gradient-to-r before:from-blue-100 before:to-blue-[#045B8F] before:opacity-0 before:transition-opacity before:duration-300 hover:before:opacity-100"
            >
              Learn More
            </a>

            <a
              href="/booking"
              className="px-6 hover:bg-[#045B8F] hover:text-white duration-1000 ease-in-out py-2 rounded-2xl font-Comfortaa text-[#045B8F] border-[1px] border-[#045B8F] font-bold hover:bg-primary-dark transition-colors hover:cursor-pointer"
            >
              E- Booking
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
