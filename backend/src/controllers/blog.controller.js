import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { createBlog, deleteBlog, findBlogBySlug, getAllBlogs, togglePublished, updateBlog } from "../services/blog.service.js";
import { uploadOnCloudinary } from "../services/cloudinary.service.js";

const create = asyncHandler(async(req, res)=>{
    const blog = req.body
    const slugExists = await findBlogBySlug(blog.slug);
    console.log(slugExists);
    if(slugExists){
        throw new ApiError(400, "A blog with this slug already exists")
    }
    let blogImage;
    const blogImgLocalPath = req.files?.blogImage?.[0]?.path;
    if(blogImgLocalPath){
        try {
            blogImage = await uploadOnCloudinary(blogImgLocalPath);
            blog.image = blogImage.secure_url;
            if (!blogImage) {
              throw new Error("Failed to upload user image");
            }
          } catch (error) {
            throw new ApiError(
              500,
              "Something went wrong while uploading user image"
            );
          }
    }
    const newBlog = await createBlog(blog);
    if(!newBlog){
        throw new ApiError(500, "Failed to create blog")
    }
    return res.status(201).json(new ApiResponse("Blog created successfully", newBlog))
})

const getAll = asyncHandler(async(req, res)=>{
    const { page = 1, limit = 10,slug } = req.query;
    const {blogs, totalPages} = await getAllBlogs({ page, limit,slug });
    if(!blogs.length){
        throw new ApiError(404, "No blogs found")
    }
    return res.status(200).json(new ApiResponse("Blogs retrieved successfully", {blogs, totalPages,page}))
})

const update = asyncHandler(async(req,res)=>{
    const blog= req.body;
    const {blogId} = req.params;
    const updatedBlog = await updateBlog({blogId, blog});
    if(!updatedBlog){
        throw new ApiError(404, "Blog not found")
    }
    return res.status(200).json(new ApiResponse("Blog updated successfully", updatedBlog))
})

const updatePublished = asyncHandler(async(req,res)=>{
    const {blogId} = req.params;
    const {isPublished} = req.body;
    const updatedBlog = await togglePublished({blogId,isPublished});
    if(!updatedBlog){
        throw new ApiError(404, "Blog not found")
    }
    return res.status(200).json(new ApiResponse("Blog status updated successfully", updatedBlog))
})

const remove = asyncHandler(async(req,res)=>{
    const {blogId} = req.params;
    const deletedBlog = await deleteBlog(blogId);
    if(!deletedBlog){
        throw new ApiError(404, "Blog not found")
    }
    return res.status(204).json(new ApiResponse("Blog deleted successfully", deletedBlog))
})

export { create, getAll, update, remove ,updatePublished}