"use client";
import Blogs from "@/components/cms/Blogs";
import Company from "@/components/cms/Company";
import TarrifRates from "@/components/cms/TarrifRates";
import Trekking from "@/components/cms/Trekking";
import VehicleRental from "@/components/cms/VehicleRental";
import { baseURL } from "@/config/config";
import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import WhyChooseUs from "./WhyChooseUs";
import { toast, ToastContainer } from "react-toastify";
import ClientReview from "./ClientReview";
import { FaImage } from "react-icons/fa";

const Page = () => {
  const lists = [
    "Home",
    "Vehicle Rental",
    "Company",
    "Tarrif Rates",
    "Trekking",
    "Blogs",
  ];

  const [activeTab, setActiveTab] = useState("Home");
  const [form, setForm] = useState({});
  const [loading, setLoading] = useState(false);
  const [imageUploading, setImageUploading] = useState(false);

  // console.log(form)

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const response = await axios.get(`${baseURL}/cms/hero`);
      console.log("Fetched data:", response.data);
      setForm(response.data.data.content || {});
    } catch (error) {
      console.error("Error fetching settings:", error);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      let imageUrl = form.image || "";

      // If a new image file is selected, upload it first
      if (form.image && form.image instanceof File) {
        const imageFormData = new FormData();
        imageFormData.append("image", form.image);

        const uploadRes = await axios.post(
          `${baseURL}/upload/image`, // Adjust to your image upload endpoint
          imageFormData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "multipart/form-data",
            },
          }
        );
        imageUrl = uploadRes.data.url; // Adjust according to your API response
      }

      // Now update the hero content
      const response = await axios.put(
        `${baseURL}/cms/hero`,
        {
          content: {
            heading: form.heading || "",
            subtitle: form.subtitle || "",
            image: imageUrl,
          },
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      toast.success("Update successful!");
    } catch (error) {
      // console.error("Update failed:", error);
      toast.success("Update failed!");
    } finally {
      setLoading(false);
    }
  };

  const onDrop = useCallback(async (acceptedFiles) => {
    let fileData = acceptedFiles[0];
    let data = new FormData();
    data.append("document", fileData);
    setImageUploading(true); // Start loader
    try {
      let result = await axios.post(`${baseURL}/file/single`, data);
      setForm((prev) => ({
        ...prev,
        image: result.data.result,
      }));
    } catch (error) {
      toast.success(error.response?.data?.message || "Something went wrong");
    } finally {
      setImageUploading(false); // Stop loader
    }
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: { "image/*": [] },
  });

  const renderForm = () => {
    switch (activeTab) {
      case "Home":
        return (
          <div className="relative space-y-8 mb-16 bg-gradient-to-br from-blue-50 to-white rounded-xl shadow-lg p-8 border border-blue-100">
            <div className="flex justify-end">
              <button
                onClick={handleUpdate}
                disabled={loading}
                className={`transition-all duration-200 mr-2 px-6 py-2 rounded-lg font-semibold shadow-md text-white bg-gradient-to-r from-blue-600 to-blue-400 hover:from-blue-700 hover:to-blue-500 focus:ring-2 focus:ring-blue-300 focus:outline-none ${loading
                  ? "bg-gray-400 cursor-not-allowed"
                  : ""
                }`}
              >
                {loading ? (
                  <span className="flex items-center gap-2">
                    <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"/>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/>
                    </svg>
                    Updating...
                  </span>
                ) : "Update"}
              </button>
            </div>

            <div className="mb-8 relative">
              <label className="block font-semibold mb-2 text-blue-700 text-lg">Hero Image</label>
              <div
                {...getRootProps()}
                className="transition-all duration-200 w-full h-[220px] border-2 border-dashed border-blue-300 flex items-center justify-center cursor-pointer rounded-lg bg-blue-50 hover:bg-blue-100 hover:border-blue-500 group relative"
              >
                <input {...getInputProps()} />
                {imageUploading ? (
                  <div className="flex flex-col items-center justify-center w-full h-full">
                    <svg className="animate-spin h-10 w-10 text-blue-600" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"/>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/>
                    </svg>
                    <span className="mt-2 text-blue-600 font-medium">Uploading...</span>
                  </div>
                ) : (
                  <>
                    {!form?.image && (
                      <div className="flex flex-col items-center text-blue-400 group-hover:text-blue-600 transition-all">
                        <FaImage size={56} className="animate-bounce mb-2" />
                        <p className="mt-2 text-blue-500 font-medium">Drag & drop image here, or click to select</p>
                      </div>
                    )}
                    {form?.image && (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <img
                          src={form.image}
                          alt="Uploaded preview"
                          className="w-full h-full object-contain rounded-lg shadow border border-blue-100"
                        />
                        <button
                          type="button"
                          onClick={e => {
                            e.stopPropagation();
                            setForm({ ...form, image: "", imageFile: null });
                          }}
                          className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white p-2 rounded-full text-xs shadow transition-all"
                          title="Remove image"
                        >
                          ✕
                        </button>
                      </div>
                    )}
                  </>
                )}
              </div>
            </div>

            <div className="heading-section my-4">
              <label className="block font-medium mb-2 text-blue-700">Heading</label>
              <input
                type="text"
                value={form.heading || ""}
                onChange={(e) =>
                  setForm({ ...form, heading: e.target.value })
                }
                className="w-full border border-blue-200 px-4 py-2 rounded-lg bg-blue-50 focus:bg-white focus:ring-2 focus:ring-blue-300 transition-all"
                placeholder="Enter hero heading..."
              />
            </div>

            <div className="sub-title my-4">
              <label className="block font-medium mb-2 text-blue-700">Subtitle</label>
              <input
                type="text"
                value={form.subtitle || ""}
                onChange={(e) =>
                  setForm({ ...form, subtitle: e.target.value })
                }
                className="w-full border border-blue-200 px-4 py-2 rounded-lg bg-blue-50 focus:bg-white focus:ring-2 focus:ring-blue-300 transition-all"
                placeholder="Enter hero subtitle..."
              />
            </div>
            <div className="whychooseus-section">
          <WhyChooseUs />
        </div>
        <div className="ClientReview">
          <ClientReview />
        </div>
          </div>
        );

      case "Vehicle Rental":
        return <VehicleRental />;
      case "Company":
        return <Company />;
      case "Tarrif Rates":
        return <TarrifRates />;
      case "Trekking":
        return <Trekking />;
      case "Blogs":
        return <Blogs />;
      default:
        return null;
    }
  };

  return (
    <section className="p-5">
      <ToastContainer />
      <h1 className="font-bold text-[40px]">Page Customization</h1>
      <div className="bg-white shadow p-6 rounded-lg">
        <div className="flex justify-between items-center mb-4">
          <div className="flex gap-4 flex-wrap">
            {lists.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 cursor-pointer rounded shadow ${activeTab === tab
                    ? "bg-blue-600 text-white"
                    : "bg-white hover:bg-blue-100"
                  }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        <h2 className="text-2xl font-bold mb-4">{activeTab}</h2>
        {renderForm()}

        
      </div>
    </section>
  );
};

export default Page;
