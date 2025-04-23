"use client";
import React, { useEffect } from "react";
import { assets } from "../../../assets/assets";
import Head from "next/head";
import Image from "next/image";
import useGetVehicle from "@/hooks/useVehicle";
import VehicleSkeleton from "@/components/loader/vehicleSkeleton";

const VehicleRental = () => {
  const { loading, vehicles } = useGetVehicle();

  return (
    <>
      <Head>
        <title>Vehicle Rental in Nepal - Affordable Car & Heli Rentals</title>
        <meta
          name="description"
          content="Rent cars and helicopters in Nepal for your next adventure. Explore Muktinath, Everest, Pokhara, and more with our top-rated rental service."
        />
      </Head>
      <div className="flex flex-col gap-8 lg:gap-12">
        {/* Vehicle rental first */}
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
              eros. Lorem ipsum dolor sit amet consectetur. Malesuada a purus eu
              dignissim morbi egestas interdum viverra. Ac sed in egestas mattis
              eros.
            </p>
          </div>
          <div className="bg-white flex flex-col sm:flex-row gap-4 sm:gap-6 rounded-xl w-full max-w-6xl p-4 sm:p-6 shadow-2xl">
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 w-full">
              <div className="flex flex-col gap-2">
                <label className="font-comfortaa font-normal text-sm">
                  Services
                </label>
                <select className="w-full h-10 px-3 border border-gray-300 rounded-md font-[400px] text-subheading leading-4 appearance-none">
                  <option value="">Car</option>
                  <option value="">Heli</option>
                </select>
              </div>
              <div className="flex flex-col gap-2">
                <label className="font-comfortaa font-normal text-sm">
                  Vehicles Category
                </label>
                <select className="w-full h-10 px-3 border border-gray-300 font-[400px] text-subheading leading-4 rounded-md appearance-none">
                  <option value="">Car</option>
                  <option value="">Heli</option>
                </select>
              </div>
              <div className="flex flex-col gap-2">
                <label className="font-comfortaa font-normal text-sm">
                  Price Range
                </label>
                <select className="w-full h-10 px-3 border border-gray-300 font-[400px] text-subheading leading-4 rounded-md appearance-none">
                  <option value="">Car</option>
                  <option value="">Heli</option>
                </select>
              </div>
              <div className="flex flex-col gap-2">
                <label className="font-comfortaa font-normal text-sm">
                  Sort By
                </label>
                <select className="w-full h-10 px-3 border border-gray-300 font-[400px] text-subheading leading-4 rounded-md appearance-none">
                  <option value="">Price High to low</option>
                  <option value="">Car</option>
                  <option value="">Heli</option>
                </select>
              </div>
            </div>
            <div className="sm:self-end w-full max-w-[110px] self-end sm:w-auto ">
              <button className="bg-primary hover:cursor-pointer w-full sm:w-32 rounded-2xl h-10 flex items-center justify-center gap-2.5 hover:bg-primary-dark transition-colors">
                <p className="font-comfortaa text-white font-bold text-sm sm:text-base">
                  Search
                </p>
              </button>
            </div>
          </div>
        </div>

        {/* Popular Vehicles Section */}
        <div className="px-4 sm:px-6 lg:px-8 w-full max-w-7xl mx-auto py-12 lg:py-20">
          <div className="mb-8 lg:mb-12">
            <h1 className="text-3xl sm:text-left font-Comfortaa sm:text-4xl md:text-5xl text-primary font-bold">
              Popular Vehicles:
            </h1>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {loading ? (
              // Show 6 skeleton placeholders while loading
              [...Array(6)].map((_, index) => <VehicleSkeleton key={index} />)
            ) : vehicles?.data?.vehicles?.length > 0 ? (
              vehicles.data.vehicles.map((vehicle, index) => (
                <div
                  key={index}
                  className="w-full max-w-sm mx-auto p-4 sm:p-6 rounded-2xl shadow-xl hover:shadow-2xl transition-shadow"
                >
                  <div className="flex flex-col gap-4">
                    <h2 className="font-bold font-Comfortaa text-primary text-xl sm:text-2xl">
                      {vehicle.name}
                    </h2>
                    <Image
                      src={assets.muktinathTemple.src}
                      width={assets.muktinathTemple.width}
                      height={assets.muktinathTemple.height}
                      className="w-full h-48 object-cover rounded-lg"
                      alt="Vehicle Image"
                    />
                    <div className="flex justify-between text-subheading text-sm">
                      <span>{vehicle.capacity.luggage} Luggages</span>
                      <span>{vehicle.capacity.passengers} People</span>
                      <span>{vehicle.transmission}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="text-[#222121]">
                        <span className="text-2xl sm:text-3xl font-bold">
                          ${vehicle.pricing.perDay}/
                        </span>
                        <span className="text-sm ml-1">per day</span>
                      </div>
                      <button className="bg-[#045B8F] px-6 py-2 rounded-2xl text-white font-bold hover:bg-primary-dark transition-colors hover:cursor-pointer">
                        Book Now
                      </button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              // Display when no vehicles are found
              <div className="w-full max-w-sm mx-auto p-4 sm:p-6 rounded-2xl shadow-xl transition-shadow">
                <div className="flex justify-center items-center h-full">
                  <p className="font-bold text-2xl sm:text-3xl text-red-500">
                    No vehicles found.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default VehicleRental;
