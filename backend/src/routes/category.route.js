import express from 'express';
import { create, getAll, remove, update } from '../controllers/category.controller.js';
import { validateCategory } from '../validators/category.validate.js';
const router = express.Router();

router.post("/",validateCategory,create);
router.get("/",getAll);
router.put("/:categoryId",validateCategory,update);
router.delete("/:categoryId",remove);

export default router;