const Admin = require("../models/admin/admin.model");

exports.isAuthorized = (roles) => {
  return async (req, res, next) => {
    try {
      let id = req._id;
      let result = await Admin.findByPk(id);
      let tokenRole = result.role;
      if (roles.includes(tokenRole)) {
        next();
      } else {
        res.status(403).json({
          success: false,
          message: "User not authorized",
          error: "You don't have permission to access this resource",
        });
      }
    } catch (error) {
      res.status(403).json({
        success: false,
        message: "User not authorized",
        error: error.message,
      });
    }
  };
};
