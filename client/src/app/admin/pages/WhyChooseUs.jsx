"use client";
import { baseURL } from "@/config/config";
import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { toast, ToastContainer } from "react-toastify";
import { FaImage, FaTrash } from "react-icons/fa";

const WhyChooseUs = () => {
  const FEATURE_COUNT = 4;
  const emptyFeature = () => ({ title: "", image: "" });
  const [whyForm, setWhyForm] = useState({
    header: "",
    description: "",
    mainImage: "",
    features: Array(FEATURE_COUNT).fill(0).map(emptyFeature),
  });
  const [loading, setLoading] = useState(false);
  const [mainImageUploading, setMainImageUploading] = useState(false);
  const [featureUploading, setFeatureUploading] = useState(Array(FEATURE_COUNT).fill(false));

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(`${baseURL}/cms/why-choose-us`);
      console.log("API response:", response);
      const content = response.data.data.content || {header:"",description:"", mainImage: "", features: [] };
      // Ensure features array has 4 items, each a unique object
      const paddedFeatures = [
        ...(content.features || []),
        ...Array(FEATURE_COUNT).fill(0).map(emptyFeature),
      ].slice(0, FEATURE_COUNT);
      setWhyForm({
        header: content.header || "",
        description: content.description || "",
        mainImage: content.mainImage || "",
        features: paddedFeatures,
      });
    } catch (error) {
      setWhyForm({
        header: "",
        description: "",
        mainImage: "",
        features: Array(FEATURE_COUNT).fill(0).map(emptyFeature),
      });
      console.log("Error fetching Why Choose Us section:", error);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.put(
        `${baseURL}/cms/why-choose-us`,
        {
          content: {
            header: whyForm.header,
            description: whyForm.description,
            mainImage: whyForm.mainImage || "",
            features: whyForm.features.map(({ title, image }) => ({ title, image })),
          },
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
        }
      );
      toast.success("Updated successfully!");
    } catch (error) {
      toast.error("Error updating Why Choose Us section: " + (error?.response?.data?.message || error.message));
    } finally {
      setLoading(false);
    }
  };

  const onDrop = useCallback(async (acceptedFiles) => {
    const fileData = acceptedFiles[0];
    const data = new FormData();
    data.append("document", fileData);
    setMainImageUploading(true);
    try {
      const result = await axios.post(`${baseURL}/file/single`, data);
      setWhyForm((prev) => ({
        ...prev,
        mainImage: result.data.result,
      }));
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    } finally {
      setMainImageUploading(false);
    }
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: { "image/*": [] },
  });

  const handleFeatureChange = useCallback(
    (index, field, value) => {
      const updatedFeatures = [...whyForm.features];
      updatedFeatures[index][field] = value;
      setWhyForm({ ...whyForm, features: updatedFeatures });
    },
    [whyForm]
  );

  const handleFeatureImageDrop = useCallback(
    async (index, acceptedFiles) => {
      if (!acceptedFiles?.length) return;
      const file = acceptedFiles[0];
      const data = new FormData();
      data.append("document", file);

      setFeatureUploading((prev) => {
        const updated = [...prev];
        updated[index] = true;
        return updated;
      });

      try {
        const result = await axios.post(`${baseURL}/file/single`, data);
        const updated = [...whyForm.features];
        updated[index].image = result.data.result; // Set uploaded image URL
        setWhyForm({ ...whyForm, features: updated });
      } catch (error) {
        toast.error("Feature image upload failed: " + (error.response?.data?.message || error.message));
      } finally {
        setFeatureUploading((prev) => {
          const updated = [...prev];
          updated[index] = false;
          return updated;
        });
      }
    },
    [whyForm]
  );

  return (
    <div className="relative space-y-8 mb-16 bg-gradient-to-br from-blue-50 to-white rounded-xl shadow-lg p-8 border border-blue-100">
      {/* <ToastContainer /> */}
      <h2 className="text-2xl font-bold mb-6 text-blue-700">Why Choose Us Section</h2>
      <form onSubmit={handleUpdate}>
        <div className="flex justify-end mb-6">
          <button
            type="submit"
            disabled={loading}
            className={`transition-all duration-200 mr-2 px-6 py-2 rounded-lg font-semibold shadow-md text-white bg-gradient-to-r from-blue-600 to-blue-400 hover:from-blue-700 hover:to-blue-500 focus:ring-2 focus:ring-blue-300 focus:outline-none ${
              loading ? "bg-gray-400 cursor-not-allowed" : ""
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

        <div className="title-header">
          <label className="block font-semibold mb-2 text-blue-700 text-lg">Header Title</label>
         <input
                type="text"
                value={whyForm.header || ""}
                onChange={(e) =>
                  setWhyForm({ ...whyForm, header: e.target.value })
                }
                className="w-full border border-blue-200 px-4 py-2 rounded-lg bg-blue-50 focus:bg-white focus:ring-2 focus:ring-blue-300 transition-all"
                placeholder="Enter Why Choose Us heading..."
              />
        </div>
        <div className="header-description mb-6">
          <label className="block font-semibold mb-2 text-blue-700 text-lg">Description</label>
         <input
                type="text"
                value={whyForm.description || ""}
                onChange={(e) =>
                  setWhyForm({ ...whyForm, description: e.target.value })
                }
                className="w-full border border-blue-200 px-4 py-2 rounded-lg bg-blue-50 focus:bg-white focus:ring-2 focus:ring-blue-300 transition-all"
                placeholder="Enter Why Choose Us description..."
              />
        </div>


        {/* Main Image Upload */}
        <div className="mb-8 relative">
          <label className="block font-semibold mb-2 text-blue-700 text-lg">Main Image</label>
          <div
            {...getRootProps()}
            className="transition-all duration-200 w-full h-[220px] border-2 border-dashed border-blue-300 flex items-center justify-center cursor-pointer rounded-lg bg-blue-50 hover:bg-blue-100 hover:border-blue-500 group"
          >
            <input {...getInputProps()} />
            {mainImageUploading ? (
              <div className="flex flex-col items-center justify-center w-full h-full">
                <svg className="animate-spin h-10 w-10 text-blue-600" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"/>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/>
                </svg>
                <span className="mt-2 text-blue-600 font-medium">Uploading...</span>
              </div>
            ) : !whyForm?.mainImage ? (
              <div className="flex flex-col items-center text-blue-400 group-hover:text-blue-600 transition-all">
                <FaImage size={56} className="animate-bounce mb-2" />
                <p className="mt-2 text-blue-500 font-medium">Drag & drop image here, or click to select</p>
              </div>
            ) : (
              <div className="relative w-full h-full flex items-center justify-center">
                <img
                  src={whyForm.mainImage}
                  alt="Uploaded preview"
                  className="w-full h-[210px] object-contain rounded-lg border shadow-lg bg-white"
                />
                <button
                  type="button"
                  onClick={e => {
                    e.stopPropagation();
                    setWhyForm({ ...whyForm, mainImage: "" });
                  }}
                  className="absolute top-3 right-3 bg-red-600 hover:bg-red-700 text-white p-2 rounded-full shadow-lg transition-all"
                  title="Remove Image"
                >
                  <FaTrash size={16} />
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Features Section */}
        <label className="block font-semibold mb-2 text-blue-700 text-lg">Features</label>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {(whyForm.features || []).map((feature, index) => (
            <div
              key={index}
              className="border border-blue-100 p-6 rounded-xl bg-blue-50 shadow group transition-all space-y-4"
            >
              <input
                type="text"
                value={feature.title || ""}
                onChange={(e) =>
                  handleFeatureChange(index, "title", e.target.value)
                }
                placeholder="Enter feature title"
                className="w-full border border-blue-200 px-4 py-2 rounded-lg bg-white focus:ring-2 focus:ring-blue-300 transition-all"
              />

              <div
                className="relative h-[160px] border-2 border-dashed border-blue-300 rounded-lg flex items-center justify-center cursor-pointer bg-blue-50 hover:border-blue-500 transition-all"
                onClick={() =>
                  document.getElementById(`featureDrop_${index}`).click()
                }
                title={feature.image ? "Change Image" : "Upload Image"}
              >
                <input
                  type="file"
                  id={`featureDrop_${index}`}
                  accept="image/*"
                  className="hidden"
                  onChange={(e) =>
                    handleFeatureImageDrop(index, Array.from(e.target.files))
                  }
                />
                {featureUploading[index] ? (
                  <div className="flex flex-col items-center justify-center w-full h-full">
                    <svg className="animate-spin h-8 w-8 text-blue-600" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"/>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/>
                    </svg>
                    <span className="mt-2 text-blue-600 text-xs">Uploading...</span>
                  </div>
                ) : !feature.image ? (
                  <div className="flex flex-col items-center text-blue-400 group-hover:text-blue-600 transition-all">
                    <FaImage size={40} className="animate-bounce mb-2" />
                    <span className="text-blue-500 font-medium">Upload Image</span>
                  </div>
                ) : (
                  <div className="relative w-full h-full flex items-center justify-center">
                    <img
                      src={feature.image}
                      alt={`Feature ${index + 1}`}
                      className="w-full h-[140px] object-contain rounded-lg border shadow bg-white"
                    />
                    <button
                      type="button"
                      onClick={e => {
                        e.stopPropagation();
                        handleFeatureChange(index, "image", "");
                      }}
                      className="absolute top-2 right-2 bg-red-600 hover:bg-red-700 text-white p-1.5 rounded-full shadow transition-all"
                      title="Remove Image"
                    >
                      <FaTrash size={14} />
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </form>
    </div>
  );
};

export default WhyChooseUs;
