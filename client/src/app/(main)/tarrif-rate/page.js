// components/TariffRates.js
"use client"; // This is required for using Hooks like useState and useEffect

import React, { useState, useEffect } from "react";
import { baseURL } from "@/config/config"; // Make sure this path is correct
import axios from "axios";

// NOTE: I've added some sample data for the table to render.
// You should replace this with your actual data, probably from another API call.
const tariffData = [
  {
    sn: 1,
    description: "Airport Drop/Pickup",
    time: "1-2 Hrs",
    price: "1,500",
  },
  {
    sn: 2,
    description: "Half-Day Sightseeing (4 Hrs)",
    time: "4 Hrs",
    price: "4,000",
  },
  {
    sn: 3,
    description: "Full-Day Sightseeing (8 Hrs)",
    time: "8 Hrs",
    price: "7,000",
  },
  {
    sn: 4,
    description: "Nagarkot Trip (Sunrise/Sunset)",
    time: "5-6 Hrs",
    price: "5,500",
  },
];

const TariffRates = () => {
  const [pageContent, setPageContent] = useState({
    heading: "Loading...", // Initial loading text for heading
    subTitle: "Please wait while we fetch the latest information...", // Initial loading text for description
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${baseURL}/cms/tariff-rates`);
        console.log(response);
        if (response.data.data.content) {
          setPageContent({
            heading: response.data.data.content.heading || "Tariff Rates",
            subTitle:
              response.data.data.content.subTitle ||
              "Find the best rates for your travel needs.",
          });
        }
      } catch (error) {
        console.error("Error fetching tariff rates content:", error);
        setPageContent({
          heading: "Tariff Rates",
          subTitle:
            "We couldn't load the description, but you can find our rates below.",
        });
      }
    };

    fetchData();
  }, []); // The empty array [] means this effect runs only once after the component mounts

  const handleBookNow = (sn) => {
    alert(`Booking for S.N ${sn}`);
  };

  return (
    <div className="flex justify-center items-start p-5 bg-slate-100 min-h-screen">
      <section className="w-full max-w-6xl">
        <header className="text-center mb-8">
          {/* 3. Using state to display dynamic heading and subtitle */}
          <h1 className="text-4xl font-bold text-blue-600 mb-3 font-Comfortaa">
            {pageContent.heading}
          </h1>
          <p className="text-sm text-gray-500 leading-relaxed max-w-2xl mx-auto mb-6">
            {pageContent.subTitle}
          </p>
        </header>

        <div className="flex justify-end gap-3 mb-6">
          <button className="bg-white border border-gray-300 text-gray-800 py-2 px-5 rounded-md text-sm font-medium hover:bg-gray-50 hover:border-gray-400 transition-colors">
            Vehicles
          </button>
          <button className="bg-white border border-gray-300 text-gray-800 py-2 px-5 rounded-md text-sm font-medium hover:bg-gray-50 hover:border-gray-400 transition-colors">
            Heli Charter
          </button>
        </div>

        <div className="bg-white rounded-lg shadow-md p-5 overflow-x-auto">
          <table className="w-full border-collapse text-sm">
            <thead className="font-Comfortaa">
              <tr>
                <th className="py-3 px-2 text-gray-700 font-bold whitespace-nowrap border-b border-gray-200 w-[5%] text-center">
                  S.N
                </th>
                <th className="py-3 px-2 text-left text-gray-700 font-bold whitespace-nowrap border-b border-gray-200 w-[25%]">
                  Description
                </th>
                <th className="py-3 px-2 text-left text-gray-700 font-bold whitespace-nowrap border-b border-gray-200 w-[8%]">
                  Time
                </th>
                <th className="py-3 px-2 text-gray-700 font-bold whitespace-nowrap border-b border-gray-200 w-[10%] text-center">
                  Car
                </th>
                <th className="py-3 px-2 text-gray-700 font-bold whitespace-nowrap border-b border-gray-200 w-[10%] text-center">
                  Van
                </th>
                <th className="py-3 px-2  text-gray-700 font-bold whitespace-nowrap border-b border-gray-200 w-[10%] text-center">
                  Hiace Jeep
                </th>
                <th className="py-3 px-2  text-gray-700 font-bold whitespace-nowrap border-b border-gray-200 w-[10%] text-center">
                  Minibus Coaster
                </th>
                <th className="py-3 px-2  text-gray-700 font-bold whitespace-nowrap border-b border-gray-200 w-[10%] text-center">
                  Sutlej Bus
                </th>
                <th className="py-3 px-2  text-gray-700 font-bold whitespace-nowrap border-b border-gray-200 w-[12%] text-center">
                  Book Now
                </th>
              </tr>
            </thead>
            <tbody>
              {tariffData.map((item, index) => (
                <tr key={item.sn}>
                  <td
                    className={`py-3 px-2 text-gray-600 text-center ${index === tariffData.length - 1 ? "border-b-0" : "border-b border-gray-200"}`}
                  >
                    {item.sn}
                  </td>
                  <td
                    className={`py-3 px-2 text-gray-600 ${index === tariffData.length - 1 ? "border-b-0" : "border-b border-gray-200"}`}
                  >
                    {item.description}
                  </td>
                  <td
                    className={`py-3 px-2 text-gray-600 ${index === tariffData.length - 1 ? "border-b-0" : "border-b border-gray-200"}`}
                  >
                    {item.time}
                  </td>
                  <td
                    className={`py-3 px-2 text-gray-600 text-center ${index === tariffData.length - 1 ? "border-b-0" : "border-b border-gray-200"}`}
                  >
                    {item.price}
                  </td>
                  <td
                    className={`py-3 px-2 text-gray-600 text-center ${index === tariffData.length - 1 ? "border-b-0" : "border-b border-gray-200"}`}
                  >
                    {item.price}
                  </td>
                  <td
                    className={`py-3 px-2 text-gray-600 text-center ${index === tariffData.length - 1 ? "border-b-0" : "border-b border-gray-200"}`}
                  >
                    {item.price}
                  </td>
                  <td
                    className={`py-3 px-2 text-gray-600 text-center ${index === tariffData.length - 1 ? "border-b-0" : "border-b border-gray-200"}`}
                  >
                    {item.price}
                  </td>
                  <td
                    className={`py-3 px-2 text-gray-600 text-center ${index === tariffData.length - 1 ? "border-b-0" : "border-b border-gray-200"}`}
                  >
                    {item.price}
                  </td>
                  <td
                    className={`py-3 px-2 text-center ${index === tariffData.length - 1 ? "border-b-0" : "border-b border-gray-200"}`}
                  >
                    <div
                      className="inline-flex flex-col items-center justify-center bg-blue-100 text-blue-800 rounded w-10 h-10 text-[7px] font-bold leading-tight cursor-pointer select-none p-0.5"
                      role="button"
                      tabIndex={0}
                      onClick={() => handleBookNow(item.sn)}
                    >
                      <span className="block">BOOK</span>
                      <span className="block">NOW</span>
                      <div className="mt-[2px] w-3 h-2 bg-blue-800 relative">
                        <div
                          className="absolute bottom-full left-1/2 -translate-x-1/2 w-0 h-0
                                      border-l-[6px] border-l-transparent
                                      border-r-[6px] border-r-transparent
                                      border-b-[4px] border-b-blue-800"
                        ></div>
                      </div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};

export default TariffRates;