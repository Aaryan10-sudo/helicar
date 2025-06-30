"use client";
import { Suspense, useEffect, useState } from "react";
import axios from "axios";
import { baseURL } from "@/config/config";
import { useRouter, useSearchParams } from "next/navigation";
import { useDropzone } from "react-dropzone";

const initialItinerary = [{ day: 1, title: "", description: "" }];

const PopularDestinationForm = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const destinationName = searchParams.get("destination");
  const [form, setForm] = useState({
    name: "",
    image: "",
    description: "",
    itinerary: initialItinerary,
    location: "",
    pricing: "",
  });
  const [imageFile, setImageFile] = useState(null);
  const [preview, setPreview] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [destinationId, setDestinationId] = useState(null);

  console.log("hi");
  useEffect(() => {
    const fetchDestination = async () => {
      if (!destinationName) return;
      try {
        const res = await axios.get(
          `${baseURL}/popular-destination/get-by-name?name=${destinationName}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        const data = res.data.data;
        setForm({
          name: data.name || "",
          image: data.image || "",
          description: data.description || "",
          itinerary:
            Array.isArray(data.itinerary) && data.itinerary.length > 0
              ? data.itinerary
              : initialItinerary,
          location: data.location || "",
        });
        setPreview(typeof data.image === "string" ? data.image : "");
        setDestinationId(data.id);
      } catch (err) {
        setError("Failed to fetch destination data.");
      }
    };
    fetchDestination();
    // eslint-disable-next-line
  }, [destinationName]);

  const onDrop = async (acceptedFiles) => {
    if (acceptedFiles && acceptedFiles[0]) {
      setPreview(URL.createObjectURL(acceptedFiles[0]));
      const imgForm = new FormData();
      imgForm.append("document", acceptedFiles[0]);
      try {
        const uploadRes = await axios.post(`${baseURL}/file/single`, imgForm, {
          headers: { "Content-Type": "multipart/form-data" },
        });

        setForm((prev) => ({
          ...prev,
          image: uploadRes.data.result,
        }));
        setSuccess("Image uploaded!");
      } catch (err) {
        setError("Image upload failed.");
      }
    }
  };
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "image/*": [] },
    multiple: false,
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleItineraryChange = (idx, field, value) => {
    const updated = form.itinerary.map((item, i) =>
      i === idx ? { ...item, [field]: value } : item
    );
    setForm({ ...form, itinerary: updated });
  };

  const addItinerary = () => {
    setForm({
      ...form,
      itinerary: [
        ...form.itinerary,
        { day: form.itinerary.length + 1, title: "", description: "" },
      ],
    });
  };

  const removeItinerary = (idx) => {
    setForm({
      ...form,
      itinerary: form.itinerary.filter((_, i) => i !== idx),
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccess("");
    setError("");

    if (!form.image) {
      setError("Image is required.");
      setLoading(false);
      return;
    }

    try {
      // Use update API instead of create
      await axios.put(
        `${baseURL}/popular-destination/update/${destinationId}`,
        form
      );
      setSuccess("Destination updated successfully!");
      setTimeout(() => router.push("/admin/popular-destination"), 1200);
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full  bg-white px-8 py-5 rounded-2xl  space-y-8 max-w-[1700px] mx-auto"
    >
      <h2 className="text-3xl font-bold mb-10 text-center text-gray-800 ">
        Update Popular Destination
      </h2>
      {success && <div className="text-green-600 text-center">{success}</div>}
      {error && <div className="text-red-600 text-center">{error}</div>}

      <div className="flex flex-col md:flex-row gap-8">
        {/* Image Upload Section */}
        <div className="flex-1 flex flex-col items-center w-full">
          <label className="block font-semibold mb-2 text-gray-700">
            Destination Image
          </label>
          <div
            {...getRootProps()}
            className={`w-full h-72 border-2 border-dashed rounded-xl flex items-center justify-center cursor-pointer transition ${
              isDragActive ? "border-blue-500 bg-blue-50" : "border-gray-300"
            }`}
          >
            <input {...getInputProps()} />
            {preview ? (
              <img
                src={preview}
                alt="Preview"
                className="object-cover w-full h-full rounded-xl"
              />
            ) : (
              <span className="text-gray-400 text-center">
                {isDragActive
                  ? "Drop the image here..."
                  : "Drag & drop an image here, or click to select"}
              </span>
            )}
          </div>
          <p className="text-xs text-gray-400 mt-2">
            JPG, PNG, or JPEG. Max 5MB.
          </p>
        </div>

        {/* Details Section */}
        <div className="flex-1 flex flex-col gap-4 w-full">
          <div>
            <label className="block font-semibold mb-1 text-gray-700">
              Name
            </label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 text-lg"
              required
            />
          </div>

          <div>
            <label className="block font-semibold mb-1 text-gray-700">
              Description
            </label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 text-base"
              rows={4}
              required
            />
          </div>

          <div>
            <label className="block font-semibold mb-1 text-gray-700">
              Location (Google Maps URL)
            </label>
            <input
              type="url"
              name="location"
              value={form.location}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 text-base"
            />
          </div>

          <div>
            <label className="block font-semibold mb-1 text-gray-700">
              Pricing
            </label>
            <input
              type="text"
              name="pricing"
              value={form.pricing}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 text-base"
            />
          </div>
        </div>
      </div>

      {/* Itinerary Section */}
      <div>
        <label className="block font-semibold mb-2 text-gray-700">
          Itinerary
        </label>
        <div className="flex flex-col gap-3">
          {form.itinerary.map((item, idx) => (
            <div key={idx} className="flex flex-col  gap-2  w-full flex-wrap">
              <span className="flex gap-5">
                <input
                  type="number"
                  min={1}
                  name={`day-${idx}`}
                  value={item.day}
                  onChange={(e) =>
                    handleItineraryChange(idx, "day", Number(e.target.value))
                  }
                  className="w-24 border px-2 py-2 rounded-lg text-base"
                  placeholder="Day"
                  required
                />
                <input
                  type="text"
                  name={`title-${idx}`}
                  value={item.title}
                  onChange={(e) =>
                    handleItineraryChange(idx, "title", e.target.value)
                  }
                  className="flex-1 border px-2 py-1 rounded-lg text-base"
                  placeholder="Title"
                  required
                />
              </span>
              <textarea
                name={`description-${idx}`}
                value={item.description}
                onChange={(e) =>
                  handleItineraryChange(idx, "description", e.target.value)
                }
                className="flex-1 border px-2 py-2 h-[50px] rounded-lg text-base"
                placeholder="Description"
                rows={2}
                required
              />
              {form.itinerary.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeItinerary(idx)}
                  className="text-red-500 font-bold px-2"
                  title="Remove"
                >
                  ×
                </button>
              )}
            </div>
          ))}
        </div>
        <button
          type="button"
          onClick={addItinerary}
          className="text-blue-600 mt-2"
        >
          + Add Day
        </button>
      </div>

      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold text-lg hover:bg-blue-700 transition"
        disabled={loading}
      >
        {loading ? "Updating..." : "Update Destination"}
      </button>
    </form>
  );
};

const Page = () => {
  return (
    <Suspense
      fallback={
        <div className="flex justify-center items-center min-h-screen text-xl">
          Loading page...
        </div>
      }
    >
      <PopularDestinationForm />
    </Suspense>
  );
};

export default Page;
