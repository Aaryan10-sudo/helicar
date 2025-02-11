import express from 'express';
import { validateAdminRegister } from '../validators/admin.validate';
import { adminRegister } from '../controllers/adminAuth.controller';

const router = express.Router();

router.post("/register", validateAdminRegister, adminRegister)