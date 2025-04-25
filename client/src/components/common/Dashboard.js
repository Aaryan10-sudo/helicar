import Booking from "@/ui/Booking";
import BookingIcon from "@/ui/BookingIcon";
import EarningIcon from "@/ui/EarningIcon";
import PassengerIcon from "@/ui/PassengerIcon";
import React from "react";
import EarningSummaryChart from "./EarningSummaryChart";
import GroupedBarChart from "./GroupedBarChart";
import Dashboard2 from "./Dashboard2";

const Dashboard = () => {
  return (
    <main className="m-[30px] px-[30px] py-[10px] rounded-xl flex justify-between w-full">
      <div className="w-[60%]">
        <h1 className="text-[30px] font-bold">Dashboard</h1>
        <span className="my-[10px] flex justify-between w-[100%]">
          <div className="bg-blue-700  w-[30%] rounded-lg p-[10px]">
            <div className="bg-white h-[50px] w-[80px] rounded-md flex justify-center items-center">
              <EarningIcon />
            </div>
            <h1 className="py-[20px] text-xl text-white font-extrabold">
              Rs. 95,000
            </h1>
            <h2 className="text-white font-medium">Earning</h2>
          </div>
          <div className="bg-red-600 w-[30%] rounded-lg p-[10px]">
            <div className="bg-white h-[50px] w-[80px] rounded-md flex justify-center items-center">
              <PassengerIcon />
            </div>
            <h1 className="py-[20px] text-xl text-white font-extrabold">
              1000
            </h1>
            <h2 className="text-white font-medium">Passengers</h2>
          </div>
          <div className="bg-yellow-500 w-[30%] rounded-lg p-[10px]">
            <div className="bg-white h-[50px] w-[80px] rounded-md flex justify-center items-center">
              <Booking />
            </div>
            <h1 className="py-[20px] text-xl text-white font-extrabold">500</h1>
            <h2 className="text-white font-medium">Bookings</h2>
          </div>
        </span>
        <br />
        <EarningSummaryChart />
        <br />
        <GroupedBarChart />
      </div>
      <Dashboard2 />
    </main>
  );
};

export default Dashboard;
