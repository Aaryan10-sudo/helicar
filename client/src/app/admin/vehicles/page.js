"use client";
import { baseURL } from "@/config/config";
import CancelledIcon from "@/ui/CancelledIcon";
import DeleteIcon from "@/ui/DeleteIcon";
import PaidIcon from "@/ui/PaidIcon";
import UpdateIcon from "@/ui/UpdateIcon";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";

const page = () => {
  const [details, setDetails] = useState([]);
  const router = useRouter();

  const statusColor = {
    Cancelled: "bg-red-100 text-red-600",
    Ongoing: "bg-blue-100 text-blue-600",
    Returned: "bg-green-100 text-green-600",
  };

  const paymentColor = {
    Pending: "bg-red-100 text-red-600",
    Paid: "bg-blue-100 text-blue-600",
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

  const deleteVehicle = async (id) => {
    try {
      const result = await axios({
        url: `${baseURL}/vehicle/delete?id=${id}`,
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await deleteVehicle(id);
          Swal.fire({
            title: "Deleted!",
            text: "Your enquiry has been deleted.",
            icon: "success",
          });
          handleDetails();
        } catch (error) {
          console.log("Error deleting enquiry:", error.message);
        }
      }
    });
  };

  useEffect(() => {
    handleDetails();
  }, []);
  return (
    <div className="py-4 sm:px-3">
      <main className="mb-10">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between mb-6">
          <h2 className="text-2xl sm:text-3xl font-semibold">
            Vehicles <span className="text-blue-700">(Car)</span>
          </h2>
          <input
            type="text"
            placeholder="Search client name, car etc..."
            className="border border-gray-500 bg-gray-300 px-2 py-1 outline-none rounded-sm w-full sm:w-[250px]"
          />
        </div>

        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 sm:gap-0 mb-5">
          <div className="flex flex-wrap gap-2 sm:gap-3">
            {["Car", "Bus", "Tourist bus", "Toyota Hiace"].map((type) => (
              <button
                key={type}
                className="border border-gray-700 rounded-sm px-3 py-1 text-sm"
              >
                {type}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-4">
            <button className="bg-gray-200 text-black rounded-sm border-none px-3 py-2 text-sm">
              Sort by
            </button>
            <Link
              href="/admin/vehicles/add"
              className="bg-blue-600 text-white px-3 py-2 rounded-sm text-sm"
            >
              Add Vehicles
            </Link>
          </div>
        </div>
      </main>

      <div className="overflow-x-auto">
        <table className="min-w-[900px] w-full bg-white shadow-md rounded-md">
          <thead className="bg-blue-100 text-left">
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
            {details.length === 0 ? (
              <tr>
                <td colSpan="9" className="text-center p-4 text-gray-400">
                  No vehicle found
                </td>
              </tr>
            ) : (
              details.map((ride) => (
                <tr key={ride.id} className="text-sm">
                  <td className="p-2 border-b border-gray-300 max-w-[150px] truncate">
                    {ride.id}
                  </td>
                  <td className="p-2 border-b border-gray-300 text-center">
                    {ride.vehicleName}
                  </td>
                  <td className="p-2 border-b border-gray-300 text-center">
                    {ride.numberPlate}
                  </td>
                  <td
                    className={`p-2 border-b border-gray-300 text-center font-medium ${
                      ride.vehicleStatus === "Occupied"
                        ? "text-red-600"
                        : "text-green-600"
                    }`}
                  >
                    {ride.vehicleStatus}
                  </td>
                  <td className="p-2 border-b border-gray-300 text-center">
                    {ride.vehiclePrice}
                  </td>
                  <td className="p-2 border-b border-gray-300 text-center">
                    {ride.category.name}
                  </td>
                  <td className="p-2 border-b border-gray-300 text-center">
                    {ride.type.name}
                  </td>
                  <td className="p-2 border-b border-gray-300 text-center">
                    {ride.vehicleBrand}
                  </td>
                  <td className="p-2 border-b border-gray-300 text-center">
                    <button
                      className="cursor-pointer text-blue-600"
                      onClick={() =>
                        router.push(
                          `/admin/vehicles/update?vehicleId=${ride.id}`
                        )
                      }
                    >
                      <UpdateIcon />
                    </button>
                    <button
                      className="cursor-pointer mx-[10px] text-red-600"
                      onClick={() => handleDelete(ride.id)}
                    >
                      <DeleteIcon />
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
