"use client";
import { baseURL } from "@/config/config";
import DeleteIcon from "@/ui/DeleteIcon";
import DownArrowIcon from "@/ui/DownArrowIcon";
import axios from "axios";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";

const Page = () => {
  const [enquiry, setEnquiry] = useState([]);
  const [openDetails, setOpenDetails] = useState({});

  const toggleDetails = (id) => {
    setOpenDetails((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const getAllEnquiry = async () => {
    try {
      const result = await axios({
        url: `${baseURL}/enquiry/get`,
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      console.log(result);
      setEnquiry(result.data.data);
    } catch (error) {
      console.log(error.message);
    }
  };

  const deleteEnquiry = async (id) => {
    try {
      const result = await axios({
        url: `${baseURL}/enquiry/delete?id=${id}`,
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      getAllEnquiry();
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
          await deleteEnquiry(id);
          Swal.fire({
            title: "Deleted!",
            text: "Your enquiry has been deleted.",
            icon: "success",
          });
          getAllEnquiry();
        } catch (error) {
          console.log("Error deleting enquiry:", error.message);
        }
      }
    });
  };
  useEffect(() => {
    getAllEnquiry();
  }, []);

  return (
    <section className="m-7 shadow-xl p-5 rounded-xl">
      <h1 className="text-[30px] font-semibold">Reviews</h1>
      <br />
      <ul className="flex justify-between items-center border-b-2 border-b-gray-200 pb-5 text-[#606061] px-[10px]">
        <li className="">Full Name</li>
        <li className="">Email</li>
        <li className="">Driving</li>
        <li className="">Space and Practiciality</li>
        <li className="">Interior Layout</li>
        <li className="">Overall</li>
        <li className="">Action</li>
      </ul>
      {enquiry.length === 0 ? (
        <p className="text-center text-gray-500 mt-10 text-lg">
          No Reviews Found
        </p>
      ) : (
        enquiry.map((enquiry) => (
          <div
            key={enquiry.id}
            className="border rounded-lg border-gray-400 my-[30px]"
          >
            <span className="flex justify-between items-center border-b py-5 px-[10px] border-gray-400 font-semibold">
              <h1 className="w-[200px]">{enquiry.name}</h1>
              <p className="w-[200px]">{enquiry.createdAt.split("T")[0]}</p>
              <p className="w-[200px]">{enquiry.updatedAt.split("T")[0]}</p>
              <span className="w-[200px] flex justify-center">
                <button
                  className="h-[50px] w-[50px] border rounded-lg border-gray-400 flex justify-center items-center cursor-pointer"
                  onClick={() => handleDelete(enquiry.id)}
                >
                  <DeleteIcon />
                </button>
              </span>
            </span>

            <div className="py-5 px-[10px]">
              <span
                className="text-blue-600 cursor-pointer flex gap-2 items-center"
                onClick={() => toggleDetails(enquiry.id)}
              >
                <h1 className="font-semibold">Show Enquiry Details</h1>
                <DownArrowIcon
                  className={`text-blue-600 transition-transform duration-300 ${
                    openDetails[enquiry.id] ? "rotate-180" : ""
                  }`}
                />
              </span>

              {openDetails[enquiry.id] && (
                <div className="mt-4 rounded">
                  <span className="flex gap-10 items-center text-[#606061]">
                    <p className="font-bold text-[20px] text-black">
                      {enquiry.name}
                    </p>
                    <p>{enquiry.email}</p>
                    <p>{enquiry.contact}</p>
                  </span>
                  <br />
                  <p className="max-w-[700px]">{enquiry.message}</p>
                </div>
              )}
            </div>
          </div>
        ))
      )}
    </section>
  );
};

export default Page;
