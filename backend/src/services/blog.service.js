import Blog from "../models/blog.model.js";

// Create and Save a new Blog

const createBlog = async (blog) => {
  try {
    return await Blog.create(blog);
  } catch (err) {
    throw err;
  }
};

const findBlogBySlug = async (slug) => {
  try {
    return await Blog.findOne({ slug });
  } catch (err) {
    throw err;
  }
};
// Retrieve and return all Blogs from the database.

const getAllBlogs = async ({ page, limit, slug }) => {
  try {
    let query = {};
    if (slug) query.slug = slug;
    const totalCount = await Blog.countDocuments(query);
    const blogs = await Blog.find(query)
      .skip((page - 1) * limit)
      .limit(limit);
    return { blogs, totalPages: Math.ceil(totalCount / limit) };
  } catch (err) {
    throw err;
  }
};

const updateBlog = async({blogId,blog})=>{
    try {
        return await Blog.findByIdAndUpdate(blogId, blog, { new: true });
        
    } catch (error) {
        throw error;
    }
}

const togglePublished = async({isPublished,blogId})=>{
    try {
        return await Blog.findByIdAndUpdate(blogId, { isPublished }, { new: true });
    } catch (error) {
        throw error;
    }
}

const deleteBlog = async (blogId) => {
    try {
        return await Blog.findByIdAndDelete(blogId);
    } catch (error) {
        throw error;
    }
};

export { createBlog, findBlogBySlug, getAllBlogs,updateBlog ,deleteBlog, togglePublished };
