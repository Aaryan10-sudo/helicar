"use client";
import { baseURL } from "@/config/config";
import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useDropzone } from "react-dropzone";
import { FaImage, FaTrash } from "react-icons/fa";

const TrekkingSection = () => {
  const [formData, setFormData] = useState({
    header: "",
    headerDescription: "",
    image: "",
    imageDescription: "",
    paragraph: "",
  });

  const [loading, setLoading] = useState(false);
  const [imageUploading, setImageUploading] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(`${baseURL}/cms/trekking`);
      if (response.data.data && response.data.data.content) {
        setFormData({
          header: response.data.data.content.header || "",
          headerDescription: response.data.data.content.headerDescription || "",
          image: response.data.data.content.image || "",
          imageDescription: response.data.data.content.imageDescription || "",
          paragraph: response.data.data.content.paragraph || "",
        });
      }
    } catch (error) {
      toast.error(
        "Error fetching trekking section data: " +
          (error?.response?.data?.message || error?.message || "Unknown error")
      );
      setFormData({
        header: "",
        headerDescription: "",
        image: "",
        imageDescription: "",
        paragraph: "",
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
      setFormData({ ...formData, image: result.data.result });
      toast.success("Image uploaded successfully!");
    } catch (error) {
      toast.error(
        "Image upload failed: " +
          (error?.response?.data?.message || error?.message || "Unknown error")
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
        `${baseURL}/cms/trekking`,
        {
          header: formData.header,
          headerDescription: formData.headerDescription,
          image: formData.image,
          imageDescription: formData.imageDescription,
          paragraph: formData.paragraph,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
        }
      );
      toast.success("Trekking section updated successfully!");
      fetchData();
    } catch (error) {
      toast.error(
        "Failed to update trekking section: " +
          (error?.response?.data?.message || error?.message || "Unknown error")
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative space-y-8 mb-16 bg-gradient-to-br from-blue-50 to-white rounded-xl shadow-lg p-8 border border-blue-100">
      <h2 className="text-2xl font-bold mb-6 text-blue-700">
        Trekking Section
      </h2>
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
              name="header"
              value={formData.header}
              onChange={handleChange}
              placeholder="Enter header title..."
              className="w-full border border-blue-200 px-4 py-2 rounded-lg bg-blue-50 focus:bg-white focus:ring-2 focus:ring-blue-300 transition-all"
            />
          </div>

          <div>
            <label className="block font-semibold text-blue-700 mb-1">
              Header Description
            </label>
            <input
              type="text"
              name="headerDescription"
              value={formData.headerDescription}
              onChange={handleChange}
              placeholder="Enter header description..."
              className="w-full border border-blue-200 px-4 py-2 rounded-lg bg-blue-50 focus:bg-white focus:ring-2 focus:ring-blue-300 transition-all"
            />
          </div>

          <div>
            <label className="block font-semibold mb-2 text-blue-700 text-lg">
              Image
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

          <div>
            <label className="block font-semibold text-blue-700 mb-1">
              Image Description
            </label>
            <input
              type="text"
              name="imageDescription"
              value={formData.imageDescription}
              onChange={handleChange}
              placeholder="Enter image description..."
              className="w-full border border-blue-200 px-4 py-2 rounded-lg bg-blue-50 focus:bg-white focus:ring-2 focus:ring-blue-300 transition-all"
            />
          </div>

          <div>
            <label className="block font-semibold text-blue-700 mb-1">
              Paragraph
            </label>
            <textarea
              name="paragraph"
              value={formData.paragraph}
              onChange={handleChange}
              placeholder="Enter paragraph..."
              rows={4}
              className="w-full border border-blue-200 px-4 py-2 rounded-lg bg-blue-50 focus:bg-white focus:ring-2 focus:ring-blue-300 transition-all"
            />
          </div>
        </div>
      </form>
    </div>
  );
};

export default TrekkingSection;
