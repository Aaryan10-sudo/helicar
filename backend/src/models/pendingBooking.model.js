import mongoose from "mongoose";

const pendingBookingSchema = new mongoose.Schema({
    user: {
      fullName: String,
      email: String,
      phone: String,
    },
    vehicle: mongoose.Schema.Types.ObjectId,
    pickup: {
      address: String,
      date: String,
      time: String,
    },
    dropoff: {
      address: String,
      date: String,
      time: String,
    },
    message: String,
    isVerified: { type: Boolean, default: false },
    verificationToken: String,
    expiresAt: { type: Date, default: () => new Date(Date.now() + 24 * 60 * 60 * 1000), index: { expires: 0 } },
  });

const PendingBooking = mongoose.model("PendingBooking", pendingBookingSchema);
export default PendingBooking;
  