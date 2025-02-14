import joi from "joi";

const vehicleTypeSchema = joi.object({
  name: joi.string().min(2).max(100).required(),
  description:joi.string().min(5).max(100),
});

const validateVehicleType = (req, res, next) => {
  const { error } = vehicleTypeSchema.validate(req.body);
  if (error)
    return res.status(400).json({ success: false, message: error.message });
  next();
};

export { validateVehicleType };
