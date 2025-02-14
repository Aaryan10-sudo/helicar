import VehicleType from "../models/vehicleType.model.js";

const createVehicleType = async (vehicle) => {
  try {
    return await VehicleType.create(vehicle);
  } catch (error) {
    throw error;
  }
};

const getAllVehicleType = async () => {
  try {
    return await VehicleType.find({});
  } catch (error) {
    throw error;
  }
};

const getVehicleTypeById = async (vehicleId) => {
  try {
    return await VehicleType.findById(vehicleId);
  } catch (error) {
    throw error;
  }
};
const getVehicleTypeByQuery = async (query) => {
  try {
    return await VehicleType.find({name:query});
  } catch (error) {
    throw error;
  }
};



const updateVehicleType = async ({ vehicleTypeId, vehicleDetails }) => {
  try {
    return await VehicleType.findByIdAndUpdate(vehicleTypeId, { vehicleDetails });
  } catch (error) {
    throw error;
  }
};

const deleteVehicleType = async (vehicleTypeId) => {
    try {
        return await VehicleType.findByIdAndDelete(vehicleTypeId);
    } catch (error) {
        throw error;
        
    }
}
export { createVehicleType, getAllVehicleType, getVehicleTypeById, updateVehicleType ,getVehicleTypeByQuery, deleteVehicleType};
