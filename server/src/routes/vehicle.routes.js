const express = require("express");
const {
  createVehicle,
  getAllVehicle,
  getAllCars,
  getAllJeeps,
  getAllBus,
  getAllHiace,
  getSpecificVehicle,
  updateVehicleController,
  deleteVehicle,
} = require("../controller/vehicle.controller");
const validateVehicle = require("../validator/vehicle.validate");
const isAuthenticated = require("../middleware/isAuthenticated");
const { isAuthorized } = require("../middleware/isAuthorized");

const router = express.Router();

router.post(
  "/create",
  validateVehicle,
  isAuthenticated,
  isAuthorized(["admin"]),
  createVehicle
);
router.get("/get", getAllVehicle);
router.get("/get/cars", getAllCars);
router.get("/get/jeeps", getAllJeeps);
router.get("/get/bus", getAllBus);
router.get("/get/hiace", getAllHiace);
router.get("/get/:id", getSpecificVehicle);
router.put(
  "/update/:id",
  isAuthenticated,
  isAuthorized(["admin"]),
  updateVehicleController
);
router.delete("/delete", isAuthenticated, isAuthorized("admin"), deleteVehicle);

module.exports = router;
