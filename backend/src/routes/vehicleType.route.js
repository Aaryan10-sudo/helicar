import express from 'express';
import { create, getAll, remove, update } from '../controllers/vehicleType.controller.js';
import { validateVehicleType } from '../validators/vehicleType.validate.js';


const router = express.Router();

router.post("/",validateVehicleType,create);
router.get("/",getAll);
router.put("/:vehicleTypeId",update);
router.delete("/:vehicleTypeId",remove);

export default router;
