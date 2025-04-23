"use client";
import { baseURL } from "@/config/config";
import CancelledIcon from "@/ui/CancelledIcon";
import DeleteIcon from "@/ui/DeleteIcon";
import PaidIcon from "@/ui/PaidIcon";
import UpdateIcon from "@/ui/UpdateIcon";
import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";

const page = () => {
  const [details, setDetails] = useState([]);

  const statusColor = {
    Cancelled: "bg-red-100 text-red-600",
    Ongoing: "bg-blue-100 text-blue-600",
    Returned: "bg-green-100 text-green-600",
  };

  const paymentColor = {
    Pending: "bg-red-100 text-red-600",
    Paid: "bg-blue-100 text-blue-600",
  };

  const handleDelete = () => {
    try {
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire({
            title: "Deleted!",
            text: "Your Vehicle has been deleted.",
            icon: "success",
          });
        }
      });
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleDetails = async () => {
    try {
      let result = await axios({
        method: "GET",
        url: `${baseURL}/vehicle/get`,
      });
      console.log(result.data.data);
      setDetails(result.data.data);
    } catch (error) {}
  };
  useEffect(() => {
    handleDetails();
  }, []);
  return (
    <div className="py-4 px-5">
      <main className="mb-10">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-3xl font-semibold">
            Vehicles <span className="text-blue-700">(Car)</span>{" "}
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
            <Link
              href={"/admin/vehicles/add"}
              className="bg-blue-600 text-gray-50 px-3 py-2 rounded-sm"
            >
              Add Vehicles{" "}
            </Link>
          </div>
        </div>
      </main>
      <table className="w-full bg-white shadow-md rounded-md overflow-hidden">
        <thead className="bg-blue-100 w-full text-left">
          <tr>
            <th className="p-2">Vehicle ID</th>
            <th className="p-2 text-center">Vehicle Name</th>
            <th className="p-2 text-center">Vehicle Number</th>
            <th className="p-2 text-center">Status</th>
            <th className="p-2 text-center">Pricing</th>
            <th className="p-2 text-center">Vehicle Category</th>
            <th className="p-2 text-center">Vehicle Type</th>
            <th className="p-2 text-center">Vehicle Brand</th>
            <th className="p-2 text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {details.map((ride) => (
            <tr key={ride.id} className="text-sm">
              <td className="p-2 border-b border-gray-500">
                <div
                  className="line-clamp-1 max-w-[150px] overflow-hidden"
                  title={ride.id}
                >
                  {ride.id}
                </div>
              </td>

              <td className="p-2 border-b border-gray-500 text-center">
                {ride.vehicleName}
              </td>
              <td className="p-2 border-b border-gray-500 text-center">
                {ride.numberPlate}
              </td>

              <td
                className={`p-2 border-b border-gray-500 font-medium text-center ${ride.vehicleStatus === "Occupied" ? "text-red-600" : "text-green-600"}`}
              >
                {ride.vehicleStatus}
              </td>

              <td className="p-2 border-b border-gray-500 text-center">
                {ride.vehiclePrice}
              </td>
              <td className="p-2 border-b border-gray-500 text-center">
                {ride.category.name}
              </td>
              <td className="p-2 border-b border-gray-500 text-center">
                {ride.type.name}
              </td>
              <td className="p-2 border-b border-gray-500 text-center">
                {ride.vehicleBrand}
              </td>

              <td className=" p-2 border-b border-gray-500 text-center">
                <button className="cursor-pointer">
                  <UpdateIcon />
                </button>
                <button
                  className="cursor-pointer mx-[10px]"
                  onClick={() => handleDelete()}
                >
                  <DeleteIcon />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default page;
