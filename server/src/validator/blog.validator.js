const Joi = require("joi");

const contentItemSchema = Joi.object({
  imageUrl: Joi.string().uri().required(),
  title: Joi.string().required(),
  description: Joi.string().required(),
});

const blogSchema = Joi.object({
  mainTitle: Joi.string().required(),
  date: Joi.date().iso().required(),
  content: Joi.array().items(contentItemSchema).min(1).required()
});

const validateBlog = (req, res, next) => {
  const { error } = blogSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  next();
};

module.exports = { blogSchema, validateBlog };
