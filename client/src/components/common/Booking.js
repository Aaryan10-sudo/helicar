"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import { FaCalendarAlt } from "react-icons/fa";

import BusIcon from "@/ui/BusIcon";
import CarIcon from "@/ui/CarIcon";
import HiaceIcon from "@/ui/HiaceIcon";
import JeepIcon from "@/ui/JeepIcon";
import TimePicker from "./Time";
import LocationAutocomplete from "./LocationAutocomplete"; // Assuming this component is correct

export default function Booking() {
  const vehicleTypes = [
    { name: "Cars", icon: <CarIcon /> },
    { name: "Jeep", icon: <JeepIcon /> },
    { name: "Toyota Hiace", icon: <HiaceIcon /> },
    { name: "Bus", icon: <BusIcon /> },
  ];
  const [selectedVehicle, setSelectedVehicle] = useState("Cars");

  const vehicleSlugMap = {
    Cars: "cars",
    Jeep: "jeeps",
    "Toyota Hiace": "hiace",
    Bus: "bus",
  };

  // Simplified destinations state
  const [pickupLocation, setPickupLocation] = useState("");
  const [destinationLocation, setDestinationLocation] = useState("");

  const [destinationError, setDestinationError] = useState("");
  const [showAnotherDestination, setShowAnotherDestination] = useState(false);

  const [showPickupCalendar, setShowPickupCalendar] = useState(false);
  const [range, setRange] = useState({ from: undefined, to: undefined });
  const [pickupTime, setPickupTime] = useState("12:30 AM");
  const [returnTime, setReturnTime] = useState("12:30 AM");

  const [isClient, setIsClient] = useState(false);

  const pickupCalendarRef = useRef(null);

  // This useEffect ensures window-dependent code runs only on the client
  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleSelectArea = (id, area) => {
    if (id === "pickup") {
      setPickupLocation(area);
    } else {
      setDestinationLocation(area);
    }
    // Simple validation example
    if (id === "destination" && area && area === pickupLocation) {
      setDestinationError("Destination cannot be the same as pickup.");
    } else {
      setDestinationError("");
    }
  };

  const handleAnotherDestination = () => setShowAnotherDestination(true);
  const removeAnotherDestination = () => setShowAnotherDestination(false);

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        pickupCalendarRef.current &&
        !pickupCalendarRef.current.contains(event.target)
      ) {
        setShowPickupCalendar(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const isSearchDisabled =
    !range.from ||
    !range.to ||
    !pickupLocation ||
    !destinationLocation ||
    destinationError;

  return (
    <div className="sm:p-4 md:p-8">
      <div className="p-6 bg-white rounded-xl relative shadow-2xl max-w-7xl mx-auto">
        {/* Vehicle selection */}
        <div className="flex flex-wrap gap-2 mb-6">
          {vehicleTypes.map((type) => (
            <button
              key={type.name}
              onClick={() => setSelectedVehicle(type.name)}
              className={`px-4 py-2 rounded-full font-medium transition flex gap-2 items-center ${
                selectedVehicle === type.name
                  ? "bg-primary text-white"
                  : "bg-gray-200 hover:bg-gray-300"
              }`}
            >
              {type.icon} {type.name}
            </button>
          ))}
        </div>

        {/* Main form grid - This is the core fix */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 items-end">
          {/* Pick-up Location */}
          <div className="lg:col-span-1">
            <LocationAutocomplete
              id="pickup"
              label="Pick-up"
              value={pickupLocation}
              onSelect={handleSelectArea}
            />
          </div>

          {/* Destination Location */}
          <div className="lg:col-span-1">
            <LocationAutocomplete
              id="destination"
              label="Destination"
              value={destinationLocation}
              onSelect={handleSelectArea}
              error={destinationError}
            />
          </div>

          {/* Pick-up Date & Time */}
          <div className="flex flex-col relative">
            <label className="mb-1 font-medium">Pick-up date</label>
            <div className="flex gap-1">
              <div className="relative flex-grow">
                <button
                  type="button"
                  onClick={() => setShowPickupCalendar(!showPickupCalendar)}
                  className="flex items-center gap-2 p-2 border border-gray-300 rounded-lg bg-white w-full h-full"
                  aria-label="Select pick-up date"
                >
                  <FaCalendarAlt className="text-gray-600 flex-shrink-0" />
                  <span className="truncate">
                    {range.from ? range.from.toDateString() : "Select date"}
                  </span>
                </button>
                {showPickupCalendar && (
                  <div
                    ref={pickupCalendarRef}
                    className="absolute top-full left-0 mt-2 z-30 rounded-md shadow-lg"
                  >
                    <DayPicker
                      mode="range"
                      numberOfMonths={
                        isClient && window.innerWidth < 768 ? 1 : 2
                      }
                      selected={range}
                      onSelect={setRange}
                      fromDate={new Date()}
                      disabled={{ before: new Date() }}
                      className="bg-white rounded-lg shadow-lg p-2"
                    />
                  </div>
                )}
              </div>
              <TimePicker
                type="pickup"
                selectedTime={pickupTime}
                onSelect={setPickupTime}
              />
            </div>
          </div>

          {/* Return Date & Time */}
          <div className="flex flex-col relative">
            <label className="mb-1 font-medium">Return date</label>
            <div className="flex gap-1">
              <div className="relative flex-grow">
                <button
                  type="button"
                  onClick={() => setShowPickupCalendar(!showPickupCalendar)}
                  className="flex items-center gap-2 p-2 border border-gray-300 rounded-lg bg-white w-full h-full"
                  aria-label="Select return date"
                >
                  <FaCalendarAlt className="text-gray-600 flex-shrink-0" />
                  <span className="truncate">
                    {range.to ? range.to.toDateString() : "Select date"}
                  </span>
                </button>
              </div>
              <TimePicker
                type="return"
                selectedTime={returnTime}
                onSelect={setReturnTime}
              />
            </div>
          </div>

          {/* Search Button */}
          <Link
            href={`/booking?vehicle=${vehicleSlugMap[selectedVehicle]}&pickUp=${pickupLocation}&destination=${destinationLocation}&date=${
              range.from ? range.from.toISOString() : ""
            }&returnDate=${
              range.to ? range.to.toISOString() : ""
            }&pickupTime=${pickupTime}&returnTime=${returnTime}`}
            className={`bg-gradient-to-r from-[#006ba6] to-[#009acb] text-white font-bold h-10 px-6 rounded-lg hover:opacity-90 flex items-center justify-center w-full lg:w-auto ${
              isSearchDisabled ? "opacity-50 pointer-events-none" : ""
            }`}
          >
            Search
          </Link>
        </div>

        {/* "Add another destination" button moved here, outside the main grid */}
        <div className="mt-4">
          <button
            className="bg-primary w-full sm:w-auto text-white font-semibold py-2 px-4 rounded-lg hover:opacity-90"
            onClick={handleAnotherDestination}
          >
            Add another destination
          </button>
        </div>
      </div>
    </div>
  );
}
