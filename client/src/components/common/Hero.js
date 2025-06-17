"use client";
import { useEffect, useState } from "react";
import vehicleImage from "../../assets/herosection.jpg";
import Booking from "./Booking";
import axios from "axios";
<<<<<<< HEAD
=======
import { baseURL } from "@/config/config";
>>>>>>> f26b61727bf2f952cfac3a1f9a8a442bd8e9d1ac

const Hero = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  const [heroData, setHeroData] = useState({});

  useEffect(() => {
    async function getData() {
      try {
        const result = await axios({
          url: `${baseURL}/cms/hero`,
          method: "GET",
        });
        setHeroData(result.data.data);
        console.log(result.data.data);
      } catch (error) {
        console.log(`${error.message} `);
      }
    }
    getData();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    const handleHero = async () => {
      try {
        const response = await axios({
          method: "GET",
          url: ""
        })
      } catch (error) {
        console.log(error.message);
      }
    }
    

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section
      className="flex flex-col gap-[50px] items-center justify-center bg-cover bg-center min-h-[816px] px-4 sm:px-6 lg:px-8"
      style={{
        backgroundImage: heroData?.content?.image
          ? `url(${heroData?.content?.image})`
          : `url(${vehicleImage?.src || "/default-hero.jpg"})`,
      }}
    >
      <span
        className={`hidden sm:block fixed z-50 ${
          isScrolled ? "top-13" : "top-15 "
        } transition-all duration-300`}
      >
        <Booking />
      </span>
      <div className="max-w-[978px] w-full flex flex-col gap-10 md:gap-16 items-center text-center">
        <header>
          <h1 className="font-Comfortaa font-bold leading-tight text-4xl md:text-5xl lg:text-7xl text-white">
            {heroData?.content?.heading || "Are You Ready To Travel"}
          </h1>
          <h2 className="font-Comfortaa font-bold leading-tight text-4xl md:text-5xl lg:text-7xl text-primary">
            {heroData?.content?.subtitle || "Nepal With Us?"}
          </h2>
        </header>
      </div>
    </section>
  );
};

export default Hero;
