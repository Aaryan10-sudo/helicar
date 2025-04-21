import CancelledIcon from "@/ui/CancelledIcon";
import PaidIcon from "@/ui/PaidIcon";
import React from "react";

const page = () => {
  const bookings = [
    {
      id: 1,
      bookingId: "BL-WZ1001",
      bookingDate: "April 1, 2025",
      clientName: "Haray Ram Ram",
      busNumber: "BA2 Kha622",
      plan: "2 Days",
      dateFrom: "April 1, 2025",
      dateTo: "April 3, 2025",
      driverStatus: <CancelledIcon />,
      payment: "$50",
      paymentStatus: "Pending",
      status: "Cancelled",
    },
    {
      id: 2,
      bookingId: "BL-WZ1001",
      bookingDate: "April 1, 2025",
      clientName: "Haray Ram Ram",
      busNumber: "BA2 Kha622",
      plan: "2 Days",
      dateFrom: "April 1, 2025",
      dateTo: "April 3, 2025",
      driverStatus: <PaidIcon />,
      payment: "$50",
      paymentStatus: "Paid",
      status: "Ongoing",
    },
    {
      id: 3,
      bookingId: "BL-WZ1001",
      bookingDate: "April 1, 2025",
      clientName: "Haray Ram Ram",
      busNumber: "BA2 Kha622",
      plan: "2 Days",
      dateFrom: "April 1, 2025",
      dateTo: "April 3, 2025",
      driverStatus: <PaidIcon />,
      payment: "$50",
      paymentStatus: "Paid",
      status: "Returned",
    },
    {
      id: 4,
      bookingId: "BL-WZ1001",
      bookingDate: "April 1, 2025",
      clientName: "Haray Ram Ram",
      busNumber: "BA2 Kha622",
      plan: "2 Days",
      dateFrom: "April 1, 2025",
      dateTo: "April 3, 2025",
      driverStatus: <PaidIcon />,
      payment: "$50",
      paymentStatus: "Paid",
      status: "Returned",
    },
    {
      id: 5,
      bookingId: "BL-WZ1001",
      bookingDate: "April 1, 2025",
      clientName: "Haray Ram Ram",
      busNumber: "BA2 Kha622",
      plan: "2 Days",
      dateFrom: "April 1, 2025",
      dateTo: "April 3, 2025",
      driverStatus: <PaidIcon />,
      payment: "$50",
      paymentStatus: "Paid",
      status: "Returned",
    },
    {
      id: 6,
      bookingId: "BL-WZ1001",
      bookingDate: "April 1, 2025",
      clientName: "Haray Ram Ram",
      busNumber: "BA2 Kha622",
      plan: "2 Days",
      dateFrom: "April 1, 2025",
      dateTo: "April 3, 2025",
      driverStatus: <PaidIcon />,
      payment: "$50",
      paymentStatus: "Paid",
      status: "Returned",
    },
    {
      id: 7,
      bookingId: "BL-WZ1001",
      bookingDate: "April 1, 2025",
      clientName: "Haray Ram Ram",
      busNumber: "BA2 Kha622",
      plan: "2 Days",
      dateFrom: "April 1, 2025",
      dateTo: "April 3, 2025",
      driverStatus: <PaidIcon />,
      payment: "$50",
      paymentStatus: "Paid",
      status: "Returned",
    },
  ];

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
    <div className="p-4 bg-gray-100">
      <main className="mb-10">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-3xl font-semibold">
            Vehicle Bookings <span className="text-blue-700">(Bus)</span>{" "}
          </h2>
          <input
            type="text"
            placeholder="Search client name, car etc..."
            className="border w-[250px] border-gray-500 bg-gray-300 px-2 py-1 outline-none rounded-sm"
          />
        </div>
        <div className="flex items-center justify-between">
          <div className=" flex items-center gap-3">
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
          <div className="flex items-center gap-6">
            <button className="bg-gray-200 text-black rounded-sm border-none px-3 py-2">
              Sort by
            </button>
            <button className="bg-blue-600 text-gray-50 px-3 py-2 rounded-sm">
              Add bookings{" "}
            </button>
          </div>
        </div>
      </main>
      <table className="w-full bg-white shadow-md rounded-md overflow-hidden">
        <thead className="bg-blue-100 text-left">
          <tr>
            <th className="p-2">Booking ID</th>
            <th className="p-2">Booking Date</th>
            <th className="p-2">Client Name</th>
            <th className="p-2">Bus Number</th>
            <th className="p-2">Plan</th>
            <th className="p-2">Date</th>
            <th className="p-2">Driver</th>
            <th className="p-2">Payment</th>
            <th className="p-2">Status</th>
          </tr>
        </thead>
        <tbody>
          {bookings.map((ride) => (
            <tr key={ride.id} className="text-sm">
              <td className="p-2 border-b border-gray-500">{ride.bookingId}</td>
              <td className="p-2 border-b border-gray-500">
                {ride.bookingDate}
              </td>
              <td className="p-2 border-b border-gray-500">
                {ride.clientName}
              </td>
              <td className="p-2 border-b border-gray-500">{ride.busNumber}</td>
              <td className="p-2 border-b border-gray-500">{ride.plan}</td>
              <td className="p-2 border-b border-gray-500">
                {ride.dateFrom} <span className="text-gray-500">to</span>{" "}
                {ride.dateTo}
              </td>
              <td className="p-2 border-b border-gray-500 text-center">
                {ride.driverStatus}
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
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default page;
