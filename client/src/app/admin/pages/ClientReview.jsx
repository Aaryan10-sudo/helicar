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

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(`${baseURL}/cms/client-reviews`);
      setFormData({
        header: response.data.data.content?.header || "",
        headerDescription: response.data.data.content?.headerDescription || "",
        reviews: response.data.data.content?.reviews || [],
      });
    } catch (error) {
      console.error("Error fetching client reviews:", error);
      toast.error("Failed to fetch client reviews.");
    }
  };

  const handleImageUpload = async (file, index) => {
    if (!file) return;
    const data = new FormData();
    data.append("document", file);

    try {
      const result = await axios.post(`${baseURL}/file/single`, data);
      const updatedReviews = [...formData.reviews];
      updatedReviews[index] = {
        ...updatedReviews[index],
        photo: result.data.result, // Set uploaded image URL from server
        file, // Optionally keep the file reference
      };
      setFormData({ ...formData, reviews: updatedReviews });
    } catch (error) {
      toast.error(
        "Feature image upload failed: " +
          (error.response?.data?.message || error.message)
      );
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
    <div>
      <ToastContainer />
      <h2 className="text-2xl font-semibold mb-3">Client Review Section</h2>
      <div className="relative space-y-5 mb-15">
        <form onSubmit={handleUpdate}>
          <div className="btn-section overflow-hidden mb-4">
            <button
              type="submit"
              disabled={loading}
              className={`mr-2 px-4 py-2 rounded text-white ${
                loading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700"
              }`}
            >
              {loading ? "Updating..." : "Update"}
            </button>
          </div>

          <div className="header-section mb-6">
            <h2 className="text-xl font-semibold mb-2">Header Section</h2>
            <div className="flex flex-col gap-4">
              <label className="text-sm font-medium">Header</label>
              <input
                type="text"
                value={formData.header}
                onChange={(e) =>
                  setFormData({ ...formData, header: e.target.value })
                }
                className="border p-2 rounded"
              />
              <label className="text-sm font-medium">Header Description</label>
              <input
                type="text"
                value={formData.headerDescription}
                onChange={(e) =>
                  setFormData({ ...formData, headerDescription: e.target.value })
                }
                className="border p-2 rounded"
              />
            </div>
          </div>

          <div className="review-section">
            <h2 className="text-xl font-semibold mb-3">Review Section</h2>
            <div className="flex flex-col gap-4">
              {formData.reviews.length > 0 ? (
                formData.reviews.map((review, index) => (
                  <div
                    key={index}
                    className="border p-4 rounded mb-4 bg-gray-50 shadow-sm"
                  >
                    <DropzoneUploader
                      onUpload={(file) => handleImageUpload(file, index)}
                      currentImage={review.photo}
                    />

                    <div className="my-2">
                      <label className="text-sm font-medium">Name:</label>
                      <input
                        type="text"
                        value={review.name || ""}
                        onChange={(e) =>
                          handleReviewChange(index, "name", e.target.value)
                        }
                        className="border p-2 rounded w-full"
                      />
                    </div>
                    <div className="my-2">
                      <label className="text-sm font-medium">Comment:</label>
                      <textarea
                        value={review.comment || ""}
                        onChange={(e) =>
                          handleReviewChange(index, "comment", e.target.value)
                        }
                        className="border p-2 rounded w-full"
                      />
                    </div>
                    <div className="my-2">
                      <label className="text-sm font-medium">Rating:</label>
                      <input
                        type="number"
                        min="1"
                        max="5"
                        value={review.rating || 0}
                        onChange={(e) =>
                          handleReviewChange(
                            index,
                            "rating",
                            parseInt(e.target.value)
                          )
                        }
                        className="border p-2 rounded w-16"
                      />
                    </div>
                  </div>
                ))
              ) : (
                <p>No reviews available.</p>
              )}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ClientReview;
