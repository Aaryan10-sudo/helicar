import { createVehicle } from "../services/vehicle.service.js";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const create = asyncHandler(async (req, res) => {
    const vehicle = req.body;
    const newVehicle = await createVehicle(vehicle);
    return res.status(201).json(new ApiResponse("Vehicle created successfully", newVehicle));
    }
);

export {create}