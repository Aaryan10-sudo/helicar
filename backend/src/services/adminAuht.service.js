import Admin from "../models/admin.model.js";

// Create and Save a new Admin
const createAdmin = async (admin) => {
  try {
    return await Admin.create(admin);
  } catch (error) {
    throw error;
  }
};
