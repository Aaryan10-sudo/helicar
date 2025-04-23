const Joi = require("joi");

const bookingSchema = Joi.object({
  bookingDate: Joi.date().required(),
  pickupDate: Joi.date().required(),
  returnDate: Joi.date().required(),
  totalAmount: Joi.string().required(),
  status: Joi.string().required(),
  paymentStatus: Joi.string().required(),
  passengerInfo: Joi.object({
    firstName: Joi.string().min(2).max(30).required(),
    lastName: Joi.string().min(2).max(30).required(),
    email: Joi.string().email().required(),
    phone: Joi.string().required(),
    address: Joi.string().min(5).max(100).required(),
    message: Joi.string().min(5).max(500).optional(),
  }).required(),
  vehicleId: Joi.string().guid({ version: "uuidv4" }).required(),
}).unknown(true);

const validateBooking = (req, res, next) => {
  const { error } = bookingSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  next();
};

module.exports = validateBooking;
