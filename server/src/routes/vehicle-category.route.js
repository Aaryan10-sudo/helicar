const express = require("express");
const {
  createVehicleCategory,
  getAllVehicleCategory,
} = require("../controller/vehicle-category.controller");
const { isAuthorized } = require("../middleware/isAuthorized");
const isAuthenticated = require("../middleware/isAuthenticated");

const router = express.Router();

router.post("/create", createVehicleCategory);
router.get("/get", getAllVehicleCategory);

module.exports = router;
