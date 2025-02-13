import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

import {
  createCategory,
  getCategoryByName,
  getCategoryById,
  updateCategory,
  deleteCategory,
  getAllCategory,
} from "../services/category.service.js";

const create = asyncHandler(async (req, res) => {
  const category = req.body;
  const categoryExist = await getCategoryByName(category.name);
  if (categoryExist) {
    throw new ApiError(400, "Category with this name already axist");
  }
  const newCategory = await createCategory(category);
  return res
    .status(201)
    .json(new ApiResponse("Category created successfully", newCategory));
});

const getAll = asyncHandler(async (req, res) => {
  const category = await getAllCategory();
  if (!category || category.length === 0 ) {
    throw new ApiError(404, "Category does not exist");
  }
  res.status(200).json(new ApiResponse("Category details ", category));
});

const update = asyncHandler(async (req, res) => {
  const categoryId = req.params.categoryId;
  const categoryData = req.body;

  const category = await getCategoryById(categoryId);
  if (!category) {
    throw new ApiError(404, "Category not found");
  }
  const updatedCategory = await updateCategory({ categoryId, categoryData });
  if (!updatedCategory) {
    throw new ApiError(404, "Category not found");
  }
  return res
    .status(200)
    .json(new ApiResponse("Category updated successfully", updatedCategory));
});

const remove = asyncHandler(async (req, res) => {
  const categoryId = req.params.categoryId;
  const category = await getCategoryById(categoryId);
  if (!category || category.length===0) {
    throw new ApiError(404, "Category not found");
  }
  await deleteCategory(categoryId);
  return res
    .status(204)
    .json(new ApiResponse("Category deleted successfully", category));
});

export { create, getAll, update, remove };
