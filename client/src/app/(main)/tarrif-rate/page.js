// components/TariffRates.js
"use client"; // <--- ADD THIS LINE AT THE VERY TOP

import React from "react";

const TariffRates = () => {
  const tariffData = [
    {
      sn: 1,
      description: "Airport Pick up or Drop Service",
      time: "2 hrs",
      price: "1200",
    },
    {
      sn: 2,
      description: "Airport Pick up or Drop Service",
      time: "2 hrs",
      price: "1200",
    },
    {
      sn: 3,
      description: "Airport Pick up or Drop Service",
      time: "2 hrs",
      price: "1200",
    },
    {
      sn: 4,
      description: "Airport Pick up or Drop Service",
      time: "2 hrs",
      price: "1200",
    },
    {
      sn: 5,
      description: "Airport Pick up or Drop Service",
      time: "2 hrs",
      price: "1200",
    },
    {
      sn: 6,
      description: "Airport Pick up or Drop Service",
      time: "2 hrs",
      price: "1200",
    },
    {
      sn: 7,
      description: "Airport Pick up or Drop Service",
      time: "2 hrs",
      price: "1200",
    },
  ];

  const handleBookNow = (sn) => {
    // You can make this function more complex, e.g., open a modal, navigate, etc.
    alert(`Booking for S.N ${sn}`);
  };

  return (
    <div className="flex justify-center items-start p-5 bg-slate-100 min-h-screen">
      <section className="w-full max-w-6xl">
        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold text-blue-600 mb-3 font-Comfortaa">
            Tariff Rates
          </h1>
          <p className="text-sm text-gray-500 leading-relaxed max-w-2xl mx-auto mb-6">
            Lorem ipsum dolor sit amet consectetur. Malesuada a purus eu
            dignissim morbi egestas interdum viverra. Ac sed in egestas mattis
            eros. Lorem ipsum dolor sit amet consectetur. Malesuada a purus eu
            dignissim morbi egestas interdum viverra. Ac sed in egestas mattis
            eros.
          </p>
        </header>

        <div className="flex justify-end gap-3 mb-6">
          <button className="bg-white border border-gray-300 text-gray-800 py-2 px-5 rounded-md text-sm font-medium hover:bg-gray-50 hover:border-gray-400 transition-colors">
            vehicles
          </button>
          <button className="bg-white border border-gray-300 text-gray-800 py-2 px-5 rounded-md text-sm font-medium hover:bg-gray-50 hover:border-gray-400 transition-colors">
            Heli charter
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
                      tabIndex={0} // Corrected from tabIndex="0"
                      onClick={() => handleBookNow(item.sn)} // Call a defined handler
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
