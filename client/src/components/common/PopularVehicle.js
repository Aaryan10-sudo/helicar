"use client";
import React from "react";
import Image from "next/image";
import VehicleSkeleton from "@/components/loader/vehicleSkeleton";
import { assets } from "@/assets/assets";

const PopularVehicles = ({ loading, vehicles, limit = 6 }) => {
  const displayedVehicles = limit
    ? vehicles?.data?.vehicles?.slice(0, limit)
    : vehicles?.data?.vehicles;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {loading ? (
        // Show 6 skeleton placeholders while loading
        [...Array(limit)].map((_, index) => <VehicleSkeleton key={index} />)
      ) : displayedVehicles?.length > 0 ? (
        displayedVehicles.map((vehicle, index) => (
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
  );
};

export default PopularVehicles;
