import express from 'express';
import { validateBlog } from '../validators/blog.validate.js';
import { create, getAll, remove, update, updatePublished } from '../controllers/blog.controller.js';
import { upload } from '../middlewares/multer.js';

const router = express.Router();

router.post("/",upload.fields([{
    name: "blogImage",
    maxCount: 1,
}]),validateBlog,create)

router.get("/",getAll);
router.put("/:blogId",validateBlog,update)
router.delete("/:blogId",remove)
router.patch("/:blogId",updatePublished)

export default router;
