"use client";

import BusIcon from "@/ui/BusIcon";
import CarIcon from "@/ui/CarIcon";
import HiaceIcon from "@/ui/HiaceIcon";
import JeepIcon from "@/ui/JeepIcon";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css"; // Import default styles
import { FaCalendarAlt } from "react-icons/fa";

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

  const [destinations, setDestinations] = useState([
    { id: "pickup", label: "Pick-up", value: "" },
    { id: "destination", label: "Destination", value: "" },
  ]);

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

  const [focusedField, setFocusedField] = useState(null);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [destinationError, setDestinationError] = useState("");
  const [showAnotherDestination, setShowAnotherDestination] = useState(false);

  const handleAnotherDestination = () => {
    setShowAnotherDestination(true);
  };
  const removeAnotherDestination = () => {
    setShowAnotherDestination(false);
  };

  const [showPickupCalendar, setShowPickupCalendar] = useState(false);
  const [showReturnCalendar, setShowReturnCalendar] = useState(false);
  const [range, setRange] = useState({ from: undefined, to: undefined });
  const [pickupTime, setPickupTime] = useState("12:30");
  const [returnTime, setReturnTime] = useState("12:30");

  const handleInputChange = (id, value) => {
    setDestinations((prev) =>
      prev.map((dest) => (dest.id === id ? { ...dest, value: value } : dest))
    );

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
    if (id === "destination" && area === destinations[0].value) {
      setDestinationError("Destination cannot be the same as pickup location.");
      return;
    }

    setDestinations((prev) =>
      prev.map((dest) => (dest.id === id ? { ...dest, value: area } : dest))
    );
    setShowSuggestions(false);
  };

  const pickupCalendarRef = useRef(null);

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
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="p-8">
      <div className="p-7 bg-white rounded-xl relative shadow-2xl">
        <div className="flex flex-wrap gap-2 mb-4">
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

        <div className="flex flex-wrap gap-4 items-end relative">
          {destinations.map(({ id, label, value }) => (
            <div key={id} className="flex flex-col relative min-w-[200px]">
              <label htmlFor={id} className="mb-1 font-medium">
                {label}
              </label>
              <input
                id={id}
                required
                type="text"
                placeholder="Enter area..."
                value={value}
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
                      area.toLowerCase().includes(value.toLowerCase())
                    )
                    .map((area) => (
                      <li
                        key={area}
                        onClick={() => handleSelectArea(id, area)}
                        className="px-4 py-2 hover:bg-blue-100 cursor-pointer"
                      >
                        {area}
                      </li>
                    ))}
                </ul>
              )}
              {destinationError && id === "destination" && (
                <p className="text-red-500 text-xs mt-1">{destinationError}</p>
              )}
            </div>
          ))}

          {/* Pick-up Calendar and Time Picker */}
          <div className="flex flex-col relative">
            <label className="mb-1 font-medium">Pick-up date</label>
            <div className="flex gap-1">
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setShowPickupCalendar(!showPickupCalendar)}
                  className="flex items-center gap-2 p-2 border border-gray-300 rounded-lg bg-white"
                  aria-label="Select pick-up date"
                >
                  <FaCalendarAlt className="text-gray-600" />
                  <span>
                    {range.from ? range.from.toDateString() : "Select date"}
                  </span>
                </button>
                {showPickupCalendar && (
                  <div
                    ref={pickupCalendarRef}
                    className="absolute top-full left-0 mt-5 z-30 rounded-md shadow-lg"
                  >
                    <DayPicker
                      mode="range"
                      numberOfMonths={2}
                      selected={range}
                      onSelect={(range) => setRange({ ...range })}
                      fromDate={new Date()}
                      disabled={{ before: new Date() }}
                      className="bg-white rounded-lg shadow-lg p-2"
                      classNames={{
                        months: "flex flex-row gap-4",
                        caption_label: "text-lg font-large",
                        today:
                          "border-amber-500 rounded-full bg-primary text-white",
                        selected: "rounded-full",
                        chevron: "text-black",
                      }}
                    />
                  </div>
                )}
              </div>
              <input
                id="pickup-time"
                type="time"
                value={pickupTime}
                onChange={(e) => setPickupTime(e.target.value)}
                className="p-2 border border-gray-300 rounded-lg"
              />
            </div>
          </div>

          {/* Return Calendar and Time Picker */}
          <div className="flex flex-col relative">
            <label className="mb-1 font-medium">Return date</label>
            <div className="flex gap-1">
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setShowReturnCalendar(!showReturnCalendar)}
                  className="flex items-center gap-2 p-2 border border-gray-300 rounded-lg bg-white"
                  aria-label="Select return date"
                >
                  <FaCalendarAlt className="text-gray-600" />
                  <span>
                    {range.to ? range.to.toDateString() : "Select date"}
                  </span>
                </button>
              </div>
              <input
                id="return-time"
                type="time"
                value={returnTime}
                onChange={(e) => setReturnTime(e.target.value)}
                className="p-2 border border-gray-300 rounded-lg"
              />
            </div>
          </div>

          <Link
            href={`/booking?vehicle=${vehicleSlugMap[selectedVehicle]}&pickUp=${
              destinations[0].value
            }&destination=${destinations[1].value}&date=${
              range.from ? range.from.toISOString() : ""
            }&returnDate=${range.to ? range.to.toISOString() : ""}&pickupTime=${pickupTime}&returnTime=${returnTime}`}
            className={`bg-gradient-to-r from-[#006ba6] to-[#009acb] text-white font-bold px-6 py-2 rounded-full hover:opacity-90 ${
              !range.from ||
              !range.to ||
              !destinations[0].value ||
              !destinations[1].value ||
              destinationError
                ? "opacity-50 pointer-events-none"
                : ""
            }`}
          >
            Search
          </Link>
        </div>

        <span>
          {showAnotherDestination ? (
            <div className="flex flex-wrap gap-4 mt-2">
              {destinations.map(({ id, label, value }) => (
                <div key={id} className="flex flex-col relative min-w-[200px]">
                  <input
                    id={id}
                    required
                    type="text"
                    placeholder="Enter area..."
                    value={value}
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
                          area.toLowerCase().includes(value.toLowerCase())
                        )
                        .map((area) => (
                          <li
                            key={area}
                            onClick={() => handleSelectArea(id, area)}
                            className="px-4 py-2 hover:bg-blue-100 cursor-pointer"
                          >
                            {area}
                          </li>
                        ))}
                    </ul>
                  )}
                  {destinationError && id === "destination" && (
                    <p className="text-red-500 text-xs mt-1">
                      {destinationError}
                    </p>
                  )}
                </div>
              ))}
              <button
                className="bg-red-500 w-[100px] h-[40px] rounded-[20px] text-white cursor-pointer hover:bg-red-600"
                onClick={removeAnotherDestination}
              >
                Remove
              </button>
            </div>
          ) : null}

          <div
            className="w-[220px] bg-primary rounded-md p-2 text-white flex justify-center items-center mt-5 cursor-pointer"
            onClick={handleAnotherDestination}
          >
            Add another destination
          </div>
        </span>
      </div>
    </div>
  );
}
