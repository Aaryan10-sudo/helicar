const express = require("express");
const {
  createEnquiry,
  getAllEnquiry,
  deleteEnquiry,
} = require("../controller/enquiry.controller");
const isAuthenticated = require("../middleware/isAuthenticated");
const { isAuthorized } = require("../middleware/isAuthorized");
const validateEnquiry = require("../validator/enquiry.validate");

const router = express.Router();

router.post("/create", validateEnquiry, createEnquiry);
router.get("/get", isAuthenticated, isAuthorized(["admin"]), getAllEnquiry);
router.delete(
  "/delete",
  isAuthenticated,
  isAuthorized(["admin"]),
  deleteEnquiry
);

module.exports = router;
