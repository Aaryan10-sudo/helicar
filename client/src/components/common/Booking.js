"use client";

import Link from "next/link";
import React, { useState } from "react";

export default function Booking() {
  const vehicleTypes = ["Cars", "Toyota Hiace", "Jeep", "Bus"];
  const [selectedVehicle, setSelectedVehicle] = useState("Cars");

  const vehicleSlugMap = {
    Cars: "cars",
    "Toyota Hiace": "hiaces",
    Jeep: "jeeps",
    Bus: "buses",
  };

  const inputFields = [
    {
      id: "pickup",
      label: "Pick-up",
      placeholder: "Search client name, car, etc",
    },
    {
      id: "return",
      label: "Return",
      placeholder: "Search client name, car, etc",
    },
  ];

  const dateTimeFields = [
    {
      label: "Pick-up date",
      dateId: "pickup-date",
      timeId: "pickup-time",
    },
    {
      label: "Return Date",
      dateId: "return-date",
      timeId: "return-time",
    },
  ];

  return (
    <div className="p-8 font-sans">
      <div className="p-10 bg-gray-100 rounded-xl">
        <div className="flex flex-wrap gap-2 mb-4">
          {vehicleTypes.map((type) => (
            <button
              key={type}
              onClick={() => setSelectedVehicle(type)}
              className={`px-4 py-2 rounded-full font-medium transition ${
                selectedVehicle === type
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 hover:bg-gray-300"
              }`}
            >
              {type}
            </button>
          ))}
        </div>

        <div className="flex flex-wrap gap-4 items-end">
          {inputFields.map(({ id, label, placeholder }) => (
            <div key={id} className="flex flex-col">
              <label htmlFor={id} className="mb-1 font-medium">
                {label}
              </label>
              <input
                id={id}
                required
                type="text"
                placeholder={placeholder}
                className="p-2 border border-gray-300 rounded-lg min-w-[180px]"
              />
            </div>
          ))}

          {dateTimeFields.map(({ label, dateId, timeId }) => (
            <div key={label} className="flex flex-col">
              <label className="mb-1 font-medium">{label}</label>
              <div className="flex gap-1">
                <input
                  id={dateId}
                  type="date"
                  defaultValue="2025-04-24"
                  className="p-2 border border-gray-300 rounded-lg"
                />
                <input
                  id={timeId}
                  type="time"
                  defaultValue="12:30"
                  className="p-2 border border-gray-300 rounded-lg"
                />
              </div>
            </div>
          ))}

          <Link
            href={`/booking/${vehicleSlugMap[selectedVehicle]}`}
            className="bg-gradient-to-r from-[#006ba6] to-[#009acb] text-white font-bold px-6 py-2 rounded-full hover:opacity-90"
          >
            Show {selectedVehicle}
          </Link>
        </div>
      </div>
    </div>
  );
}
