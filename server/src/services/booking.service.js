const Booking = require("../../models/booking.model");
const Vehicle = require("../../models/vehicle.model");

async function createBookingService(bookingData) {
  try {
    const booking = await Booking.create(bookingData);

    return booking;
  } catch (error) {
    throw new Error("Error creating vehicle: " + error.message);
  }
}

async function getBookingByIdService(vehicleId) {
  try {
    return await Booking.findOne({
      where: { id: vehicleId },
    });
  } catch (error) {
    throw new Error("Error fetching vehicle: " + error.message);
  }
}

async function getAllBookingService() {
  try {
    return await Booking.findAll({});
  } catch (error) {
    throw new Error("Error fetching vehicle: " + error.message);
  }
}

async function updateBookingService(id, updateData) {
  try {
    const allowedFields = {};
    if (updateData.paymentStatus !== undefined)
      allowedFields.paymentStatus = updateData.paymentStatus;
    if (updateData.status !== undefined)
      allowedFields.status = updateData.status;

    const [updatedRowsCount, [updatedBooking]] = await Booking.update(
      allowedFields,
      {
        where: { id },
        returning: true,
      }
    );

    if (updatedRowsCount === 0) {
      throw new Error("Booking not found or nothing to update.");
    }

    return updatedBooking;
  } catch (error) {
    throw new Error("Error updating booking: " + error.message);
  }
}

module.exports = {
  createBookingService,
  getAllBookingService,
  getBookingByIdService,
  updateBookingService,
};
