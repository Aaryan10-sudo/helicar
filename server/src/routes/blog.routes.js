const express = require("express");
const blogRouter = express.Router();
const blogController = require("../controller/blog.controller");
const isAuthenticated = require("../middleware/isAuthenticated");
const { isAuthorized } = require("../middleware/isAuthorized");

blogRouter.post("/", blogController.createBlog);

blogRouter.get("/", blogController.getBlogs);

blogRouter.get("/by-name", blogController.getBlogByName);

blogRouter.put(
  "/by-name",

  blogController.updateBlogByName
);

blogRouter.delete(
  "/by-name",

  blogController.deleteBlogByName
);

module.exports = blogRouter;
