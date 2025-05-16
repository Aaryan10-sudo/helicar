"use client";
import { baseURL } from "@/config/config";
import CancelledIcon from "@/ui/CancelledIcon";
import PaidIcon from "@/ui/PaidIcon";
import axios from "axios";
import React, { useEffect } from "react";

const page = () => {
  const [bookingDetails, setBookingDetails] = React.useState([]);

  const getBookings = async () => {
    try {
      const result = await axios({
        method: "GET",
        url: `${baseURL}/booking/get`,
      });
      setBookingDetails(result.data.data);
      console.log(result);
    } catch (error) {
      console.error("Error fetching bookings:", error);
    }
  };

  useEffect(() => {
    getBookings();
  }, []);

  const statusColor = {
    Cancelled: "bg-red-100 text-red-600",
    Ongoing: "bg-blue-100 text-blue-600",
    Returned: "bg-green-100 text-green-600",
  };

  const paymentColor = {
    Pending: "bg-red-100 text-red-600",
    Paid: "bg-blue-100 text-blue-600",
  };

  return (
    <div className="sm:p-4">
      <main className="mb-10">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <h2 className="text-xl md:text-3xl font-semibold">
            Vehicle Bookings <span className="text-blue-700">(Bus)</span>
          </h2>
          <input
            type="text"
            placeholder="Search client name, car etc..."
            className="w-full md:w-[250px] border border-gray-500 bg-gray-300 px-2 py-1 outline-none rounded-sm"
          />
        </div>

        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-3">
            <button className="border cursor-pointer border-gray-700 rounded-sm px-2.5 py-1">
              Car
            </button>
            <button className="border cursor-pointer border-gray-700 rounded-sm px-2.5 py-1">
              Bus
            </button>
            <button className="border cursor-pointer border-gray-700 rounded-sm px-2.5 py-1">
              Tourist bus
            </button>
            <button className="border cursor-pointer border-gray-700 rounded-sm px-2.5 py-1">
              Toyota Hiace
            </button>
          </div>

          <div className="flex flex-wrap items-center gap-4">
            <button className="bg-gray-200 text-black rounded-sm border-none px-3 py-2">
              Sort by
            </button>
            <button className="bg-blue-600 text-white px-3 py-2 rounded-sm">
              Add bookings
            </button>
          </div>
        </div>
      </main>

      <div className="overflow-x-auto w-full">
        <table className="min-w-[800px] w-full bg-white shadow-md rounded-md overflow-hidden">
          <thead className="bg-blue-100 text-left">
            <tr>
              <th className="p-2">Booking ID</th>
              <th className="p-2">Booking Date</th>
              <th className="p-2">Client Name</th>
              <th className="p-2">Vehicle</th>
              <th className="p-2">Plan</th>
              <th className="p-2">Date</th>
              <th className="p-2">Driver</th>
              <th className="p-2">Payment</th>
              <th className="p-2">Status</th>
            </tr>
          </thead>
          <tbody>
            {bookingDetails.length === 0 ? (
              <tr>
                <td
                  colSpan="9"
                  className="text-center p-4 text-gray-400 text-lg"
                >
                  No Bookings found
                </td>
              </tr>
            ) : (
              bookingDetails.map((ride) => (
                <tr key={ride.id} className="text-sm">
                  <td className="p-2 border-b border-gray-500">
                    <div
                      className="line-clamp-1 max-w-[150px] overflow-hidden"
                      title={ride.id}
                    >
                      {ride.id}
                    </div>
                  </td>
                  <td className="p-2 border-b border-gray-500">
                    {ride.bookingDate}
                  </td>
                  <td className="p-2 border-b border-gray-500">
                    {ride.passengerInfo.firstName} {ride.passengerInfo.lastName}
                  </td>
                  <td className="p-2 border-b border-gray-500">
                    <div
                      className="line-clamp-1 max-w-[150px] overflow-hidden"
                      title={ride.vehicleId}
                    >
                      {ride.vehicleName}
                    </div>
                  </td>
                  <td className="p-2 border-b border-gray-500">1d</td>
                  <td className="p-2 border-b border-gray-500">
                    {ride.pickupDate.split("T")[0]}{" "}
                    <span className="text-gray-500">-</span>{" "}
                    {ride.returnDate.split("T")[0]}
                  </td>
                  <td className="p-2 border-b border-gray-500 text-center">
                    <PaidIcon />
                  </td>
                  <td className="p-2 border-b border-gray-500 flex items-center gap-2">
                    {ride.payment}
                    <div
                      className={`inline-block px-2 py-1.5 rounded-md font-medium ${
                        paymentColor[ride.paymentStatus]
                      }`}
                    >
                      {ride.paymentStatus}
                    </div>
                  </td>
                  <td className="p-2 border-b border-gray-500">
                    <div
                      className={`inline-block px-2 py-1 rounded-md font-medium ${
                        statusColor[ride.status]
                      }`}
                    >
                      {ride.status}
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default page;
