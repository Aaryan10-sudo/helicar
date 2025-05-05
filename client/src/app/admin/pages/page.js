"use client";
import React, { useState } from "react";
import vehicleImage from "../../../assets/herosection.jpg";

const Page = () => {
  const lists = [
    "Home",
    "Vehicle Rental",
    "Company",
    "Tarrif rates",
    "Trekking",
  ];

  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section className="p-5 ">
      <h1 className="font-bold text-[40px] ">Page Customization</h1>
      <ul className="flex gap-10 py-[30px]">
        {lists.map((value, index) => (
          <li
            key={index}
            onClick={() => setActiveIndex(index)}
            className={`px-[15px] h-[40px] flex justify-center items-center text-black font-semibold rounded-md cursor-pointer transition-all duration-200 ${
              activeIndex === index
                ? "bg-[#087DC2] text-white"
                : "bg-white text-black shadow-md"
            }`}
          >
            {value}
          </li>
        ))}
      </ul>
      <div className="shadow-xl rounded-xl overflow-hidden bg-slate-100">
        <h1 className="font-bold text-xl p-2">Hero Section</h1>
        <div
          className="h-[500px] w-full bg-cover bg-center bg-no-repeat cursor-pointer"
          style={{
            backgroundImage: `url(${vehicleImage?.src || "/default-hero.jpg"}) `,
          }}
        ></div>
      </div>
    </section>
  );
};

export default Page;
