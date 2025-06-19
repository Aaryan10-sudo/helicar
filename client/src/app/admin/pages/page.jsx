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
    try {
      let result = await axios.post(`${baseURL}/file/single`, data);
      setForm((prev) => ({
        ...prev,
        image: result.data.result,
      }));
    } catch (error) {
      toast.success(error.response?.data?.message || "Something went wrong");
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
          <div className="relative space-y-5 mb-15">
            <div className="btn-section overflow-hidden">
              <button
                onClick={handleUpdate}
                disabled={loading}
                className={`mr-2 px-4 py-2 rounded text-white ${loading
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-blue-600 hover:bg-blue-700"
                  }`}
              >
                {loading ? "Updating..." : "Update"}
              </button>
            </div>

            <div className="mb-6 relative">
              <label className="block font-semibold mb-2">Hero Image</label>

              <div
                {...getRootProps()}
                className="w-full h-[200px] border-2 border-dashed border-gray-400 flex items-center justify-center cursor-pointer rounded"
              >
                <input {...getInputProps()} />
                <p className="text-gray-500">
                  Drag & drop image here, or click to select
                </p>
              </div>

              {form?.image && (
                <div className="relative mt-4">
                  <img
                    src={form.image}
                    alt="Uploaded preview"
                    className="w-full h-[200px] object-cover rounded"
                  />
                  <button
                    type="button"
                    onClick={() =>
                      setForm({ ...form, image: "", imageFile: null })
                    }
                    className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full text-xs"
                  >
                    ✕
                  </button>
                </div>
              )}
            </div>

            <div className="heading-section my-4">
              <label className="block font-medium mb-1">Heading</label>
              <input
                type="text"
                value={form.heading || ""}
                onChange={(e) =>
                  setForm({ ...form, heading: e.target.value })
                }
                className="w-full border px-3 py-2 rounded"
              />
            </div>

            <div className="sub-title my-4">
              <label className="block font-medium mb-1">Subtitle</label>
              <input
                type="text"
                value={form.subtitle || ""}
                onChange={(e) =>
                  setForm({ ...form, subtitle: e.target.value })
                }
                className="w-full border px-3 py-2 rounded"
              />
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

        <div className="whychooseus-section">
          <WhyChooseUs />
        </div>
        <div className="ClientReview">
          <ClientReview />
        </div>
      </div>
    </section>
  );
};

export default Page;
