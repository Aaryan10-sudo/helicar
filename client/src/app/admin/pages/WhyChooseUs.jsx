"use client";
import { baseURL } from "@/config/config";
import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { toast, ToastContainer } from "react-toastify";

const WhyChooseUs = () => {
  const [whyForm, setWhyForm] = useState({
    mainImage: "",
    features: [],
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(`${baseURL}/cms/why-choose-us`);
      setWhyForm(response.data.data.content || { mainImage: "", features: [] });
    } catch (error) {
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
      toast.success("Error updating Why Choose Us section:", error);
    } finally {
      setLoading(false);
    }
  };

  const onDrop = useCallback(async (acceptedFiles) => {
    const fileData = acceptedFiles[0];
    const data = new FormData();
    data.append("document", fileData);
    try {
      const result = await axios.post(`${baseURL}/file/single`, data);
      setWhyForm((prev) => ({
        ...prev,
        mainImage: result.data.result,
      }));
    } catch (error) {
     toast.success(error.response?.data?.message || "Something went wrong");
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

      try {
        const result = await axios.post(`${baseURL}/file/single`, data);
        const updated = [...whyForm.features];
        updated[index].image = result.data.result; // Set uploaded image URL
        setWhyForm({ ...whyForm, features: updated });
      } catch (error) {
        toast.success("Feature image upload failed:", error.response?.data?.message || error.message);
      }
    },
    [whyForm]
  );

  return (
    <div>
        <ToastContainer />
      <h2 className="text-2xl font-semibold mb-3">Why Choose Us Section</h2>
      <div className="main relative space-y-5 mb-15">
        <form onSubmit={handleUpdate}>
          <div className="btn-section overflow-hidden">
            <button
              type="submit"
              disabled={loading}
              className={`mr-2 px-4 py-2 rounded text-white ${
                loading ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
              }`}
            >
              {loading ? "Updating..." : "Update"}
            </button>
          </div>

          {/* Main Image Upload */}
          <div className="mb-6 relative">
            <label className="block font-semibold mb-2">Main Image</label>
            <div
              {...getRootProps()}
              className="w-full h-[200px] border-2 border-dashed border-gray-400 flex items-center justify-center cursor-pointer rounded"
            >
              <input {...getInputProps()} />
              <p className="text-gray-500">Drag & drop image here, or click to select</p>
            </div>
            {whyForm?.mainImage && (
              <div className="relative mt-4">
                <img
                  src={whyForm.mainImage}
                  alt="Uploaded preview"
                  className="w-full h-[200px] object-cover rounded"
                />
                <button
                  type="button"
                  onClick={() => setWhyForm({ ...whyForm, mainImage: "" })}
                  className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full text-xs"
                >
                  ✕
                </button>
              </div>
            )}
          </div>

          {/* Features Section */}
          <label className="block font-semibold mb-2">Features</label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {(whyForm.features || []).map((feature, index) => (
              <div
                key={index}
                className="p-4 border rounded shadow-sm space-y-3 bg-gray-50"
              >
                <input
                  type="text"
                  value={feature.title || ""}
                  onChange={(e) =>
                    handleFeatureChange(index, "title", e.target.value)
                  }
                  placeholder="Enter feature title"
                  className="w-full px-3 py-2 border rounded"
                />

                <div
                  className="h-[150px] border border-dashed border-gray-300 rounded flex items-center justify-center cursor-pointer"
                  onClick={() =>
                    document.getElementById(`featureDrop_${index}`).click()
                  }
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
                  <span className="text-sm text-gray-500">
                    {feature.image ? "Change Image" : "Upload Image"}
                  </span>
                </div>

                {feature.image && (
                  <img
                    src={feature.image}
                    alt={`Feature ${index + 1}`}
                    className="w-full h-[150px] object-cover rounded"
                  />
                )}
              </div>
            ))}
          </div>
        </form>
      </div>
    </div>
  );
};

export default WhyChooseUs;
