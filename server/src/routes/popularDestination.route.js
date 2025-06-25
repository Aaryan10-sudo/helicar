const express = require("express");
const {
  createPopularDestination,
  getPopularDestinations,
  getPopularDestinationByName,
  deletePopularDestination,
  updatePopularDestination,
} = require("../controller/popularDestination.controller");
const validatePopularDestination = require("../validator/popularDestination.validate");

const router = express.Router();

router.post("/create", validatePopularDestination, createPopularDestination);

router.get("/get", getPopularDestinations);

router.get("/get-by-name", getPopularDestinationByName);

router.put("/update/:id", validatePopularDestination, updatePopularDestination);

router.delete("/delete/:id", deletePopularDestination);

module.exports = router;
