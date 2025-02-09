import {
  createVehicle,
  deleteVehicle,
  getVehicleById,
  getVehicles,
  updateVehicle,
} from "../services/vehicle.service.js";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { uploadOnCloudinary } from "../services/cloudinary.service.js";

const create = asyncHandler(async (req, res) => {
  const vehicle = req.body;
  let vehicleImage;

  const vehicleImgLocalPath = req.files?.vehicleImage?.[0]?.path;

  if (vehicleImgLocalPath) {
    try {
      vehicleImage = await uploadOnCloudinary(vehicleImgLocalPath);
      if (!vehicleImage) {
        throw new Error("Failed to upload user image");
      }
    } catch (error) {
      throw new ApiError(
        500,
        "Something went wrong while uploading user image"
      );
    }
  }

  if (vehicleImage) {
    vehicle.imageUrl = vehicleImage.url;
  }
  const newVehicle = await createVehicle(vehicle);
  return res
    .status(201)
    .json(new ApiResponse("Vehicle created successfully", newVehicle));
});

const getAll = asyncHandler(async (req, res) => {
  const { page = 1, limit = 10 } = req.query;
  const {vehicles,totalPages} = await getVehicles({ page, limit });
  if (!vehicles.length) {
    throw new ApiError(404, "No vehicles found");
  }
  return res.status(200).json(new ApiResponse("Vehicles found", {vehicles,totalPages}));
});

const getById = asyncHandler(async (req, res) => {
  const vehicle = await getVehicleById(req.params.id);
  if (!vehicle) {
    throw new ApiError(404, "Vehicle not found");
  }
  return res.status(200).json(new ApiResponse("Vehicle found", vehicle));
});

const update = asyncHandler(async (req, res) => {
  const vehicleExists = await getVehicleById(req.params.id);
  const updateData = req.body;
  if (!vehicleExists) {
    throw new ApiError(404, "Vehicle not found");
  }
  let vehicleImage;

  const vehicleImgLocalPath = req.files?.vehicleImage?.[0]?.path;

  if (vehicleImgLocalPath) {
    try {
      vehicleImage = await uploadOnCloudinary(vehicleImgLocalPath);
      if (!vehicleImage) {
        throw new Error("Failed to upload user image");
      }
    } catch (error) {
      throw new ApiError(
        500,
        "Something went wrong while uploading user image"
      );
    }
  }

  if (vehicleImage) {
    updateData.imageUrl = vehicleImage.url;
  }
  const vehicle = await updateVehicle(req.params.id, updateData);
  if (!vehicle) {
    throw new ApiError(500, "Unable to update vehicle");
  }
  return res.status(200).json(new ApiResponse("Vehicle updated", vehicle));
});

const remove = asyncHandler(async (req, res) => {
  const vehicle = await getVehicleById(req.params.id);
  if (!vehicle) {
    throw new ApiError(404, "Vehicle not found");
  }
  await deleteVehicle(req.params.id);
  return res.status(204).json(new ApiResponse("Vehicle deleted"));
});

const search = asyncHandler(async (req, res) => {
    const { name, type, minPrice, maxPrice, season, transmission, capacity, page = 1, limit = 10 } = req.query;
    console.log(name, type, minPrice, maxPrice, season, transmission, capacity, page, limit);
    const {vehicles,totalPages} = await getVehicles({ name, type, minPrice, maxPrice, season, transmission, capacity, page , limit } );
    if (!vehicles) {
      throw new ApiError(404, "No vehicles found matching the keyword");
    }
    return res.status(200).json(new ApiResponse("Vehicles found", {vehicles,totalPages}));
  });

export { create, getAll, getById, update, remove, search };
