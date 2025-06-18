const {
  confirmedBooking,
  adminBookingNotification,
} = require("../lib/mail/send.mail");
const {
  createBookingService,
  getAllBookingService,
  getBookingByIdService,
} = require("../services/booking.service");
const { saveOtpService, verifyOtpService } = require("../services/otp.service");
const generateOTP = require("../utils/generateOTP");

exports.createBooking = async (req, res, next) => {
  const bookingData = req.body;
  try {
    const result = await createBookingService(bookingData);
    const OTP = generateOTP();
    try {
      await confirmedBooking({
        username: result.passengerInfo.firstName,
        receiver: result.passengerInfo.email,
        OTP: OTP,
      });
      await adminBookingNotification({
        customerName: result.passengerInfo.firstName,
        vehicleName: result.vehicleName,
        contactNumber: result.passengerInfo.phone,
      });
      await saveOtpService({
        OTP,
        email: result.passengerInfo.email,
      });
    } catch (error) {
      res.status(400).json({
        message: error.message,
      });
      return;
    }
    res.status(201).json({
      success: true,
      message: "Booking created successfully",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

exports.verifyBooking = async (req, res, next) => {
  const { OTP, email } = req.body;
  console.log("OTP:", OTP, "Email:", email);
  try {
    const result = await verifyOtpService({ OTP, email });
    if (result) {
      res.status(200).json({
        success: true,
        message: "Booking verified successfully",
        data: result,
      });
    } else {
      res.status(400).json({
        success: false,
        message: "Invalid OTP",
      });
    }
  } catch (error) {
    res.status(400).json({
      success: false,
      error: "Verification failed",
      message: error.message,
    });
  }
};

exports.getBookingById = async (req, res, next) => {
  const vehicleId = req.params.id;
  try {
    const result = await getBookingByIdService(vehicleId);
    if (!result) {
      return res.status(404).json({
        success: false,
        message: "Vehicle not found",
      });
    }
    res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

exports.getAllBooking = async (req, res, next) => {
  try {
    const result = await getAllBookingService();
    res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};
