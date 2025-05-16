const VehicleCategory = require("../../models/vehicle-category.model");
const VehicleType = require("../../models/vehicle-type.model");
const Vehicle = require("../../models/vehicle.model");

async function createVehicleService(vehicleData) {
  try {
    const { numberPlate } = vehicleData;
    const existingVehicle = await Vehicle.findOne({ where: { numberPlate } });
    if (existingVehicle) {
      throw new Error("Vehicle with this number plate already exists");
    }
    return await Vehicle.create(vehicleData);
  } catch (error) {
    throw new Error("Error creating vehicle: " + error.message);
  }
}

async function getAllVehicleService() {
  try {
    const vehicles = await Vehicle.findAll({
      include: [
        {
          model: VehicleCategory,
          attributes: ["name"],
          as: "category",
        },
        {
          model: VehicleType,
          attributes: ["name"],
          as: "type",
        },
      ],
    });
    return vehicles;
  } catch (error) {
    throw new Error(error.message);
  }
}

async function getAllCarsService() {
  try {
    const allVehicles = await getAllVehicleService();
    const cars = allVehicles.filter(
      (vehicle) => vehicle.type?.name?.toLowerCase() === "car"
    );
    return cars;
  } catch (error) {
    throw new Error(error.message);
  }
}

async function getAllJeepsService() {
  try {
    const allVehicles = await getAllVehicleService();
    const jeeps = allVehicles.filter(
      (vehicle) => vehicle.type?.name?.toLowerCase() === "jeep"
    );
    return jeeps;
  } catch (error) {
    throw new Error(error.message);
  }
}

async function getAllHiaceService() {
  try {
    const allVehicles = await getAllVehicleService();
    const hiace = allVehicles.filter(
      (vehicle) => vehicle.type?.name?.toLowerCase() === "hiace"
    );
    return hiace;
  } catch (error) {
    throw new Error(error.message);
  }
}

async function getAllBusService() {
  try {
    const allVehicles = await getAllVehicleService();
    const bus = allVehicles.filter(
      (vehicle) => vehicle.type?.name?.toLowerCase() === "bus"
    );
    return bus;
  } catch (error) {
    throw new Error(error.message);
  }
}

async function getSpecificVehicleService(id) {
  try {
    const result = await Vehicle.findByPk(id);
    console.log(result);

    return result;
  } catch (error) {
    throw new Error(error.message);
  }
}

async function updateVehicleService(id, updateData) {
  try {
    const [rowsUpdated, [updatedVehicle]] = await Vehicle.update(updateData, {
      where: { id },
      returning: true,
    });

    return updatedVehicle;
  } catch (error) {
    console.error("Error updating vehicle:", error.message);
    throw error;
  }
}

async function deleteVehicleService(id) {
  try {
    const result = await Vehicle.destroy({
      where: { id },
    });
    return result;
  } catch (error) {
    throw new Error(error.message);
  }
}

module.exports = {
  createVehicleService,
  getAllVehicleService,
  getAllCarsService,
  getAllJeepsService,
  getAllHiaceService,
  getAllBusService,
  getSpecificVehicleService,
  updateVehicleService,
  deleteVehicleService,
};
