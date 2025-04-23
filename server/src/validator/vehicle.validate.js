const Joi = require("joi");

const vehicleSchema = Joi.object({
  vehicleName: Joi.string().min(2).max(50).required(),
  numberPlate: Joi.string().alphanum().min(5).max(15).required(),
  vehicleCategory: Joi.string().guid({ version: "uuidv4" }).required(),
  vehicleType: Joi.string().guid({ version: "uuidv4" }).required(),
  features: Joi.object({
    luggage: Joi.number().min(0).required(),
    seats: Joi.number().min(1).required(),
    transmission: Joi.string().valid("Manual", "Automatic").required(),
  }).required(),
  vehicleImage: Joi.string().uri().required(),
  vehicleBrand: Joi.string().min(2).max(30).required(),
  vehicleDescription: Joi.string().min(10).max(1000).optional(),
  vehiclePrice: Joi.number().required(),
  vehicleStatus: Joi.string().valid("Occupied", "Vacant").optional(),
}).unknown(true);

const validateVehicle = (req, res, next) => {
  const { error } = vehicleSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  next();
};

module.exports = validateVehicle;
