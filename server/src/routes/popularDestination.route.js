const express = require("express");
const {
  createPopularDestination,
  getPopularDestinations,
  getPopularDestinationByName,
  deletePopularDestination,
  updatePopularDestination,
} = require("../controller/popularDestination.controller");
const validatePopularDestination = require("../validator/popularDestination.validate");
const isAuthenticated = require("../middleware/isAuthenticated");
const { isAuthorized } = require("../middleware/isAuthorized");

const router = express.Router();

router.post(
  "/create",
  validatePopularDestination,
  isAuthenticated,
  isAuthorized("admin"),
  createPopularDestination
);

router.get("/get", getPopularDestinations);

router.get("/get-by-name", getPopularDestinationByName);

router.put(
  "/update/:id",
  validatePopularDestination,
  isAuthenticated,
  isAuthorized("admin"),
  updatePopularDestination
);

router.delete(
  "/delete/:id",
  isAuthenticated,
  isAuthorized("admin"),
  deletePopularDestination
);

module.exports = router;
