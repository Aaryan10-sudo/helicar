import express from 'express';
import { validateRating } from '../validators/rating.validate.js';
import { create, getVehicleRatingById, remove } from '../controllers/rating.controller.js';

const router = express.Router();

router.post("/",validateRating,create);
router.get("/:vehicleId",getVehicleRatingById);
router.delete("/:ratingId",remove);

export default router;