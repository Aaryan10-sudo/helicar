import Category from "../models/category.model.js";

const createCategory = async (category) => {
  try {
    return await Category.create(category);
  } catch (error) {
    throw error;
  }
};

const getCategoryByName = async (name) => {
  try {
    return await Category.find({ name });
  } catch (error) {
    throw error;
  }
};

const getAllCategory = async () => {
  try {
    return await Category.find({});
  } catch (error) {
    throw error;
  }
};

const getCategoryById = async (categoryId) => {
  try {
    return Category.find({ _id: categoryId });
  } catch (error) {
    throw error;
  }
};

const updateCategory = async ({ categoryId, categoryData }) => {
  try {
    return Category.findByIdAndUpdate(categoryId, categoryData, { new: true });
  } catch (error) {
    throw error;
  }
};

const deleteCategory = async (categoryId) => {
    try {
      return await Category.findByIdAndDelete(categoryId);
    } catch (error) {
      throw error;
    }
  };

export {
  createCategory,
  getCategoryByName,
  getAllCategory,
  getCategoryById,
  updateCategory,
  deleteCategory
};
