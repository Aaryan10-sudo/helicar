"use client";
import { baseURL } from "@/config/config";
import Loggages from "@/ui/Loggages";
import ManualIcon from "@/ui/ManualIcon";
import PeopleIcon from "@/ui/PeopleIcon";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const Page = () => {
  const vehicleTypes = [
    { heading: "Cars", name: "cars" },
    { heading: "Toyota Hiace", name: "hiace" },
    { heading: "Jeep", name: "jeeps" },
    { heading: "Bus", name: "bus" },
  ];

  const [vehicle, setVehicle] = useState([]);
  const [vehicleName, setVehicleName] = useState("cars");
  const [selectedVehicle, setSelectedVehicle] = useState("Cars");
  const router = useRouter();

  const handleBookNow = (cardId) => {
    router.push(`/complete-booking?cardId=${cardId}`);
  };

  const getVehicles = async () => {
    try {
      const result = await axios.get(`${baseURL}/vehicle/get/${vehicleName}`);
      setVehicle(result.data.data);
    } catch (error) {
      console.error("Failed to fetch vehicles:", error);
    }
  };

  useEffect(() => {
    getVehicles();
  }, [vehicleName]);

  return (
    <section className="p-16 min-h-screen">
      <div className="flex flex-wrap gap-2 mb-4">
        {vehicleTypes.map((type) => (
          <button
            key={type.name}
            onClick={() => {
              setVehicleName(type.name);
              setSelectedVehicle(type.heading);
            }}
            className={`px-4 py-2 rounded-full font-medium transition ${
              selectedVehicle === type.heading
                ? "bg-blue-600 text-white"
                : "bg-gray-200 hover:bg-gray-300"
            }`}
          >
            {type.heading}
          </button>
        ))}
      </div>

      <span className="flex justify-start flex-wrap gap-5">
        {vehicle.map((value, index) => (
          <div className="w-[370px] h-[400px] shadow-xl" key={index}>
            <div
              className="bg-black h-[250px] bg-center bg-cover"
              style={{
                backgroundImage: `url(${value.vehicleImage || "/default-hero.jpg"})`,
              }}
            ></div>

            <div className="p-2 flex items-center gap-3.5 justify-between flex-col w-full">
              <div className="mt-2 flex items-center text-gray-500 justify-between gap-3">
                <p className="flex items-center justify-center gap-1">
                  <Loggages /> {value.features?.luggage} luggage
                </p>
                <p className="flex items-center gap-1">
                  <PeopleIcon /> {value.features?.seats} persons
                </p>
                <p className="flex items-center gap-1">
                  <ManualIcon /> {value.features?.transmission}
                </p>
              </div>

              <div className="mt-3 p-1 flex items-center justify-between w-full">
                <p className="text-xl font-semibold flex items-center justify-center gap-1">
                  Rs. {value.vehiclePrice}/{" "}
                  <span className="text-sm">per Day</span>
                </p>

                {value.vehicleStatus === "Occupied" ? (
                  <button
                    disabled
                    className="bg-red-600 cursor-not-allowed text-white px-4 py-2 rounded-full mt-2"
                  >
                    Occupied
                  </button>
                ) : (
                  <button
                    onClick={() => handleBookNow(value.id)}
                    className="bg-blue-600 cursor-pointer hover:bg-blue-700 transition-all text-white px-4 py-2 rounded-full mt-2"
                  >
                    Book now
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </span>
    </section>
  );
};

export default Page;
