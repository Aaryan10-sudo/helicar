const {
  createVehicleService,
  getAllVehicleService,
  getAllCarsService,
  getAllJeepsService,
  getAllBusService,
  getAllHiaceService,
  getSpecificVehicleService,
  updateVehicleService,
  deleteVehicleService,
} = require("../services/vehicle.service");

exports.createVehicle = async (req, res, next) => {
  const {
    vehicleName,
    numberPlate,
    vehicleCategory,
    vehicleType,
    features,
    vehicleImage,
    vehicleBrand,
    vehicleDescription,
    vehiclePrice,
  } = req.body;
  console.log(req.body);
  try {
    const result = await createVehicleService({
      vehicleName,
      numberPlate,
      vehicleCategory,
      vehicleType,
      features,
      vehicleImage,
      vehicleBrand,
      vehicleDescription,
      vehiclePrice,
    });
    res.status(201).json({
      success: true,
      message: "Vehicle created successfully",
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.getAllVehicle = async (req, res, next) => {
  try {
    const result = await getAllVehicleService();
    res.status(200).json({
      success: true,
      message: "Vehicle fetched successfully",
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.getAllCars = async (req, res, next) => {
  try {
    const result = await getAllCarsService();
    res.status(200).json({
      success: true,
      message: "Vehicle fetched successfully",
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.getAllJeeps = async (req, res, next) => {
  try {
    const result = await getAllJeepsService();
    res.status(200).json({
      success: true,
      message: "Vehicle fetched successfully",
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.getAllHiace = async (req, res, next) => {
  try {
    const result = await getAllHiaceService();
    res.status(200).json({
      success: true,
      message: "Vehicle fetched successfully",
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.getAllBus = async (req, res, next) => {
  try {
    const result = await getAllBusService();
    res.status(200).json({
      success: true,
      message: "Vehicle fetched successfully",
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.getSpecificVehicle = async (req, res, next) => {
  try {
    const result = await getSpecificVehicleService(req.params.id);
    res.status(200).json({
      success: true,
      data: result,
      message: "Specific Vehicle Fetched Successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.updateVehicleController = async (req, res) => {
  const { id } = req.params;
  const updateData = req.body;

  try {
    const updatedVehicle = await updateVehicleService(id, updateData);

    if (!updatedVehicle) {
      return res.status(404).json({ message: "Vehicle not found" });
    }

    res.status(200).json({
      message: "Vehicle updated successfully",
      data: updatedVehicle,
    });
  } catch (error) {
    console.error("Error in updateVehicleController:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.deleteVehicle = async (req, res, next) => {
  const id = req.query.id;
  try {
    const result = await deleteVehicleService(id);
    res.status(200).json({
      success: true,
      message: "Vehicle deleted successfully",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};
