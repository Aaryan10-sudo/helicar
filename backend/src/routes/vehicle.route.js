import express from "express";
import { create, getAll, getById, remove, search, update } from "../controllers/vehicle.controller.js";
import { validateVehicle } from "../validators/vehicle.validate.js";
import { upload } from "../middlewares/multer.js";

const router = express.Router();

router.post(
  "/",
  upload.fields([
    {
      name: "vehicleImage",
      maxCount: 1,
    },
  ]),
  validateVehicle,
  create
);
router.get("/search", search);

router.get("/", getAll);
router.get("/:id", getById);
router.patch(
  "/:id",
  upload.fields([
    {
      name: "vehicleImage",
      maxCount: 1,
    },
  ]),
  validateVehicle,
  update
);

router.delete("/:id", remove);

export default router;
