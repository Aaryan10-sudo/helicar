const express = require("express");
const {
  createBooking,
  getAllBooking,
} = require("../controller/booking.controller");
const validateBooking = require("../validator/booking.validate");
const isAuthenticated = require("../middleware/isAuthenticated");
const { isAuthorized } = require("../middleware/isAuthorized");

const router = express.Router();

router.post("/create", validateBooking, createBooking);
router.get("/get", getAllBooking);

module.exports = router;
