import mongoose, { Schema } from 'mongoose';

const adminSchenma = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
    },
    role: {
      type: Schema.Types.ObjectId,
      ref: 'Role',
      required: [true, 'Role is required'],
    },
  },
  {
    timestamps: true,
  }
);

const Admin = mongoose.model('Admin', adminSchenma);

export default Admin;
