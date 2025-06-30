"use client";
import { baseURL } from "@/config/config";
import axios from "axios";
import { EyeIcon } from "lucide-react";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";

const page = () => {
  const [bookingDetails, setBookingDetails] = React.useState([]);
  const router = useRouter();

  const getBookings = async () => {
    try {
      const result = await axios({
        method: "GET",
        url: `${baseURL}/booking/get`,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setBookingDetails(result.data.data);
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
    Completed: "bg-green-100 text-green-600",
    completed: "bg-green-100 text-green-600",
    cancelled: "bg-red-100 text-red-600",
  };

  const paymentColor = {
    Pending: "bg-red-100 text-red-600",
    Paid: "bg-blue-100 text-blue-600",
    Completed: "bg-green-100 text-green-600",
    completed: "bg-green-100 text-green-600",
  };

  // Update status and paymentStatus together
  const handleUpdateStatus = async (id, action) => {
    let status, paymentStatus;
    if (action === "completed") {
      status = "completed";
      paymentStatus = "completed";
    } else if (action === "cancelled") {
      status = "cancelled";
      paymentStatus = "cancelled";
    }
    try {
      await axios.put(
        `${baseURL}/booking/update/${id}`,
        {
          status,
          paymentStatus,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      getBookings();
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  return (
    <div className="sm:p-4">
      <main className="mb-10">{/* ...header and search... */}</main>

      <div className="overflow-x-auto w-full">
        <table className="min-w-[800px] w-full bg-white shadow-md rounded-md overflow-hidden">
          <thead className="bg-blue-100 text-left">
            <tr>
              <th className="p-2">Booking ID</th>
              <th className="p-2">Booking Date</th>
              <th className="p-2">Client Name</th>
              <th className="p-2">Vehicle</th>
              <th className="p-2">Date</th>
              <th className="p-2">Payment</th>
              <th className="p-2">Status</th>
              <th className="p-2">Update Status</th>
              <th className="p-2">Action</th>
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
                      className="line-clamp-1 max-w-[100px] overflow-hidden"
                      title={ride.id}
                    >
                      {ride.id}
                    </div>
                  </td>
                  <td className="p-2 border-b border-gray-500">
                    {ride.bookingDate
                      ? new Date(ride.bookingDate).toISOString().split("T")[0]
                      : ""}
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
                  <td className="p-2 border-b border-gray-500 ">
                    <div className="line-clamp-1 max-w-[180px] overflow-hidden">
                      {ride.pickupDate?.split("T")[0]}{" "}
                      <span className="text-gray-500 ">-</span>{" "}
                      {ride.returnDate?.split("T")[0]}
                    </div>
                  </td>
                  <td className="p-2 border-b border-gray-500">
                    <div className="flex items-center gap-2">
                      {ride.payment}
                      <span
                        className={`inline-block px-2 py-1.5 rounded-md font-medium ${
                          paymentColor[ride.paymentStatus]
                        }`}
                      >
                        {ride.paymentStatus}
                      </span>
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
                  <td className="p-2 border-b border-gray-500">
                    <button
                      className="bg-green-500 text-white px-2 py-1 rounded mr-2 hover:bg-green-600 cursor-pointer"
                      onClick={() => handleUpdateStatus(ride.id, "completed")}
                      disabled={ride.status === "completed"}
                    >
                      Confirm
                    </button>
                    <button
                      className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600 cursor-pointer"
                      onClick={() => handleUpdateStatus(ride.id, "cancelled")}
                      disabled={ride.status === "cancelled"}
                    >
                      Cancel
                    </button>
                  </td>
                  <td className="p-2 border-b border-gray-500">
                    <button
                      className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md bg-white border border-gray-300 text-sm text-gray-800 hover:bg-gray-100 hover:text-black transition-all duration-200 shadow-sm"
                      title="View"
                      onClick={() => router.push(`/admin/booking/${ride.id}`)}
                    >
                      <EyeIcon className="w-4 h-4" />
                      <span className="hidden sm:inline">View</span>
                    </button>
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
