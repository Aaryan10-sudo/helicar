import Admin from '../models/admin.model';
import { asyncHandler } from '../utils/asyncHandler';
import bcrypt from 'bcrypt';

const adminRegister = asyncHandler(async (req, res) => {
  const input = req.body;

  // Check if admin already exists
  const adminExists = await Admin.findOne({ email: input.email });

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
  })
});

export { adminRegister };
