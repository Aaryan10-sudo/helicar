const {
  confirmedBooking,
  adminBookingNotification,
} = require("../lib/mail/send.mail");
const {
  createBookingService,
  getAllBookingService,
} = require("../services/booking.service");
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
    } catch (error) {
      res.status(400).json({
        message: error.message,
      });
    }
    res.status(201).json({
      success: true,
      message: "Booking created successfully",
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
