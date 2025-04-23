const pug = require("pug");
const path = require("path");
const sendMail = require("../../utils/sendMail");

async function confirmedBooking({ username, receiver, OTP }) {
  console.log(OTP);
  console.log(receiver);
  const htmlContent = pug.renderFile(
    path.join(__dirname, "./template/confirmed-booking.jade"),
    {
      customerName: username,
      OTP: OTP,
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

module.exports = { confirmedBooking };
