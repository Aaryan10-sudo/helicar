const {
  createBlog,
  getAllBlogs,
  getBlogBySlug: getBlogBySlugService,
  updateBlogByName,
  deleteBlogByName,
} = require("../services/blog.service");
const { blogSchema } = require("../validator/blog.validator");

exports.createBlog = async (req, res, next) => {
  let data = req.body;
  data = {
    slug: data.mainTitle
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, "")
      .replace(/[\s_]+/g, "-")
      .replace(/--+/g, "-"),

    ...data,
  };
  console.log(data);
  try {
    const blog = await createBlog(data);
    console.log(data);

    res.status(201).json({
      success: true,
      message: "Blog created successfully",
      data: blog,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getBlogs = async (req, res, next) => {
  try {
    const blogs = await getAllBlogs();
    res.status(200).json({
      success: true,
      data: blogs,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getBlogBySlug = async (req, res, next) => {
  const { slug } = req.query;
  console.log(slug);
  try {
    const blog = await getBlogBySlugService(slug);
    if (!blog) {
      return res.status(404).json({
        success: false,
        message: "Blog not found",
      });
    }
    res.status(200).json({
      success: true,
      data: blog,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
    console.log(error);
  }
};

exports.updateBlogByName = async (req, res, next) => {
  const { name: mainTitle } = req.query;
  const data = req.body;
  try {
    const { error } = blogSchema.validate(data);
    if (error) {
      return res.status(400).json({
        success: false,
        message: error.details[0].message,
      });
    }

    const updatedBlog = await updateBlogByName(mainTitle, data);
    if (!updatedBlog) {
      return res.status(404).json({
        success: false,
        message: "Blog not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Blog updated successfully",
      data: updatedBlog,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// DELETE blog by name (mainTitle)
exports.deleteBlogByName = async (req, res, next) => {
  const { name: mainTitle } = req.query;
  try {
    const deletedBlog = await deleteBlogByName(mainTitle);
    if (!deletedBlog) {
      return res.status(404).json({
        success: false,
        message: "Blog not found",
      });
    }
    res.status(200).json({
      success: true,
      message: "Blog deleted successfully",
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
