const pug = require("pug");
const path = require("path");
const sendMail = require("../../utils/sendMail");
const { ADMIN_MAIL } = require("../../../config/env");

async function confirmedBooking({ username, receiver, OTP, vehicleModel }) {
  const htmlContent = pug.renderFile(
    path.join(__dirname, "./template/confirmed-booking.jade"),
    {
      customerName: username,
      OTP: OTP,
      vehicleModel,
    }
  );
  try {
    await sendMail({
      from: '"Helicar Booking" <helicarbooking@gmail.com>',
      to: receiver,
      subject: "Booking Confirmation OTP",
      html: htmlContent,
    });
  } catch (error) {
    throw new Error("Error sending email: " + error.message);
  }
}

async function adminBookingNotification({
  customerName,
  vehicleName,
  contactNumber,
}) {
  const htmlContent = pug.renderFile(
    path.join(__dirname, "./template/admin-notification.jade"),
    {
      customerName,
      vehicleName,
      contactNumber,
    }
  );
  try {
    await sendMail({
      from: '"Helicar Booking" <helicarbooking@gmail.com>',
      to: ADMIN_MAIL,
      subject: "New Booking Alert",
      html: htmlContent,
    });
  } catch (error) {
    throw new Error("Error sending email: " + error.message);
  }
}

async function verifiedBookingNotification({
  vehicleName,
  vehicleImage,
  vehicleType,
  seats,
  numberPlate,
  pickupLocation,
  pickupDate,
  destinationLocation,
  destinationDate,
  mail,
}) {
  const htmlContent = pug.renderFile(
    path.join(__dirname, "./template/booking-confirmation.jade"),
    {
      vehicleName,
      vehicleImage,
      vehicleType,
      seats,
      numberPlate,
      pickupLocation,
      pickupDate,
      destinationLocation,
      destinationDate,
      mail,
    }
  );
  try {
    await sendMail({
      from: '"Helicar Booking" <helicarbooking@gmail.com>',
      to: mail,
      subject: "Your booking is confirmed",
      html: htmlContent,
    });
  } catch (error) {
    throw new Error("Error sending email: " + error.message);
  }
}

module.exports = {
  confirmedBooking,
  adminBookingNotification,
  verifiedBookingNotification,
};
