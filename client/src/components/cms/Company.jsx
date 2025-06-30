"use client";
import { baseURL } from "@/config/config";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { FaImage, FaTrash } from "react-icons/fa";
import { toast } from "react-toastify";

const Company = () => {
  const [formData, setFormData] = useState({
    heading: "",
    subTitle: "",
    backgroundImage: "",
    secondHeading: "",
    secondSubtitle: "",
    image: "",
  });

  console.log(formData);
  const [loading, setLoading] = useState(false); // For the main update button
  const [imageUploading, setImageUploading] = useState(false); // For the dropzone uploader

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(`${baseURL}/cms/our-company`);
      if (response.data.data.content) {
        setFormData({
          heading: response.data.data.content.heading || "",
          subTitle: response.data.data.content.subTitle || "",
          backgroundImage: response.data.data.content.backgroundImage || "",
          secondHeading: response.data.data.content.secondHeading || "",
          secondSubtitle: response.data.data.content.secondSubtitle || "",
        });
      }
    } catch (error) {
      console.error("Error fetching company rental data:", error);
      // Initialize with empty state to avoid render errors
      setFormData({
        heading: "",
        subTitle: "",
        backgroundImage: "",
        secondHeading: "",
        secondSubtitle: "",
      });
    }
  };

  const handleImageUpload = async (file) => {
    if (!file) return;

    setImageUploading(true);
    const data = new FormData();
    data.append("document", file);

    try {
      const result = await axios.post(`${baseURL}/file/single`, data, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setFormData({ ...formData, backgroundImage: result.data.result });
      toast.success("Image uploaded successfully!");
    } catch (error) {
      toast.error(
        "Image upload failed: " +
          (error.response?.data?.message || error.message)
      );
    } finally {
      setImageUploading(false);
    }
  };

  const { getRootProps, getInputProps } = useDropzone({
    accept: { "image/*": [] },
    multiple: false,
    onDrop: (acceptedFiles) => {
      const file = acceptedFiles[0];
      if (file) {
        handleImageUpload(file);
      }
    },
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.put(
        `${baseURL}/cms/out-company`,
        {
          section: "company Rental",
          content: {
            heading: formData.heading,
            subTitle: formData.subTitle,
            backgroundImage: formData.backgroundImage,
            secondHeading: formData.secondHeading,
            secondSubtitle: formData.secondSubtitle,
          },
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
        }
      );
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
      <h2 className="text-2xl font-bold mb-6 text-blue-700">company Section</h2>
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

          <div>
            <label className="block font-semibold mb-2 text-blue-700 text-lg">
              Background Image
            </label>
            <div
              {...getRootProps()}
              className="transition-all duration-300 w-full h-[250px] border-2 border-dashed border-blue-300 flex items-center justify-center cursor-pointer rounded-lg bg-blue-50 hover:bg-blue-100 hover:border-blue-500 group"
            >
              <input {...getInputProps()} />
              {imageUploading ? (
                <div className="flex flex-col items-center justify-center w-full h-full">
                  <svg
                    className="animate-spin h-10 w-10 text-blue-600"
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
                  <span className="mt-2 text-blue-600 font-medium">
                    Uploading...
                  </span>
                </div>
              ) : !formData.backgroundImage ? (
                <div className="flex flex-col items-center text-blue-400 group-hover:text-blue-600 transition-all">
                  <FaImage
                    size={56}
                    className="group-hover:animate-bounce mb-2"
                  />
                  <p className="mt-2 text-center text-blue-500 font-medium px-4">
                    Drag & drop image here, or click to select
                  </p>
                </div>
              ) : (
                <div className="relative w-full h-full flex items-center justify-center p-2">
                  <img
                    src={formData.backgroundImage}
                    alt="Uploaded preview"
                    className="w-full h-full object-contain rounded-lg border shadow-lg bg-white"
                  />
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setFormData({ ...formData, backgroundImage: "" });
                    }}
                    className="absolute top-3 right-3 bg-red-600 hover:bg-red-700 text-white p-2 rounded-full shadow-lg transition-all opacity-0 group-hover:opacity-100"
                    title="Remove Image"
                  >
                    <FaTrash size={16} />
                  </button>
                </div>
              )}
            </div>
          </div>
          <div>
            <label className="block font-semibold text-blue-700 mb-1">
              Second Header Title
            </label>
            <input
              type="text"
              name="secondHeading"
              value={formData.secondHeading}
              onChange={handleChange}
              placeholder="Enter section heading..."
              className="w-full border border-blue-200 px-4 py-2 rounded-lg bg-blue-50 focus:bg-white focus:ring-2 focus:ring-blue-300 transition-all"
            />
          </div>
          <div>
            <label className="block font-semibold text-blue-700 mb-1">
              Second Description
            </label>
            <input
              type="text"
              name="secondSubTitle"
              value={formData.secondSubtitle}
              onChange={handleChange}
              placeholder="Enter section description..."
              className="w-full border border-blue-200 px-4 py-2 rounded-lg bg-blue-50 focus:bg-white focus:ring-2 focus:ring-blue-300 transition-all"
            />
          </div>

          <div>
            <label className="block font-semibold mb-2 text-blue-700 text-lg">
              Second Image
            </label>
            <div
              {...getRootProps()}
              className="transition-all duration-300 w-full h-[250px] border-2 border-dashed border-blue-300 flex items-center justify-center cursor-pointer rounded-lg bg-blue-50 hover:bg-blue-100 hover:border-blue-500 group"
            >
              <input {...getInputProps()} />
              {imageUploading ? (
                <div className="flex flex-col items-center justify-center w-full h-full">
                  <svg
                    className="animate-spin h-10 w-10 text-blue-600"
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
                  <span className="mt-2 text-blue-600 font-medium">
                    Uploading...
                  </span>
                </div>
              ) : !formData.image ? (
                <div className="flex flex-col items-center text-blue-400 group-hover:text-blue-600 transition-all">
                  <FaImage
                    size={56}
                    className="group-hover:animate-bounce mb-2"
                  />
                  <p className="mt-2 text-center text-blue-500 font-medium px-4">
                    Drag & drop image here, or click to select
                  </p>
                </div>
              ) : (
                <div className="relative w-full h-full flex items-center justify-center p-2">
                  <img
                    src={formData.image}
                    alt="Uploaded preview"
                    className="w-full h-full object-contain rounded-lg border shadow-lg bg-white"
                  />
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setFormData({ ...formData, image: "" });
                    }}
                    className="absolute top-3 right-3 bg-red-600 hover:bg-red-700 text-white p-2 rounded-full shadow-lg transition-all opacity-0 group-hover:opacity-100"
                    title="Remove Image"
                  >
                    <FaTrash size={16} />
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Company;
