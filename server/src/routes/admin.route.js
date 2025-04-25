const express = require("express");
const {
  createAdmin,
  loginAdmin,
  logoutAdmin,
  getAllAdmins,
  changePassword,
  deleteAdmin,
} = require("../controller/admin.controller");
const isAuthenticated = require("../middleware/isAuthenticated");
const { isAuthorized } = require("../middleware/isAuthorized");

const router = express.Router();

router.post("/create", isAuthenticated, isAuthorized("admin"), createAdmin);
router.get("/getAll", isAuthenticated, isAuthorized("admin"), getAllAdmins);
router.post("/login", loginAdmin);
router.put("/logout", logoutAdmin);
router.patch("/reset-password", isAuthenticated, changePassword);
router.delete("/delete", isAuthenticated, isAuthorized("admin"), deleteAdmin);

module.exports = router;
