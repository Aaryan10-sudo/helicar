const express = require("express");
const {
  createBooking,
  getAllBooking,
  verifyBooking,
} = require("../controller/booking.controller");
const validateBooking = require("../validator/booking.validate");
const isAuthenticated = require("../middleware/isAuthenticated");
const { isAuthorized } = require("../middleware/isAuthorized");

const router = express.Router();

router.post("/create", validateBooking, createBooking);
router.put("/verify", verifyBooking);
router.get("/get", getAllBooking);

module.exports = router;
