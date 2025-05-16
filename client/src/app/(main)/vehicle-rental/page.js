"use client";
import VehicleSkeleton from "@/components/loader/vehicleSkeleton";
import { baseURL } from "@/config/config";
import useGetVehicle from "@/hooks/useVehicle";
import BusIcon from "@/ui/BusIcon";
import CarIcon from "@/ui/CarIcon";
import HiaceIcon from "@/ui/HiaceIcon";
import Loggages from "@/ui/Loggages";
import PeopleIcon from "@/ui/PeopleIcon";
import axios from "axios";
import Head from "next/head";
import Image from "next/image";
import { useEffect, useState } from "react";
import { assets } from "../../../assets/assets";
import TransmissionIcon from "@/ui/TransmissionIcon";
import JeepIcon from "@/ui/JeepIcon";

const VehicleRental = () => {
  const { loading } = useGetVehicle();
  const [allVehicles, setAllVehicles] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");

  const filterButton = [
    { title: "All", icon: null },
    { title: "Car", icon: <CarIcon /> },
    { title: "Hiace", icon: <HiaceIcon /> },
    { title: "Bus", icon: <BusIcon /> },
    { title: "Jeep", icon: <JeepIcon /> },
  ];

  useEffect(() => {
    const getAllVehicles = async () => {
      try {
        const result = await axios.get(`${baseURL}/vehicle/get`);
        setAllVehicles(result.data.data);
      } catch (error) {
        console.error("Error fetching vehicles:", error.message);
      }
    };
    getAllVehicles();
  }, []);

  // Filter vehicles by selected category
  const filteredVehicles = allVehicles.filter((vehicle) => {
    if (selectedCategory === "all") return true;
    return vehicle?.type?.name?.toLowerCase() === selectedCategory;
  });

  return (
    <>
      <Head>
        <title>Vehicle Rental in Nepal - Affordable Car & Heli Rentals</title>
        <meta
          name="description"
          content="Rent cars and helicopters in Nepal for your next adventure. Explore Muktinath, Everest, Pokhara, and more with our top-rated rental service."
        />
      </Head>

      <div className="flex flex-col gap-8 lg:gap-12 min-h-screen">
        {/* Hero Section */}
        <div
          className="flex flex-col items-center bg-cover bg-center py-12 lg:py-24 px-4 sm:px-6 lg:px-8 gap-8 md:gap-16 xl:gap-[500px]"
          style={{ backgroundImage: `url(${assets.vehicle.src})` }}
        >
          <div className="flex flex-col items-center w-full max-w-4xl xl:max-w-6xl gap-4">
            <h1 className="text-3xl sm:text-4xl font-Comfortaa md:text-5xl text-primary font-bold text-center">
              Vehicle Rental Service
            </h1>
            <p className="text-subheading text-sm sm:text-base font-light leading-3 text-justify max-w-[785px]">
              Lorem ipsum dolor sit amet consectetur. Malesuada a purus eu
              dignissim morbi egestas interdum viverra. Ac sed in egestas mattis
              eros.
            </p>
          </div>
        </div>

        {/* Filter Buttons */}
        <div className="px-4 sm:px-6 lg:px-8 w-full max-w-7xl mx-auto">
          <div className="mb-8 lg:mb-12">
            <h1 className="text-3xl sm:text-left font-Comfortaa sm:text-4xl md:text-5xl text-primary font-bold mb-4">
              Popular Vehicles:
            </h1>
            <div className="flex gap-4 flex-wrap">
              {filterButton.map(({ title, icon }) => (
                <button
                  key={title.toLowerCase()}
                  onClick={() => setSelectedCategory(title.toLowerCase())}
                  className={`flex items-center gap-2 cursor-pointer px-4 py-2 rounded-full ${
                    selectedCategory === title.toLowerCase()
                      ? "bg-primary text-white"
                      : "bg-gray-200 hover:bg-gray-300 transition-all text-black"
                  } transition`}
                >
                  {icon}
                  {title}
                </button>
              ))}
            </div>
          </div>

          {loading ? (
            <VehicleSkeleton />
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 mb-5 gap-8">
              {filteredVehicles.length === 0 ? (
                <p className="font-bold text-xl text-red-500 w-full">
                  No vehicles found
                </p>
              ) : (
                filteredVehicles.map((vehicle, index) => (
                  <div
                    key={index}
                    className="bg-white rounded-lg shadow-md overflow-hidden"
                  >
                    <Image
                      src={vehicle.vehicleImage}
                      alt={vehicle.vehicleName}
                      width={400}
                      height={250}
                      className="w-full h-52 object-cover"
                    />
                    <p className="bg-slate-100 w-[100px] h-[40px] flex justify-center items-center font-bold relative -top-[40px] rounded-tr-xl">
                      {vehicle.vehicleName}
                    </p>
                    <div className="p-4 flex items-center justify-between gap-2">
                      <h2 className="text-md font-bold flex gap-1 text-subheading">
                        <Loggages />
                        {vehicle.features.luggage}
                      </h2>
                      <p className="text-subheading text-md flex gap-1 line-clamp-2">
                        <PeopleIcon />
                        {vehicle.features.seats}
                      </p>
                      <p className="text-subheading text-md flex gap-1 font-semibold">
                        <TransmissionIcon />
                        {vehicle.features.transmission}
                      </p>
                    </div>
                    <div className="p-4 flex items-center justify-between">
                      <p className="text-2xl font-semibold">
                        ${vehicle.vehiclePrice} /
                        <span className="text-sm font-normal">
                          per day
                        </span>{" "}
                      </p>
                      <button className="bg-primary text-white font-semibold px-6 py-2 cursor-pointer hover:bg-blue-500 transition-all rounded-full">
                        Book Now
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default VehicleRental;
