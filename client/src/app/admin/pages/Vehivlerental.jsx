import React, { useState } from "react";
import DropzoneUploader from "./DropzoneUploader"; // adjust the path as needed

const VehicleRental = () => {
  const [rentalDetails, setRentalDetails] = useState({
    heading: "",
    subTitle: "",
    backgroundImage: "",
  });

  const handleChange = (e) => {
    setRentalDetails({ ...rentalDetails, [e.target.name]: e.target.value });
  };

  const handleImageUpload = (imageUrl) => {
    setRentalDetails({ ...rentalDetails, backgroundImage: imageUrl });
  };

  return (
    <div className="p-4 bg-white shadow rounded space-y-4 max-w-3xl mx-auto">
      <div>
        <label className="block font-semibold text-purple-700 mb-1">
          Header Title
        </label>
        <input
          type="text"
          name="heading"
          value={rentalDetails.heading}
          onChange={handleChange}
          placeholder="Enter Why Choose Us heading..."
          className="w-full border rounded px-4 py-2 bg-blue-50 outline-none"
        />
      </div>

      <div>
        <label className="block font-semibold text-purple-700 mb-1">
          Description
        </label>
        <input
          type="text"
          name="subTitle"
          value={rentalDetails.subTitle}
          onChange={handleChange}
          placeholder="Enter Why Choose Us description..."
          className="w-full border rounded px-4 py-2 bg-blue-50 outline-none"
        />
      </div>

      <div>
        <label className="block font-semibold text-purple-700 mb-1">
          Main Image
        </label>
        <DropzoneUploader onUpload={handleImageUpload} />
      </div>
    </div>
  );
};

export default VehicleRental;
