"use client";

import Link from "next/link";
import React, { useState } from "react";

export default function Booking() {
  const vehicleTypes = ["Cars", "Jeep", "Toyota Hiace", "Bus"];
  const [selectedVehicle, setSelectedVehicle] = useState("Cars");

  const vehicleSlugMap = {
    Cars: "cars",
    Jeep: "jeeps",
    "Toyota Hiace": "hiaces",
    Bus: "buses",
  };

  const inputFields = [
    {
      id: "pickup",
      label: "Pick-up",
      placeholder: "Enter area...",
    },
    {
      id: "destination",
      label: "Destination",
      placeholder: "Enter area...",
    },
  ];

  const kathmanduAreas = [
    "Thamel",
    "Baneshwor",
    "Koteshwor",
    "Kalanki",
    "Maharajgunj",
    "Baluwatar",
    "Lazimpat",
    "New Road",
    "Sundhara",
    "Gongabu",
    "Bouddha",
    "Kirtipur",
    "Patan",
    "Jawalakhel",
    "Chabahil",
  ];

  const [areaValues, setAreaValues] = useState({
    pickup: "",
    destination: "",
  });
  const [focusedField, setFocusedField] = useState(null);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [destinationError, setDestinationError] = useState("");

  const handleInputChange = (id, value) => {
    setAreaValues({ ...areaValues, [id]: value });

    if (
      id === "destination" &&
      value &&
      !kathmanduAreas.some((area) => area.toLowerCase() === value.toLowerCase())
    ) {
      setDestinationError("Please select a valid area from Kathmandu.");
    } else {
      setDestinationError("");
    }
  };

  const handleSelectArea = (id, area) => {
    // Prevent selecting the same destination as the pickup location
    if (id === "destination" && area === areaValues.pickup) {
      setDestinationError("Destination cannot be the same as pickup location.");
      return;
    }

    setAreaValues({ ...areaValues, [id]: area });
    setShowSuggestions(false);
  };

  const dateTimeFields = [
    {
      label: "Pick-up date",
      dateId: "pickup-date",
      timeId: "pickup-time",
    },
  ];

  return (
    <div className="p-8 font-sans">
      <div className="p-10 bg-gray-100 rounded-xl">
        {/* Vehicle buttons */}
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

        <div className="flex flex-wrap gap-4 items-end relative">
          {inputFields.map(({ id, label, placeholder }) => (
            <div key={id} className="flex flex-col relative min-w-[200px]">
              <label htmlFor={id} className="mb-1 font-medium">
                {label}
              </label>
              <input
                id={id}
                required
                type="text"
                placeholder={placeholder}
                value={areaValues[id]}
                onFocus={() => {
                  setFocusedField(id);
                  setShowSuggestions(true);
                }}
                onBlur={() => {
                  setTimeout(() => setShowSuggestions(false), 100);
                }}
                onChange={(e) => handleInputChange(id, e.target.value)}
                className="p-2 border border-gray-300 rounded-lg"
              />
              {showSuggestions && focusedField === id && (
                <ul className="absolute top-full mt-1 z-10 w-full bg-white border border-gray-300 rounded-md shadow-lg max-h-40 overflow-y-auto">
                  {kathmanduAreas
                    .filter((area) =>
                      area.toLowerCase().includes(areaValues[id].toLowerCase())
                    )
                    .map((area, index) => (
                      <li
                        key={index}
                        onClick={() => handleSelectArea(id, area)}
                        className="px-4 py-2 hover:bg-blue-100 cursor-pointer"
                      >
                        {area}
                      </li>
                    ))}
                </ul>
              )}
              {destinationError && id === "destination" && (
                <p className="text-red-500 text-xs top-[70px] absolute">
                  {destinationError}
                </p>
              )}
            </div>
          ))}

          {/* Date and Time Fields */}
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

          {/* Search Link */}
          <Link
            href={`/booking/${vehicleSlugMap[selectedVehicle]}`}
            className="bg-gradient-to-r from-[#006ba6] to-[#009acb] text-white font-bold px-6 py-2 rounded-full hover:opacity-90"
          >
            Search
          </Link>
        </div>
      </div>
    </div>
  );
}
