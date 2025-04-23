const {
  createVehicleCategoryService,
  getAllVehicleCategoryService,
} = require("../services/vehicle-category.service");

exports.createVehicleCategory = async (req, res, next) => {
  try {
    const result = await createVehicleCategoryService({ name: req.body.name });
    res.status(201).json({
      success: true,
      message: "Vehicle category created successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.getAllVehicleCategory = async (req, res, next) => {
  try {
    const result = await getAllVehicleCategoryService();
    res.status(200).json({
      success: true,
      message: "Vehicle fetched successfully",
      data: result,
    });
  } catch (error) {}
};
