"use client";
import { baseURL } from "@/config/config";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import DropzoneUploader from "./DropzoneUploader";
 // adjust if needed

const ClientReview = () => {
  const [formData, setFormData] = useState({
    header: "",
    headerDescription: "",
    reviews: [],
  });
  console.log("formData", formData);
  const [loading, setLoading] = useState(false);
  const [uploadingIndexes, setUploadingIndexes] = useState([]);

  const EMPTY_REVIEW = { name: "", comment: "", rating: 0, photo: "" };

  const padReviews = (reviews) => {
    const padded = [...reviews];
    while (padded.length < 4) {
      padded.push({ ...EMPTY_REVIEW });
    }
    return padded.slice(0, 4);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(`${baseURL}/cms/client-reviews`);
      setFormData({
        header: response.data.data.content?.header || "",
        headerDescription: response.data.data.content?.headerDescription || "",
        reviews: padReviews(response.data.data.content?.reviews || []),
      });
    } catch (error) {
      console.error("Error fetching client reviews:", error);
      // toast.error("Failed to fetch client reviews.");
      setFormData({
        header: "",
        headerDescription: "",
        reviews: padReviews([]),
      });
    }
  };

  const handleImageUpload = async (file, index) => {
    if (!file) return;
    setUploadingIndexes((prev) => [...prev, index]); // Start uploading
    const data = new FormData();
    data.append("document", file);

    try {
      const result = await axios.post(`${baseURL}/file/single`, data);
      const updatedReviews = [...formData.reviews];
      updatedReviews[index] = {
        ...updatedReviews[index],
        photo: result.data.result,
        file,
      };
      setFormData({ ...formData, reviews: updatedReviews });
    } catch (error) {
      toast.error(
        "Image upload failed: " +
          (error.response?.data?.message || error.message)
      );
    } finally {
      setUploadingIndexes((prev) => prev.filter((i) => i !== index)); // Stop uploading
    }
  };

  const handleReviewChange = (index, field, value) => {
    const updatedReviews = [...formData.reviews];
    updatedReviews[index] = {
      ...updatedReviews[index],
      [field]: value,
    };
    setFormData({ ...formData, reviews: updatedReviews });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.put(
        `${baseURL}/cms/client-reviews`,
        {
          content: {
            header: formData.header || "",
            headerDescription: formData.headerDescription || "",
            reviews: formData.reviews.map(({ name, comment, rating, photo }) => ({
              name,
              comment,
              rating,
              photo,
            })),
          },
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
        }
      );
      toast.success("Client reviews updated successfully!");
    } catch (error) {
      console.error("Error updating client reviews:", error);
      toast.error("Failed to update client reviews.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative space-y-8 mb-16 bg-gradient-to-br from-blue-50 to-white rounded-xl shadow-lg p-8 border border-blue-100">
      {/* <ToastContainer /> */}
      <h2 className="text-2xl font-bold mb-6 text-blue-700">Client Review Section</h2>
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

        <div className="header-section mb-10">
          <h3 className="text-xl font-semibold mb-4 text-blue-600">Header Section</h3>
          <div className="flex flex-col gap-4">
            <label className="text-sm font-medium text-blue-700">Header</label>
            <input
              type="text"
              value={formData.header}
              onChange={(e) =>
                setFormData({ ...formData, header: e.target.value })
              }
              className="border border-blue-200 px-4 py-2 rounded-lg bg-blue-50 focus:bg-white focus:ring-2 focus:ring-blue-300 transition-all"
              placeholder="Enter section header..."
            />
            <label className="text-sm font-medium text-blue-700">Header Description</label>
            <input
              type="text"
              value={formData.headerDescription}
              onChange={(e) =>
                setFormData({ ...formData, headerDescription: e.target.value })
              }
              className="border border-blue-200 px-4 py-2 rounded-lg bg-blue-50 focus:bg-white focus:ring-2 focus:ring-blue-300 transition-all"
              placeholder="Enter section description..."
            />
          </div>
        </div>

        <div className="review-section">
          <h3 className="text-xl font-semibold mb-6 text-blue-600">Review Section</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {formData.reviews.map((review, index) => (
              <div
                key={index}
                className="border border-blue-100 p-6 rounded-xl bg-blue-50 shadow group transition-all"
              >
                <DropzoneUploader
                  onUpload={async (file) => await handleImageUpload(file, index)}
                  currentImage={review.photo}
                  isUploading={uploadingIndexes.includes(index)}
                />

                <div className="my-3">
                  <label className="text-sm font-medium text-blue-700">Name</label>
                  <input
                    type="text"
                    value={review.name || ""}
                    onChange={(e) =>
                      handleReviewChange(index, "name", e.target.value)
                    }
                    className="w-full border border-blue-200 px-4 py-2 rounded-lg bg-white focus:ring-2 focus:ring-blue-300 transition-all"
                    placeholder="Client name"
                  />
                </div>
                <div className="my-3">
                  <label className="text-sm font-medium text-blue-700">Comment</label>
                  <textarea
                    value={review.comment || ""}
                    onChange={(e) =>
                      handleReviewChange(index, "comment", e.target.value)
                    }
                    className="w-full border border-blue-200 px-4 py-2 rounded-lg bg-white focus:ring-2 focus:ring-blue-300 transition-all"
                    placeholder="Client comment"
                  />
                </div>
                <div className="my-3">
                  <label className="text-sm font-medium text-blue-700">Rating</label>
                  <input
                    type="number"
                    min="0"
                    max="5"
                    value={review.rating || 0}
                    onChange={(e) =>
                      handleReviewChange(
                        index,
                        "rating",
                        parseInt(e.target.value)
                      )
                    }
                    className="border border-blue-200 px-4 py-2 rounded-lg bg-white focus:ring-2 focus:ring-blue-300 transition-all w-24"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </form>
    </div>
  );
};

export default ClientReview;
