import { asyncHandler } from "../utils/asyncHandler.js";
import { createRating, deleteRating, getRatingByVehicleId } from "../services/rating.service.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";

const create = asyncHandler(async (req, res) => {
    const rating = req.body;
    const newRating = await createRating(rating);
    return res.status(201).json(new ApiResponse("Rating created successfully", newRating));
});

const getVehicleRatingById = asyncHandler(async (req, res) => {
    const { vehicleId } = req.params;
    const { page = 1, limit = 10 } = req.query;
    const {ratings,totalCount} = await getRatingByVehicleId({ vehicleId, page, limit });
    if (!ratings) {
        throw new ApiError(404, "Ratings not found");
    }
    return res.status(200).json(new ApiResponse("Ratings retrieved successfully", {ratings,totalCount,page}));
});

const remove = asyncHandler(async (req, res) => {
    const { ratingId } = req.params;
    const rating = await deleteRating(ratingId);
    if (!rating) {
        throw new ApiError(404, "Rating not found");
    }
    return res.status(204).json(new ApiResponse("Rating deleted successfully", rating));
});



export { create, getVehicleRatingById,remove };