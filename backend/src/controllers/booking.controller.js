import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import {
  changeStatus,
  createBooking,
  createPendingBooking,
  deleteBooking,
  getAllBookings,
  getBookingById,
  getBookingByVerificationToken,
} from "../services/booking.service.js";
import { generateRandomToken } from "../lib/helpers/booking.helper.js";
import { sendMail } from "../lib/email/sendEmail.js";
import { verifyBooking } from "../lib/email/templates/verifyBooking.template.js";
import mongoose from "mongoose";

const create = asyncHandler(async (req, res) => {
  const booking = req.body;
  const token = generateRandomToken();
  booking.verificationToken = token;

  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    sendMail({
      to: booking.user.email,
      subject: "Booking verification",
      html: verifyBooking(
        booking.user.fullName,
        token,
        booking.pickup,
        booking.dropoff
      ),
    });
    const pendingBooking = await createPendingBooking(booking);
    await session.commitTransaction();
    session.endSession();
    return res
      .status(201)
      .json(new ApiResponse("Please verify your booking", pendingBooking));
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    throw error;
  }
});

const verify = asyncHandler(async (req, res) => {
  const { token } = req.query;
  const pendingBooking = await getBookingByVerificationToken(token);
  if (!pendingBooking) {
    throw new ApiError(404, "Booking not found or expired");
  }
  const newBooking = {
    user: pendingBooking.user,
    vehicle: pendingBooking.vehicle,
    pickup: pendingBooking.pickup,
    dropoff: pendingBooking.dropoff,
    message: pendingBooking.message,
    status: "pending",
    paymentStatus: "pending",
    createdAt: new Date(),
    updatedAt: new Date(),
  };
  await createBooking(newBooking);
 
  return res.status(201).json(new ApiResponse("Booking confirmed"));
});

const getAll = asyncHandler(async (req, res) => {
  const { page = 1, limit = 10, price, status } = req.query;
  const { bookings, totalPages } = await getAllBookings({
    page,
    limit,
    price,
    status,
  });
  if (!bookings || bookings.length === 0) {
    throw new ApiError(404, "No bookings found");
  }
  return res
    .status(200)
    .json(new ApiResponse("Bookings found", { bookings, totalPages, page }));
});

const remove = asyncHandler(async (req, res) => {
  const { bookingId } = req.params;
  const booking = await getBookingById(bookingId);
  if (!booking) {
    throw new ApiError(404, "Booking not found");
  }
  await deleteBooking(bookingId);
  return res.status(204).json(new ApiResponse("Booking deleted successfully"));
});

const changeBookingStatus = asyncHandler(async(req,res)=>{
  const { bookingId, status } = req.body;
  const booking = await getBookingById(bookingId);
  if (!booking) {
    throw new ApiError(404, "Booking not found");
  }
  const update = await changeStatus({ bookingId, status});
  if(!update) {
    throw new ApiError(400, "Failed to update booking status");
  }
  return res.status(200).json(new ApiResponse("Booking status updated successfully", booking));
})

export { create, verify, getAll, remove, changeBookingStatus };
