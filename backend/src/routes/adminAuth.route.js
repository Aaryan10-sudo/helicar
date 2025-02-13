import express from 'express';
import {
  validateAdminLogin,
  validateAdminRegister,
  validateForgotPassword,
} from '../validators/admin.validate.js';
import {
  adminLogin,
  adminLogOut,
  adminRegister,
  forgotPassword,
  resetPassword,
} from '../controllers/adminAuth.controller.js';
import { upload } from '../middlewares/multer.js';
import { verifyJWT } from '../middlewares/verifyJWT.js';

const router = express.Router();

router.post(
  '/register',
  upload.fields([
    {
      name: 'profileImage',
      maxCount: 1,
    },
  ]),
  validateAdminRegister,
  adminRegister
);

router.post('/login', validateAdminLogin, adminLogin);
router.post('/logout', verifyJWT, adminLogOut);
router.post('/forgot-password', validateForgotPassword, forgotPassword);
router.post('/reset-password', resetPassword);

export default router;
