import Rating from "../models/rating.model.js";

// Create and Save a new Rating

const createRating = async (rating) => {
  try {
    return await Rating.create(rating);
  } catch (err) {
    throw err;
  }
};

const getRatingByVehicleId = async ({ vehicleId, page, limit }) => {
  try {
    const totalCount = await Rating.countDocuments({ vehicle: vehicleId });
    const ratings = await Rating.find({ vehicle: vehicleId })
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .exec();

    return { ratings, totalCount };
  } catch (error) {
    throw error;
  }
};

const deleteRating = async (ratingId) => {
  try {
    return await Rating.findByIdAndDelete(ratingId);
  } catch (error) {
    throw error;
  }
};

export { createRating, getRatingByVehicleId, deleteRating };
