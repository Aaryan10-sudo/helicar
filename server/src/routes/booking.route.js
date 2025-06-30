const express = require("express");
const {
  createBooking,
  getAllBooking,
  verifyBooking,
  getBookingById,
  updateBooking,
} = require("../controller/booking.controller");
const validateBooking = require("../validator/booking.validate");
const isAuthenticated = require("../middleware/isAuthenticated");
const { isAuthorized } = require("../middleware/isAuthorized");

const router = express.Router();

router.post("/create", validateBooking, createBooking);
router.put("/verify", verifyBooking);
router.get("/get", isAuthenticated, isAuthorized("admin"), getAllBooking);
router.get("/get/:id", isAuthenticated, isAuthorized("admin"), getBookingById);
router.put(
  "/update/:id",
  isAuthenticated,
  isAuthorized("admin"),
  updateBooking
);
module.exports = router;
