const PopularDestination = require("../../models/popularDestination.model");
const {
  createPopularDestinationService,
  getPopularDestinationsService,
  getPopularDestinationByNameService,
  updatePopularDestinationService,
  deletePopularDestinationService,
} = require("../services/poularDestination.service");

exports.createPopularDestination = async (req, res, next) => {
  const data = req.body;
  try {
    const destination = await createPopularDestinationService(data);
    res.status(201).json({
      success: true,
      message: "Popular destination created successfully",
      data: destination,
    });
  } catch (error) {
    throw new Error(error.message);
  }
};

exports.getPopularDestinations = async (req, res, next) => {
  try {
    const destinations = await getPopularDestinationsService();
    res.status(200).json({
      success: true,
      data: destinations,
    });
  } catch (error) {
    throw new Error(error.message);
  }
};

exports.getPopularDestinationByName = async (req, res, next) => {
  const name = req.query.name;
  try {
    const destination = await getPopularDestinationByNameService(name);
    if (!destination) {
      throw new Error("Popular destination not found");
    }
    res.status(200).json({
      success: true,
      data: destination,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message,
    });
  }
};

exports.updatePopularDestination = async (req, res, next) => {
  const id = req.params.id;
  const data = req.body;
  try {
    const updatedDestination = await updatePopularDestinationService(id, data);
    res.status(200).json({
      success: true,
      message: "Popular destination updated successfully",
      data: updatedDestination,
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

exports.deletePopularDestination = async (req, res, next) => {
  const id = req.params.id;
  try {
    const result = await deletePopularDestinationService(id);
    res.status(200).json({
      success: true,
      message: result.message,
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};
