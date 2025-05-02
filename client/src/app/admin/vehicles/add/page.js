"use client";
import { baseURL } from "@/config/config";
import GalleryIcon from "@/ui/GalleryIcon";
import Loader from "@/ui/Loader";
import Tick from "@/ui/Tick";
import Vehicle from "@/ui/Vehicle";
import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { toast, ToastContainer } from "react-toastify";

const AddVehiclePage = () => {
  const [formData, setFormData] = useState({
    vehicleName: "",
    vehicleDescription: "",
    features: {
      seats: "",
      luggage: "",
      transmission: "",
    },
    vehicleBrand: "",
    vehiclePrice: "",
    vehicleImage: "",
    vehicleCategory: "",
    vehicleType: "",
    numberPlate: "",
  });

  const [vehicleCategories, setVehicleCategories] = useState([]);
  const [vehicleTypes, setVehicleTypes] = useState([]);
  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const [showTypeModal, setShowTypeModal] = useState(false);
  const [newCategory, setNewCategory] = useState("");
  const [newType, setNewType] = useState("");
  const [loader, setLoader] = useState(false);

  const getAllVehicleCategory = async () => {
    try {
      const result = await axios.get(`${baseURL}/vehicle-category/get`);
      setVehicleCategories(result.data.data);
    } catch (error) {
      console.log(error.message);
    }
  };

  const getAllVehicleType = async () => {
    try {
      const result = await axios.get(`${baseURL}/vehicle-type/get`);
      setVehicleTypes(result.data.data);
      getAllVehicleCategory();
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (["seats", "luggage", "transmission"].includes(name)) {
      setFormData((prev) => ({
        ...prev,
        features: {
          ...prev.features,
          [name]: value,
        },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const addCategory = async () => {
    try {
      await axios.post(`${baseURL}/vehicle-category/create`, {
        name: newCategory,
      });
      setShowCategoryModal(false);
      setNewCategory("");
      await getAllVehicleCategory();
      toast.success("Category added!");
    } catch (error) {
      toast.error("Failed to add category");
    }
  };

  const addType = async () => {
    try {
      await axios.post(`${baseURL}/vehicle-type/create`, { name: newType });
      setShowTypeModal(false);
      setNewType("");
      await getAllVehicleType();
      toast.success("Type added!");
    } catch (error) {
      toast.error("Failed to add type");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoader(true);
      const result = await axios.post(`${baseURL}/vehicle/create`, formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      setFormData({
        vehicleName: "",
        vehicleDescription: "",
        features: {
          seats: "",
          luggage: "",
          transmission: "",
        },
        vehicleBrand: "",
        vehiclePrice: "",
        vehicleImage: "",
        vehicleCategory: "",
        vehicleType: "",
        numberPlate: "",
      });

      setLoader(false);
      toast.success("Vehicle added successfully");
    } catch (error) {
      setLoader(false);
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Unable to connect to the server");
      }
    }
  };

  const onDrop = useCallback(async (acceptedFiles) => {
    let fileData = acceptedFiles[0];
    let data = new FormData();
    data.append("document", fileData);
    try {
      let result = await axios.post(`${baseURL}/file/single`, data);
      setFormData((prev) => ({
        ...prev,
        vehicleImage: result.data.result,
      }));
    } catch (error) {
      console.log(error.response?.data?.message || "Something went wrong");
    }
  }, []);

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  useEffect(() => {
    getAllVehicleCategory();
    getAllVehicleType();
  }, []);

  return (
    <form className="m-[30px]" onSubmit={handleSubmit}>
      <ToastContainer />
      <section className="flex justify-between">
        <h1 className="font-bold text-2xl flex items-center gap-2">
          <Vehicle />
          Add New Vehicle
        </h1>
        <button
          type="submit"
          className="bg-blue-500 w-[150px] h-[40px] rounded-[20px] text-white cursor-pointer flex items-center justify-center gap-2"
        >
          {loader ? (
            <Loader />
          ) : (
            <>
              <Tick /> Add Vehicle
            </>
          )}
        </button>
      </section>

      <section className="flex justify-between mt-[20px] gap-5 ">
        <div className="bg-gray-100 w-[60%] rounded-xl p-[30px]">
          <h1 className="font-bold text-xl">General Information</h1>
          <br />
          <label>Vehicle Name</label>
          <br />
          <input
            name="vehicleName"
            placeholder="Maruti Suzuki Swift"
            className="bg-gray-200 h-[40px] w-full p-2 rounded-md"
            value={formData.vehicleName}
            onChange={handleChange}
          />
          <br />
          <br />
          <label>Vehicle Description</label>
          <br />
          <textarea
            name="vehicleDescription"
            placeholder="Product Description..."
            className="bg-gray-200 h-[100px] w-full p-2 rounded-md"
            value={formData.vehicleDescription}
            onChange={handleChange}
          />
          <br />
          <br />

          <span className="flex items-center justify-between gap-2">
            <div>
              <p>Seats:</p>
              <input
                name="seats"
                type="number"
                className="bg-gray-200 w-[200px] p-[10px] rounded-md"
                placeholder="0"
                value={formData.features.seats}
                onChange={handleChange}
              />
            </div>
            <div>
              <p>Luggage:</p>
              <input
                name="luggage"
                className="bg-gray-200 w-[200px] p-[10px] rounded-md"
                placeholder="0"
                value={formData.features.luggage}
                onChange={handleChange}
              />
            </div>
            <div>
              <label className="block mb-1 font-semibold">Transmission:</label>
              <select
                name="transmission"
                className="bg-gray-200 w-[200px] p-[10px] rounded-md"
                value={formData.features.transmission}
                onChange={handleChange}
              >
                <option value="" disabled>
                  Select transmission
                </option>
                <option value="Manual">Manual</option>
                <option value="Automatic">Automatic</option>
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
                name="vehicleBrand"
                placeholder="Brand"
                className="bg-gray-200 h-[40px] w-[320px] p-2 rounded-md"
                value={formData.vehicleBrand}
                onChange={handleChange}
              ></input>
            </div>
            <div>
              <label>Number Plate</label>
              <br />
              <input
                name="numberPlate"
                placeholder="MH312323H"
                className="bg-gray-200 h-[40px] w-[320px] p-2 rounded-md"
                value={formData.numberPlate}
                onChange={handleChange}
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
                name="vehiclePrice"
                placeholder="0.00"
                className="bg-gray-200 h-[40px] w-[200px] p-2 rounded-md"
                value={formData.vehiclePrice}
                onChange={handleChange}
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
                {formData.vehicleImage ? (
                  <img
                    src={formData.vehicleImage}
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
                name="vehicleCategory"
                className="bg-gray-100 w-[170px] p-2.5 rounded-md focus:outline-none mb-4"
                onChange={handleChange}
                value={formData.vehicleCategory}
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
                name="vehicleType"
                className="bg-gray-100 w-[170px] p-2.5 rounded-md focus:outline-none mb-4"
                onChange={handleChange}
                value={formData.vehicleType}
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

      {/* Add New Category Modal */}
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
                type="button"
                className="bg-gray-300 px-3 py-1 rounded"
                onClick={() => setShowCategoryModal(false)}
              >
                Cancel
              </button>
              <button
                type="button"
                className="bg-blue-500 text-white px-3 py-1 rounded"
                onClick={addCategory}
              >
                Add
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add New Type Modal */}
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
                type="button"
                className="bg-gray-300 px-3 py-1 rounded"
                onClick={() => setShowTypeModal(false)}
              >
                Cancel
              </button>
              <button
                type="button"
                className="bg-blue-500 text-white px-3 py-1 rounded"
                onClick={addType}
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

export default AddVehiclePage;
