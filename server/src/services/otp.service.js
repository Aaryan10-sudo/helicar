const Booking = require("../../models/booking.model");
const Otp = require("../../models/otp.model");

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
    console.log("OTP Record:", otpRecord);
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
    await Otp.destroy({ where: { email, otp: OTP } });
    return booking;
  } catch (error) {
    throw new Error("Error verifying OTP hai: " + error.message);
  }
}

module.exports = { saveOtpService, verifyOtpService };
