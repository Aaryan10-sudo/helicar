import { ApiError } from '../utils/ApiError.js';
import jwt from 'jsonwebtoken';
import { asyncHandler } from '../utils/asyncHandler.js';
import { ACCESS_TOKEN_SECRET } from '../config/env.js';
import Admin from '../models/admin.model.js';

const verifyJWT = asyncHandler(async (req, res, next) => {
  try {
    const token =
      req.cookies?.accessToken ||
      req.header('Authorization')?.replace('Bearer ', '');

    if (!token) {
      throw new ApiError(401, 'Unauthorized request');
    }

    const decodedToken = jwt.verify(token, ACCESS_TOKEN_SECRET);

    const admin = await Admin.findById(decodedToken._id, {
      attributes: { exclude: ['password', 'refreshToken'] },
    });

    if (!admin) {
      throw new ApiError(401, 'Invalid Access Token');
    }

    req.admin = admin;
    next();
  } catch (error) {
    throw new ApiError(401, error?.message || 'Unauthorized request');
  }
});

export { verifyJWT };
