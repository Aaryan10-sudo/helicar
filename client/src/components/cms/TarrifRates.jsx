"use client";
import { baseURL } from "@/config/config";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { FaImage, FaTrash } from "react-icons/fa";
import { toast } from "react-toastify";

const TarrifRates = () => {
  const [formData, setFormData] = useState({
    heading: "",
    subTitle: "",
  });

  console.log(formData);
  const [loading, setLoading] = useState(false); // For the main update button
  const [imageUploading, setImageUploading] = useState(false); // For the dropzone uploader

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(`${baseURL}/cms/tarrif-rates`);

      if (response.data.data.content) {
        setFormData({
          heading: response.data.data.content.heading || "",
          subTitle: response.data.data.content.subTitle || "",
        });
      }
    } catch (error) {
      console.error("Error fetching company rental data:", error);
      // Initialize with empty state to avoid render errors
      setFormData({
        heading: "",
        subTitle: "",
      });
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const result = await axios.put(
        `${baseURL}/cms/tariff-rates`,
        {
          section: "company Rental",
          content: {
            heading: formData.heading,
            subTitle: formData.subTitle,
          },
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
        }
      );
      console.log(result);
      toast.success("company  section updated successfully!");
    } catch (error) {
      console.error("Error updating company rental section:", error);
      toast.error(
        "Failed to update section: " +
          (error.response?.data?.message || error.message)
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative space-y-8 mb-16 bg-gradient-to-br from-blue-50 to-white rounded-xl shadow-lg p-8 border border-blue-100">
      <h2 className="text-2xl font-bold mb-6 text-blue-700">tarrif Section</h2>
      <form onSubmit={handleUpdate}>
        <div className="flex justify-end mb-6">
          <button
            type="submit"
            disabled={loading || imageUploading}
            className={`transition-all duration-200 px-6 py-2 rounded-lg font-semibold shadow-md text-white bg-gradient-to-r from-blue-600 to-blue-400 hover:from-blue-700 hover:to-blue-500 focus:ring-2 focus:ring-blue-300 focus:outline-none ${
              loading || imageUploading
                ? "bg-gray-400 cursor-not-allowed opacity-70"
                : ""
            }`}
          >
            {loading ? (
              <span className="flex items-center gap-2">
                <svg
                  className="animate-spin h-5 w-5 text-white"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                    fill="none"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v8z"
                  />
                </svg>
                Updating...
              </span>
            ) : (
              "Update Section"
            )}
          </button>
        </div>

        <div className="flex flex-col gap-8">
          <div>
            <label className="block font-semibold text-blue-700 mb-1">
              Header Title
            </label>
            <input
              type="text"
              name="heading"
              value={formData.heading}
              onChange={handleChange}
              placeholder="Enter section heading..."
              className="w-full border border-blue-200 px-4 py-2 rounded-lg bg-blue-50 focus:bg-white focus:ring-2 focus:ring-blue-300 transition-all"
            />
          </div>

          <div>
            <label className="block font-semibold text-blue-700 mb-1">
              Description
            </label>
            <input
              type="text"
              name="subTitle"
              value={formData.subTitle}
              onChange={handleChange}
              placeholder="Enter section description..."
              className="w-full border border-blue-200 px-4 py-2 rounded-lg bg-blue-50 focus:bg-white focus:ring-2 focus:ring-blue-300 transition-all"
            />
          </div>
        </div>
      </form>
    </div>
  );
};

export default TarrifRates;
