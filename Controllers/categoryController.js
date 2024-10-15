const Category = require('../Models/Category');
const Subcategory = require('../Models/SubCategoryModel'); // Moved to the top for clarity

// Create a new Category
const createCategory = async (req, res) => {
  try {
    const { name, description } = req.body;

    // Check if category already exists
    const existingCategory = await Category.findOne({ name: name.trim() });
    if (existingCategory) {
      return res.status(400).json({ status: false, message: 'Category already exists' });
    }

    const category = new Category({ name: name.trim(), description });
    await category.save();
    res.status(201).json({
      status: true,
      message: 'Category created successfully',
      data: category
    });
  } catch (error) {
    res.status(500).json({ status: false, message: error.message });
  }
};

// Get All Categories
const getAllCategories = async (req, res) => {
  try {
    const categories = await Category.find().sort({ createdAt: -1 });
    res.status(200).json({
      status: true,
      message: 'Categories retrieved successfully',
      data: categories
    });
  } catch (error) {
    res.status(500).json({ status: false, message: error.message });
  }
};

// Get Category by ID
const getCategoryById = async (req, res) => {
  try {
    const { id } = req.params;
    const category = await Category.findById(id);
    if (!category) {
      return res.status(404).json({ status: false, message: 'Category not found' });
    }
    res.status(200).json({
      status: true,
      message: 'Category retrieved successfully',
      data: category
    });
  } catch (error) {
    res.status(500).json({ status: false, message: error.message });
  }
};

// Update Category by ID
const updateCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description } = req.body;

    const category = await Category.findById(id);
    if (!category) {
      return res.status(404).json({ status: false, message: 'Category not found' });
    }

    // Check for duplicate category name
    if (name && name.trim() !== category.name) {
      const duplicate = await Category.findOne({ name: name.trim() });
      if (duplicate) {
        return res.status(400).json({ status: false, message: 'Category name already exists' });
      }
      category.name = name.trim();
    }

    if (description) category.description = description;

    await category.save();
    res.status(200).json({
      status: true,
      message: 'Category updated successfully',
      data: category
    });
  } catch (error) {
    res.status(500).json({ status: false, message: error.message });
  }
};

// Delete Category by ID
const deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;

    // Check if any subcategories are linked to this category
    const linkedSubcategories = await Subcategory.findOne({ category: id });
    if (linkedSubcategories) {
      return res.status(400).json({ status: false, message: 'Cannot delete category with linked subcategories' });
    }

    const category = await Category.findByIdAndDelete(id);
    if (!category) {
      return res.status(404).json({ status: false, message: 'Category not found' });
    }

    res.status(200).json({
      status: true,
      message: 'Category deleted successfully',
      data: category
    });
  } catch (error) {
    res.status(500).json({ status: false, message: error.message });
  }
};

module.exports = {
  createCategory,
  getAllCategories,
  getCategoryById,
  updateCategory,
  deleteCategory
};
