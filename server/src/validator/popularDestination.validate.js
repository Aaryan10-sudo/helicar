const Joi = require("joi");

const popularDestinationSchema = Joi.object({
  name: Joi.string().required(),
  image: Joi.string().uri().required(),
  description: Joi.string().required(),
  pricing: Joi.string().optional(),
  itinerary: Joi.array()
    .items(
      Joi.object({
        day: Joi.number().integer().min(1),
        title: Joi.string(),
        description: Joi.string(),
      })
    )
    .optional(),
  location: Joi.string().allow(null, "").optional(),
});

const validatePopularDestination = (req, res, next) => {
  const { error } = popularDestinationSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  next();
};

module.exports = validatePopularDestination;
