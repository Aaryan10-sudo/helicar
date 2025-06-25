const Blog = require("../../models/blog.model");

const createBlog = async (data) => {
  return await Blog.create(data);
};

const getAllBlogs = async () => {
  return await Blog.findAll({ order: [["createdAt", "DESC"]] });
};

const getBlogByName = async (mainTitle) => {
  return await Blog.findOne({ where: { mainTitle } });
};

const updateBlogByName = async (mainTitle, data) => {
  const blog = await Blog.findOne({ where: { mainTitle } });
  if (!blog) return null;
  await blog.update(data);
  return blog;
};

const deleteBlogByName = async (mainTitle) => {
  const blog = await Blog.findOne({ where: { mainTitle } });
  if (!blog) return null;
  await blog.destroy();
  return blog;
};

module.exports = {
  createBlog,
  getAllBlogs,
  getBlogByName,
  updateBlogByName,
  deleteBlogByName,
};
