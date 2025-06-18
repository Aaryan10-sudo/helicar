const Booking = require("../../models/booking.model");
const Otp = require("../../models/otp.model");
const Vehicle = require("../../models/vehicle.model");
const { verifiedBookingNotification } = require("../lib/mail/send.mail");

async function saveOtpService({ OTP, email }) {
  try {
    const existingOtp = await Otp.findOne({ where: { email } });
    if (existingOtp) {
      throw new Error(
        "OTP already sent to this email. Please retry after 1 minute."
      );
    }
    await Otp.create({ email, otp: OTP });
  } catch (error) {
    throw new Error(error.message);
  }
}

async function verifyOtpService({ OTP, email }) {
  try {
    const otpRecord = await Otp.findOne({
      where: { email, otp: OTP },
    });
    if (!otpRecord) {
      throw new Error("Invalid OTP ");
    }
    const booking = await Booking.update(
      { status: "verified" },
      {
        where: {
          "passengerInfo.email": email,
        },
      }
    );
    const updatedBooking = await Booking.findOne({
      where: { "passengerInfo.email": email },
    });

    const vehicleData = await Vehicle.findOne({
      where: { id: updatedBooking.vehicleId },
    });

    console.log(
      vehicleData.vehicleName,
      vehicleData.vehicleImage,
      vehicleData.vehicleType
    );
    console.log({
      vehicleName: vehicleData.vehicleName,
      vehicleImage: vehicleData.vehicleImage,
      vehicleType: vehicleData.vehicleType,
      seats: vehicleData.features?.seats,
      numberPlate: vehicleData.numberPlate,
      pickupLocation: updatedBooking.pickUp,
      pickupDate: updatedBooking.pickupDate,
      destinationLocation: updatedBooking.destination,
      destinationDate: updatedBooking.returnDate,
      mail: updatedBooking.passengerInfo?.email,
    });

    await Otp.destroy({ where: { email, otp: OTP } });

    console.log(`vehicle ko data ${vehicleData}`);

    await verifiedBookingNotification({
      vehicleName: vehicleData.vehicleName,
      vehicleImage: vehicleData.vehicleImage,
      vehicleType: vehicleData.vehicleType,
      seats: vehicleData.features?.seats,
      numberPlate: vehicleData.numberPlate,
      pickupLocation: updatedBooking.pickUp,
      pickupDate: updatedBooking.pickupDate,
      destinationLocation: updatedBooking.destination,
      destinationDate: updatedBooking.returnDate,
      mail: updatedBooking.passengerInfo?.email,
    });

    return booking;
  } catch (error) {
    throw new Error("Error verifying OTP hai: " + error.message);
  }
}

module.exports = { saveOtpService, verifyOtpService };
