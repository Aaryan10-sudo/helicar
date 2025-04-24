"use client";
import React from "react";
import Image from "next/image";
import vehicleImage from "../../assets/herosection.jpg";
import Booking from "./Booking";
const Hero = () => {
  return (
    <section
      className="flex flex-col gap-[50px] items-center bg-cover bg-center min-h-[816px] px-4 sm:px-6 lg:px-8 py-[196px]"
      style={{
        backgroundImage: `url(${vehicleImage?.src || "/default-hero.jpg"}) `,
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
      </div>

      <Booking />
    </section>
  );
};

export default Hero;
