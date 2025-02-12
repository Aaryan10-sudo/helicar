import joi from "joi";

const blogSchema = joi.object({
  title: joi.string().min(5).max(100).required(),
  author: joi.string().min(3).max(50),
  content: joi.string().min(100).required(),
  isPublished: joi.boolean(),
  tags: joi.array(),
  slug: joi.string(),
  seo: joi.object({
    metaTitle: joi.string(),
    metaDescription: joi.string(),
    keywords: joi.array(),
  }),
  date: joi.date(),
  category: joi
    .string()
    .valid("OneDay", "Sports1", "Business", "Entertainment"),
});

const validateBlog = (req, res, next) => {
  const { error } = blogSchema.validate(req.body);
  if (error)
    return res.status(400).json({ success: false, message: error.message });
  next();
};

export { validateBlog };
