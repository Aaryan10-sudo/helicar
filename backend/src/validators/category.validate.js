import joi from "joi";

const categorySchema = joi.object({
  name: joi.string().min(2).max(100).required(),
  icon:joi.string(),
  description:joi.string().min(5).max(100),
});

const validateCategory = (req, res, next) => {
  const { error } = categorySchema.validate(req.body);
  if (error)
    return res.status(400).json({ success: false, message: error.message });
  next();
};

export { validateCategory };
