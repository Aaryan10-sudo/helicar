import joi from 'joi';

const roleSchema = joi.object({
  name: joi.string().required(),
});

const validateRole = (req, res, next) => {
  const { error } = roleSchema.validate(req.body);
  if (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
      errors: error.details,
    });
  }
  next();
};

export { validateRole };
