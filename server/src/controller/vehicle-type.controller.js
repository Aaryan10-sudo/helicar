const {
  createVehicleTypeService,
  getAllVehicleTypeService,
} = require("../services/vehicle-type.service");

exports.createVehicleType = async (req, res, next) => {
  try {
    const result = await createVehicleTypeService({ name: req.body.name });
    res.status(201).json({
      success: true,
      message: "Vehicle Type created successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.getAllVehicleType = async (req, res, next) => {
  try {
    const result = await getAllVehicleTypeService();
    res.status(200).json({
      success: true,
      message: "Vehicle fetched successfully",
      data: result,
    });
  } catch (error) {}
};
