const Booking = require("../../models/booking.model");
const Vehicle = require("../../models/vehicle.model");

async function createBookingService(bookingData) {
  try {
    const booking = await Booking.create(bookingData);

    await Vehicle.update(
      { vehicleStatus: "Occupied" },
      {
        where: {
          id: bookingData.vehicleId,
        },
      }
    );

    return booking;
  } catch (error) {
    throw new Error("Error creating vehicle: " + error.message);
  }
}

async function getAllBookingService() {
  try {
    return await Booking.findAll({});
  } catch (error) {
    throw new Error("Error fetching vehicle: " + error.message);
  }
}

module.exports = { createBookingService, getAllBookingService };
