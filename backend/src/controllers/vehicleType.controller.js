import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { createVehicleType, getVehicleTypeByQuery, deleteVehicleType, getAllVehicleType, updateVehicleType } from "../services/vehicleType.service.js";

const create = asyncHandler(async (req, res) => {
    const vehicleType = req.body;
    const existVehicleType = await getVehicleTypeByQuery(vehicleType.name);
    if(existVehicleType.length>0){
        throw new ApiError("400","Vehicle type with this name already exist");
    }
    const newVehicleType = await createVehicleType(vehicleType);
    return res.status(201).json(new ApiResponse("Vehicle type created successfully", newVehicleType));
});

const getAll = asyncHandler(async (req, res) => {
    const vehicleTypes = await getAllVehicleType();
    if (!vehicleTypes || vehicleTypes.length === 0) {
        throw new ApiError(404, "Vehicle types do not exist");
    }
    return res.status(200).json(new ApiResponse("Vehicle type details ", vehicleTypes));
});

const update = asyncHandler(async(req,res)=>{
    const vehicleTypeId = req.params.vehicleTypeId;
    const vehicleDetails = req.body;
    const updatedVehicleType = await updateVehicleType({vehicleTypeId, vehicleDetails});
    if (!updatedVehicleType) {
        throw new ApiError(404, "Vehicle type not found");
    }
    return res.status(200).json(new ApiResponse("Vehicle type updated successfully", updatedVehicleType));
});

const remove = asyncHandler(async(req,res)=>{
    const vehicleTypeId = req.params.vehicleTypeId;
    const deletedVehicleType = await deleteVehicleType(vehicleTypeId);
    if (!deletedVehicleType) {
        throw new ApiError(404, "Vehicle type not found");
    }
    return res.status(204).json(new ApiResponse("Vehicle type deleted successfully"));
})

export { create, getAll, update, remove }