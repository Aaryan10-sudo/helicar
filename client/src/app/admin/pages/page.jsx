"use client";
import Blogs from "@/components/cms/Blogs";
import Company from "@/components/cms/Company";
import TarrifRates from "@/components/cms/TarrifRates";
import Trekking from "@/components/cms/Trekking";
import VehicleRental from "@/components/cms/VehicleRental";
import { useState } from "react";

const Page = () => {
  const lists = [
    "Home",
    "Vehicle Rental",
    "Company",
    "Tarrif Rates",
    "Trekking",
    "Blogs"
  ];

  const [activeTab, setActiveTab] = useState("Home");

  const renderForm = () => {
    switch (activeTab) {
      case "Home":
        return (
          <div className="relative space-y-5 mb-15">
            <div className="btn-section overflow-hidden">
              <button className="mr-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
                Update
              </button>
            </div>
            <div className="mb-6">
              <label className="block font-semibold mb-2">Hero Images</label>
            </div>
          </div>
        );
      case "Vehicle Rental":
        return (
          <VehicleRental />
        );
      case "Company":
        return (
          <Company />
        );
      case "Tarrif Rates":
        return (
          <TarrifRates />
        );
      case "Trekking":
        return (
          <Trekking />
        );
      case "Blogs":
        return (
          <Blogs />
        );
      default:
        return null;
    }
  }


  return (
    <section className="p-5 ">
      <h1 className="font-bold text-[40px] ">Page Customization</h1>
      <div className="bg-white shadow p-6 rounded-lg">
        <div className="flex justify-between items-center mb-4">
          <div className="flex gap-4 flex-wrap">
            {lists.map((tab) => (
              <button key={tab}
                onClick={() =>
                  setActiveTab(tab)
                }
                className={`px-4 py-2 cursor-pointer rounded shadow ${activeTab === tab ? "bg-blue-600 text-white" : "bg-white hover:bg-blue-100"
                  }`}
              >
                {tab}
              </button>
            )
            )}
          </div>
        </div>
        <h2 className="text-2xl font-bold mb-4">{activeTab}</h2>
        {renderForm()}
      </div>
    </section>
  );
};

export default Page;
