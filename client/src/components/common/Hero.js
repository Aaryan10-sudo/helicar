"use client";
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
      <div className="max-w-[978px] w-full flex flex-col gap-10 md:gap-16 items-center text-center">
        <header>
          <h1 className="font-Comfortaa font-bold leading-tight text-4xl md:text-5xl lg:text-7xl text-white">
            Are You Ready To Travel
          </h1>
          <h2 className="font-Comfortaa font-bold leading-tight text-4xl md:text-5xl lg:text-7xl text-primary">
            Nepal With Us?
          </h2>
        </header>
      </div>

      <span className="hidden sm:block">
        <Booking />
      </span>
    </section>
  );
};

export default Hero;
