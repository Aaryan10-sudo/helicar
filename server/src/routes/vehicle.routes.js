const express = require("express");
const {
  createVehicle,
  getAllVehicle,
  getAllCars,
  getAllJeeps,
  getAllBus,
  getAllHiace,
  getSpecificVehicle,
} = require("../controller/vehicle.controller");
const validateVehicle = require("../validator/vehicle.validate");
const isAuthenticated = require("../middleware/isAuthenticated");
const { isAuthorized } = require("../middleware/isAuthorized");

const router = express.Router();

router.post("/create", createVehicle);
router.get("/get", getAllVehicle);
router.get("/get/cars", getAllCars);
router.get("/get/jeeps", getAllJeeps);
router.get("/get/bus", getAllBus);
router.get("/get/hiace", getAllHiace);
router.get("/get/:id", getSpecificVehicle);

module.exports = router;
