const express = require("express");
const {
  createVehicleType,
  getAllVehicleType,
} = require("../controller/vehicle-type.controller");
const { isAuthorized } = require("../middleware/isAuthorized");
const isAuthenticated = require("../middleware/isAuthenticated");

const router = express.Router();

router.post("/create", createVehicleType);
router.get("/get", getAllVehicleType);

module.exports = router;
