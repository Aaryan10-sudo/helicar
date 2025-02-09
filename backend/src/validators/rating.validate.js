import joi from "joi";

const schema = joi.object({
  user: joi.object({
    name: joi.string().required(),
    email: joi.string().email().required(),
    website: joi.string().uri(),
  }),
  vehicle: joi.string().required(),
  rating: joi.object({
    overall: joi.number().required(),
    driving: joi.number().required(),
    interiorLayout: joi.number().required(),
    spacePracticality: joi.number().required(),
  }),
  comment: joi.string().required(),
});

const validateRating = (req, res, next) => {
  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
      errors: error.details,
    });
  }
  next();
};

export { validateRating };
