"use client";
import { baseURL } from "@/config/config";
import GalleryIcon from "@/ui/GalleryIcon";
import Tick from "@/ui/Tick";
import Vehicle from "@/ui/Vehicle";
import VehicleIcon from "@/ui/VehicleIcon";
import axios from "axios";
import Image from "next/image";
import React, { useState, useCallback, useEffect } from "react";
import { useDropzone } from "react-dropzone";

const page = () => {
  const [vehicleName, setVehicleName] = useState("");
  const [vehicleDescription, setVehicleDescription] = useState("");
  const [seats, setSeats] = useState("");
  const [luggage, setLuggage] = useState("");
  const [transmission, setTransmission] = useState("");
  const [vehicleBrand, setVehicleBrand] = useState("");
  const [vehiclePrice, setVehiclePrice] = useState("");
  const [vehicleImage, setVehicleImage] = useState("");
  const [vehicleCategory, setVehicleCategory] = useState("");
  const [vehicleType, setVehicleType] = useState("");
  const [numberPlate, setNumberPlate] = useState("");
  const [vehicleCategories, setVehicleCategories] = useState([]);
  const [vehicleTypes, setVehicleTypes] = useState([]);
  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const [showTypeModal, setShowTypeModal] = useState(false);
  const [newCategory, setNewCategory] = useState("");
  const [newType, setNewType] = useState("");

  const getAllVehicleCategory = async () => {
    try {
      const result = await axios({
        url: `${baseURL}/vehicle-category/get`,
        method: "GET",
      });
      console.log(result);
      setVehicleCategories(result.data.data);
    } catch (error) {
      console.log(error.message);
    }
  };

  const getAllVehicleType = async () => {
    try {
      const result = await axios({
        url: `${baseURL}/vehicle-type/get`,
        method: "GET",
      });
      console.log(result.data.data);
      setVehicleTypes(result.data.data);
      getAllVehicleCategory();
    } catch (error) {
      console.log(error.message);
    }
  };

  const addCategory = async () => {
    const name = newCategory;
    try {
      const result = await axios({
        method: "POST",
        url: `${baseURL}/vehicle-category/create`,
        data: { name },
      });
      setShowCategoryModal(false);
      await getAllVehicleCategory();
      console.log(result);
    } catch (error) {
      console.log(error.message);
    }
  };

  const addType = async () => {
    const name = newType;
    try {
      const result = await axios({
        method: "POST",
        url: `${baseURL}/vehicle-type/create`,
        data: { name },
      });
      console.log(result);
      getAllVehicleType();
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    getAllVehicleCategory();
    getAllVehicleType();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = {
      vehicleName,
      vehicleDescription,
      features: {
        seats: seats,
        luggage: luggage,
        transmission: transmission,
      },
      seats,
      luggage,
      transmission,
      vehicleBrand,
      vehiclePrice,
      vehicleImage,
      vehicleCategory,
      vehicleType,
      numberPlate,
    };
    try {
      const result = await axios({
        url: `${baseURL}/vehicle/create`,
        method: "POST",
        data: formData,
      });
      console.log(result);
    } catch (error) {
      console.log(error.message);
    }
    console.log(formData);
  };

  const onDrop = useCallback(async (acceptedFiles) => {
    let fileData = acceptedFiles[0];
    let data = new FormData();
    data.append("document", fileData);
    try {
      let result = await axios({
        url: `${baseURL}/file/single`,
        method: "POST",
        data: data,
      });
      console.log(result);
      setVehicleImage(result.data.result);
    } catch (error) {
      console.log(error.response?.data?.message || "Something went wrong");
      console.log(error.message);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
  });

  return (
    <form className="m-[30px]" onSubmit={handleSubmit}>
      <section className="flex justify-between">
        <h1 className="font-bold text-2xl flex items-center gap-2">
          <Vehicle />
          Add New Vehicle
        </h1>
        <button
          type="submit"
          className="bg-blue-500 w-[150px] h-[40px] rounded-[20px] text-white cursor-pointer flex items-center justify-center gap-2"
        >
          <Tick />
          Add Vehicle
        </button>
      </section>

      <section className="flex justify-between mt-[20px] gap-5 ">
        <div className="bg-gray-100 w-[60%] rounded-xl p-[30px]">
          <h1 className="font-bold text-xl">General Information</h1>
          <br />
          <label>Vehicle Name</label>
          <br />
          <input
            placeholder="Maruti Suzuki Swift"
            className="bg-gray-200 h-[40px] w-full p-2 rounded-md"
            onChange={(e) => setVehicleName(e.target.value)}
          />
          <br />
          <br />
          <label>Vehicle Description</label>
          <br />
          <textarea
            placeholder="Product Description..."
            className="bg-gray-200 h-[100px] w-full p-2 rounded-md"
            onChange={(e) => setVehicleDescription(e.target.value)}
          />
          <br />
          <br />

          <span className="flex items-center justify-between gap-2">
            <div>
              <p>Seats:</p>
              <input
                type="number"
                className="bg-gray-200 w-[200px] p-[10px] rounded-md"
                placeholder="0"
                onChange={(e) => setSeats(e.target.value)}
              />
            </div>
            <div>
              <p>Luggage:</p>
              <input
                type="number"
                className="bg-gray-200 w-[200px] p-[10px] rounded-md"
                placeholder="0"
                onChange={(e) => setLuggage(e.target.value)}
              />
            </div>
            <div>
              <label className="block mb-1 font-semibold">Transmission:</label>
              <select
                className="bg-gray-200 w-[200px] p-[10px] rounded-md"
                onChange={(e) => setTransmission(e.target.value)}
                value={transmission}
              >
                <option value="" disabled>
                  Select transmission
                </option>
                <option value="manual">Manual</option>
                <option value="automatic">Automatic</option>
              </select>
            </div>
          </span>
          <br />
          <br />
          <span className="flex items-center justify-between gap-2">
            <div>
              <label>Vehicle Brand</label>
              <br />
              <input
                placeholder="Brand"
                className="bg-gray-200 h-[40px] w-[320px] p-2 rounded-md"
                onChange={(e) => setVehicleBrand(e.target.value)}
              ></input>
            </div>
            <div>
              <label>Number Plate</label>
              <br />
              <input
                placeholder="MH312323H"
                className="bg-gray-200 h-[40px] w-[320px] p-2 rounded-md"
                onChange={(e) => setNumberPlate(e.target.value)}
              ></input>
            </div>
          </span>
          <br />

          <h1>Pricing</h1>
          <br />
          <div className="flex items-center justify-between gap-2">
            <span className="flex items-center gap-2">
              <label>Base Price :</label>
              <br />
              <input
                placeholder="0.00"
                className="bg-gray-200 h-[40px] w-[200px] p-2 rounded-md"
                onChange={(e) => setVehiclePrice(e.target.value)}
              />
            </span>

            <span className="flex items-center gap-2">
              <label>Discount Price :</label>
              <br />
              <input
                placeholder="0.00"
                className="bg-gray-200 h-[40px] w-[200px] p-2 rounded-md"
              />
            </span>
          </div>
        </div>

        <div className="w-[40%] bg-gray-100 p-[20px] rounded-xl">
          <h1 className="font-bold text-xl">Upload Image</h1>
          <br />
          <span className="flex justify-center items-center">
            <div
              {...getRootProps()}
              className="bg-gray-200 w-full h-[300px] rounded-lg p-2 mb-4 cursor-pointer flex justify-center items-center"
            >
              <input {...getInputProps()} />
              <div className="w-full rounded-lg flex justify-center items-center h-full">
                {vehicleImage ? (
                  <img
                    src={vehicleImage}
                    className="w-full h-full overflow-hidden"
                  />
                ) : (
                  <GalleryIcon />
                )}
              </div>
            </div>
          </span>

          <br />
          <span className="flex justify-between gap-5">
            <div className="bg-gray-200 p-4 rounded-lg shadow-md w-fit">
              <h2 className="text-lg font-semibold mb-3">Category</h2>

              <label className="block text-sm font-medium mb-1 text-gray-700">
                Vehicle Category
              </label>

              <select
                className="bg-gray-100 w-[170px] p-2.5 rounded-md focus:outline-none mb-4"
                onChange={(e) => setVehicleCategory(e.target.value)}
                value={vehicleCategory}
              >
                <option value="" disabled>
                  Select Category
                </option>
                {vehicleCategories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>

              <button
                className="bg-blue-400 hover:bg-blue-500 text-white font-medium py-2 px-4 rounded-full"
                onClick={(e) => {
                  e.preventDefault();
                  setShowCategoryModal(true);
                }}
              >
                Add New Category
              </button>
            </div>

            <div className="bg-gray-200 p-4 rounded-lg shadow-md w-fit">
              <h2 className="text-lg font-semibold mb-3">Type</h2>

              <label className="block text-sm font-medium mb-1 text-gray-700">
                Vehicle Type
              </label>

              <select
                className="bg-gray-100 w-[170px] p-2.5 rounded-md focus:outline-none mb-4"
                onChange={(e) => setVehicleType(e.target.value)}
                value={vehicleType}
              >
                <option value="" disabled>
                  Select Type
                </option>
                {vehicleTypes.map((type) => (
                  <option key={type.id} value={type.id}>
                    {type.name}
                  </option>
                ))}
              </select>

              <button
                className="bg-blue-400 hover:bg-blue-500 text-white font-medium py-2 px-4 rounded-full"
                onClick={(e) => {
                  e.preventDefault();
                  setShowTypeModal(true);
                }}
              >
                Add New Type
              </button>
            </div>
          </span>
        </div>
      </section>

      {showCategoryModal && (
        <div className="fixed inset-0 bg-transparent bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-[300px]">
            <h2 className="text-xl font-bold mb-4">Add New Category</h2>
            <input
              type="text"
              placeholder="Enter category name"
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value)}
              className="w-full p-2 mb-4 border border-gray-300 rounded-md"
            />
            <div className="flex justify-end gap-2">
              <button
                className="bg-gray-300 px-3 py-1 rounded"
                onClick={() => setShowCategoryModal(false)}
              >
                Cancel
              </button>
              <button
                className="bg-blue-500 text-white px-3 py-1 rounded"
                onClick={() => {
                  // You can call your backend here with axios
                  console.log("New Category:", newCategory);

                  addCategory();
                  setNewCategory("");
                }}
              >
                Add
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Type Modal */}
      {showTypeModal && (
        <div className="fixed inset-0 bg-transparent bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-[300px]">
            <h2 className="text-xl font-bold mb-4">Add New Type</h2>
            <input
              type="text"
              placeholder="Enter type name"
              value={newType}
              onChange={(e) => setNewType(e.target.value)}
              className="w-full p-2 mb-4 border border-gray-300 rounded-md"
            />
            <div className="flex justify-end gap-2">
              <button
                className="bg-gray-300 px-3 py-1 rounded"
                onClick={() => setShowTypeModal(false)}
              >
                Cancel
              </button>
              <button
                className="bg-blue-500 text-white px-3 py-1 rounded"
                onClick={() => {
                  // You can call your backend here with axios
                  console.log("New Type:", newType);
                  setShowTypeModal(false);
                  addType();
                  setNewType("");
                }}
              >
                Add
              </button>
            </div>
          </div>
        </div>
      )}
    </form>
  );
};

export default page;
