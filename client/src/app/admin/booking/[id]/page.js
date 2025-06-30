"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import axios from "axios";
import { baseURL } from "@/config/config";

export default function BookingDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const [booking, setBooking] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBooking = async () => {
      try {
        const res = await axios.get(`${baseURL}/booking/get/${params.id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setBooking(res.data.data);
      } catch (err) {
        setBooking(null);
      } finally {
        setLoading(false);
      }
    };
    if (params.id) fetchBooking();
  }, [params.id]);

  if (loading) return <div className="p-8 text-center">Loading...</div>;
  if (!booking)
    return (
      <div className="p-8 text-center text-red-500">Booking not found.</div>
    );

  const { passengerInfo = {} } = booking;

  return (
    <div className=" mx-auto p-8 bg-white rounded-2xl  mt-8">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-3xl font-bold text-gray-800">Booking Details</h2>
        <button
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          onClick={() => router.back()}
        >
          Back
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-4">
          <Detail label="Booking ID" value={booking.id} />
          <Detail label="Booking Date" value={booking.bookingDate} />
          <Detail label="Pickup Date" value={booking.pickupDate} />
          <Detail label="Return Date" value={booking.returnDate} />
          <Detail label="Total Amount" value={booking.totalAmount} />
          <Detail label="Status" value={booking.status} />
          <Detail label="Payment Status" value={booking.paymentStatus} />
        </div>
        <div className="space-y-4">
          <Detail label="Pick Up" value={booking.pickUp} />
          <Detail label="Destination" value={booking.destination} />
          {booking.anotherDestination && (
            <Detail
              label="Another Destination"
              value={booking.anotherDestination}
            />
          )}
          <Detail label="Vehicle ID" value={booking.vehicleId} />
          <Detail label="Vehicle Name" value={booking.vehicleName} />
        </div>
      </div>
      <div className="mt-10">
        <h3 className="text-xl font-semibold mb-4 text-gray-700">
          Passenger Information
        </h3>
        <div className="flex flex-col md:flex-row gap-8">
          <div className="flex-1 space-y-2">
            <Detail label="First Name" value={passengerInfo.firstName} />
            <Detail label="Last Name" value={passengerInfo.lastName} />
            <Detail label="Email" value={passengerInfo.email} />
            <Detail label="Phone" value={passengerInfo.phone} />
          </div>
        </div>
      </div>
    </div>
  );
}

// Reusable detail row
function Detail({ label, value }) {
  return (
    <div className="flex items-center">
      <span className="w-40 font-medium text-gray-600">{label}:</span>
      <span className="text-gray-900">
        {value || <span className="text-gray-400">N/A</span>}
      </span>
    </div>
  );
}
