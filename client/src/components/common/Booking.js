"use client";

import BusIcon from "@/ui/BusIcon";
import CarIcon from "@/ui/CarIcon";
import HiaceIcon from "@/ui/HiaceIcon";
import JeepIcon from "@/ui/JeepIcon";
import Link from "next/link";
import { useState } from "react";
import { Calendar } from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
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

  const [showCalendar, setShowCalendar] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState("12:30");

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

  return (
    <div className="p-8">
      <div className="p-7 bg-white rounded-xl  relative shadow-2xl">
        <div className="flex flex-wrap gap-2 mb-4">
          {vehicleTypes.map((type) => (
            <button
              key={type}
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

          {/* Calendar and Time Picker */}
          <div className="flex flex-col relative">
            <label className="mb-1 font-medium">Pick-up date</label>
            <div className="flex gap-1">
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setShowCalendar(!showCalendar)}
                  className="flex items-center gap-2 p-2 border border-gray-300 rounded-lg bg-white"
                >
                  <FaCalendarAlt className="text-gray-600" />
                  <span>{selectedDate.toDateString()}</span>
                </button>

                {showCalendar && (
                  <div className="absolute z-30 mt-2 shadow-lg">
                    <Calendar
                      date={selectedDate}
                      onChange={(date) => {
                        setSelectedDate(date);
                        setShowCalendar(false);
                      }}
                      months={2}
                      direction="horizontal"
                      showMonthAndYearPickers={true}
                      minDate={new Date()}
                    />
                  </div>
                )}
              </div>

              <input
                id="pickup-time"
                type="time"
                value={selectedTime}
                onChange={(e) => setSelectedTime(e.target.value)}
                className="p-2 border border-gray-300 rounded-lg"
              />
            </div>
          </div>

          <div className="flex flex-col relative">
            <label className="mb-1 font-medium">Return date</label>
            <div className="flex gap-1">
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setShowCalendar(!showCalendar)}
                  className="flex items-center gap-2 p-2 border border-gray-300 rounded-lg bg-white"
                >
                  <FaCalendarAlt className="text-gray-600" />
                  <span>{selectedDate.toDateString()}</span>
                </button>

                {showCalendar && (
                  <div className="absolute z-30 mt-2 shadow-lg">
                    <Calendar
                      date={selectedDate}
                      onChange={(date) => {
                        setSelectedDate(date);
                        setShowCalendar(false);
                      }}
                      months={2}
                      direction="horizontal"
                      showMonthAndYearPickers={true}
                      minDate={new Date()}
                    />
                  </div>
                )}
              </div>

              <input
                id="pickup-time"
                type="time"
                value={selectedTime}
                onChange={(e) => setSelectedTime(e.target.value)}
                className="p-2 border border-gray-300 rounded-lg"
              />
            </div>
          </div>

          <Link
            href={`/booking?vehicle=${vehicleSlugMap[selectedVehicle]}&pickUp=${destinations[0].value}&destination=${destinations[1].value}&date=${selectedDate.toISOString()}&time=${selectedTime}`}
            className="bg-gradient-to-r from-[#006ba6] to-[#009acb] text-white font-bold px-6 py-2 rounded-full hover:opacity-90"
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
                    placeholder={"City"}
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

              <button
                className="bg-red-500 w-[100px] h-[40px] rounded-[20px] text-white cursor-pointer hover:bg-red-600"
                onClick={removeAnotherDestination}
              >
                Remove
              </button>
            </div>
          ) : null}

          <div
            className="w-[220px] bg-primary rounded-md p-2 text-white  flex justify-center items-center mt-5 cursor-pointer"
            onClick={handleAnotherDestination}
          >
            Add another destination
          </div>
        </span>
      </div>
    </div>
  );
}
