import { sendMail } from '../lib/email/sendEmail.js';
import { forgotPasswordEmailTemplate } from '../lib/email/templates/forgotPassword.template.js';
import Admin from '../models/admin.model.js';
import {
  getAdminByEmailService,
  getAdminByIdService,
  getAdminByResetToken,
} from '../services/adminAuth.service.js';
import { uploadOnCloudinary } from '../services/cloudinary.service.js';
import { ApiError } from '../utils/ApiError.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';

const adminRegister = asyncHandler(async (req, res) => {
  const input = req.body;
  let adminImage;

  const adminImgLocalPath = req.files?.profileImage?.[0]?.path;

  if (adminImgLocalPath) {
    try {
      adminImage = await uploadOnCloudinary(adminImgLocalPath);
      if (!adminImage) {
        throw new Error('Failed to upload admin image');
      }
    } catch {
      throw new ApiError(
        500,
        'Something went wrong while uploading admin image'
      );
    }
  }

  console.log(adminImage);

  // Check if admin already exists
  const adminExists = await getAdminByEmailService(input.email);

  if (adminExists) {
    return res.status(400).json({
      success: false,
      message: 'Admin already exists',
    });
  }

  const hashedPassword = await bcrypt.hashSync(input.password, 10);

  const admin = new Admin({
    ...input,
    password: hashedPassword,
    profileImage: adminImage?.secure_url,
  });

  await admin.save();

  admin.password = undefined;

  return res.status(201).json({
    success: true,
    message: 'Admin created successfully',
    data: admin,
  });
});

const adminLogin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const admin = await getAdminByEmailService(email);

  if (!admin) {
    return res.status(404).json({
      success: false,
      message: 'Admin not found',
    });
  }

  // Compare password
  const passwordMatch = bcrypt.compareSync(password, admin?.password);
  if (email !== admin.email || !passwordMatch) {
    return res.status(401).json({
      success: false,
      message: 'Email/Password does not match',
    });
  }

  // Generate JWT Token
  console.log(admin);

  const accessToken = admin.generateAccessToken();
  const refreshToken = admin.generateRefreshToken();

  admin.refreshToken = refreshToken;
  await admin.save();

  return res.status(200).json({
    success: true,
    message: 'Admin logged in successfully',
    data: {
      accessToken,
      refreshToken,
    },
  });
});

const adminLogOut = asyncHandler(async (req, res) => {
  const adminId = req.admin._id;

  const admin = await getAdminByIdService(adminId);

  if (!admin) {
    return res.status(404).json({
      success: false,
      message: 'Admin not found',
    });
  }

  admin.refreshToken = null;

  await admin.save();

  return res.status(200).json({
    success: true,
    message: 'Admin logged out successfully',
  });
});

// Forgot Password Email Send
const forgotPassword = asyncHandler(async (req, res) => {
  try {
    const { email } = req.body;

    const admin = await getAdminByEmailService(email);

    if (!admin) {
      return res.status(404).json({
        success: false,
        message: 'Admin not found',
      });
    }

    // Generate JWT Token
    const resetToken = uuidv4();

    // Update resetToken in DB
    admin.resetToken = resetToken;

    await admin.save();

    // Send Email
    sendMail({
      to: email,
      subject: 'Reset Password',
      html: forgotPasswordEmailTemplate(admin.name, resetToken),
    });

    return res
      .status(200)
      .json(new ApiResponse('Reset password email sent', email));
  } catch (error) {
    throw new ApiError(500, error.message);
  }
});

const resetPassword = asyncHandler(async (req, res) => {
  const { password, token } = req.body;

  if (!password || !token) {
    return res.status(400).json({
      success: false,
      message: 'Password and token are required',
    });
  }

  // Validate new password
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;

  if (!passwordRegex.test(password)) {
    throw new ApiError(
      400,
      'Password must contain at least 6 characters, including uppercase, lowercase, number, and special character'
    );
  }

  // Find admin with reset token
  const admin = await getAdminByResetToken(token);

  if (!admin) {
    return res.status(404).json({
      success: false,
      message: 'Admin not found',
    });
  }

  // Hash password
  const hashedPassword = await bcrypt.hashSync(password, 10);

  // Update password and remove reset token
  admin.password = hashedPassword;
  admin.resetToken = null;

  await admin.save();

  return res.status(200).json({
    success: true,
    message: 'Password reset successfully',
  });
});

export {
  adminRegister,
  adminLogin,
  adminLogOut,
  forgotPassword,
  resetPassword,
};
