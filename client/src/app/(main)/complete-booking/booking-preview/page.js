// pages/booking-confirmation.jsx
"use client";
import { baseURL } from "@/config/config";
import axios from "axios";
import { set } from "date-fns";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function BookingConfirmation() {
  const searchParams = useSearchParams();
  const bookingId = searchParams.get("bookingId");
  const [vehicleId, setVehicleId] = useState("");
  const [bookingDetails, setBookingDetails] = useState({});
  const [vehicleDetails, setVehicleDetails] = useState({});

  useEffect(() => {
    async function fetchBookingDetails() {
      try {
        const result = await axios({
          url: `${baseURL}/booking/get/${bookingId}`,
          method: "GET",
        });
        setBookingDetails(result.data.data);
        setVehicleId(result.data.data.vehicleId);
      } catch (error) {
        console.log(error.message);
      }
    }
    if (bookingId) {
      fetchBookingDetails();
    }
  }, [bookingId]);

  useEffect(() => {
    async function fetchVehicleDetails() {
      if (!vehicleId) return;
      try {
        const vehicleResult = await axios({
          url: `${baseURL}/vehicle/get/${vehicleId}`,
          method: "GET",
        });
        setVehicleDetails(vehicleResult.data.data);
        console.log(vehicleResult.data.data);
      } catch (error) {
        console.log(error.message);
      }
    }
    fetchVehicleDetails();
  }, [vehicleId]);
  return (
    <div className="min-h-screen bg-gray-100 flex justify-center p-6 flex-col items-center">
      <p className="text-center  text-gray-400 mt-4 text-lg mb-4">
        Your booking request Successful !!!
      </p>
      <div className="max-w-xl w-full bg-[#f3fbff] rounded-xl shadow-lg pb-6 flex flex-col items-center">
        <div className="w-[80%] flex justify-center mt-4">
          <img
            src="https://helicar.nnine.training/_next/image?url=%2Fblog.jpg&w=1920&q=75"
            alt="Car image"
            className="rounded-md shadow-md hover:scale-105 transition-transform duration-300 "
          />
        </div>

        <div className="px-6 mt-4 w-full">
          <p className="text-xl font-semibold mt-2">
            {bookingDetails.vehicleName}
          </p>
          <p className="text-gray-500">asdfnnsdfij</p>

          <div className="flex items-center mt-2 text-sm">
            <span className="mr-2">🧍‍♂️</span>
            <span>{vehicleDetails.features?.seats} seats</span>
          </div>

          <div className="flex items-center mt-1 text-sm">
            <span className="mr-2">🚗</span>
            <span>License: {vehicleDetails.numberPlate}</span>
          </div>

          <hr className="my-4" />

          <div className="mt-2">
            <p className="font-semibold">📍 Pickup</p>
            <p>{bookingDetails.pickUp}</p>
            <p>{bookingDetails.pickupDate}</p>
          </div>

          <div className="mt-4">
            <p className="font-semibold">📍 Destination</p>
            <p>{bookingDetails.destination}</p>
            <p>{bookingDetails.returnDate}</p>
          </div>

          <div className="mt-4">
            <p className="font-semibold">Your booking overview:</p>
            <ul className="list-none mt-2 space-y-1 text-sm">
              <li>
                <span className="text-green-600 font-bold">✓</span> 24/7
                Roadside Assistance Hotline
              </li>
              <li>
                <span className="text-green-600 font-bold">✓</span> GPS
              </li>
              <li>
                <span className="text-green-600 font-bold">✓</span> Limited
                Miles
              </li>
              <li>
                <span className="text-green-600 font-bold">✓</span> Booking
                option: Best price - pay now, cancel and rebook for a
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
