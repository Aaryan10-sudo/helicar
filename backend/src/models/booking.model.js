import mongoose from "mongoose";

const BookingSchema = new mongoose.Schema({
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
  status: {
    type: String,
    enum: ["pending", "confirmed", "cancelled", "completed"],
    default: "pending",
  },
  dropoff: {
    address: String,
    date: String,
    time: String,
  },
  message: String,
  verificationToken: String,
});

const Booking = mongoose.model("Booking", BookingSchema);
export default Booking;
