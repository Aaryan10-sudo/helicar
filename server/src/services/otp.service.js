const Otp = require("../../models/otp.model");

async function saveOtpService({ OTP, email }) {
  try {
    await Otp.create({ email, otp: OTP });
  } catch (error) {}
}
