import Admin from '../models/admin.model.js';
import { ApiError } from '../utils/ApiError.js';

const getAdminByEmailService = async (email) => {
  return await Admin.findOne({ email });
};

const getAdminByIdService = async (id) => {
  return await Admin.findById(id);
};

const getAdminByResetToken = async (token) => {
  try {
    return await Admin.findOne({ resetToken: token });
  } catch (error) {
    throw new ApiError(500, error.message);
  }
};

export { getAdminByEmailService, getAdminByIdService, getAdminByResetToken };
