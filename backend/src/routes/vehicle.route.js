import express from 'express';
import { create } from '../controllers/vehicle.controller.js';
import { validateVehicle } from '../validators/vehicle.validate.js';

const router = express.Router();

router.post("/",validateVehicle,create)



export default router;