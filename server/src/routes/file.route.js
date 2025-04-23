const express = require("express");

const { upload } = require("../utils/cloudinary");
const {
  handleSingleFileController,
  handleMultipleFileController,
} = require("../controller/file.controller");

const fileRouter = express.Router();

fileRouter
  .route("/single")
  .post(upload.single("document"), handleSingleFileController);

fileRouter
  .route("/multiple")
  .post(upload.array("document"), handleMultipleFileController);

module.exports = fileRouter;
