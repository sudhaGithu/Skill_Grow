const Category = require('../Models/Category');

// Create a new Category
const createCategory = async (req, res) => {
  try {
    const { name, description } = req.body;

    // Check if category already exists
    const existingCategory = await Category.findOne({ name: name.trim() });
    if (existingCategory) {
      return res.status(400).json({ message: 'Category already exists' });
    }

    const category = new Category({ name: name.trim(), description });
    await category.save();
    res.status(201).json({ message: 'Category created successfully', category });
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

// Get All Categories
const getAllCategories = async (req, res) => {
  try {
    const categories = await Category.find().sort({ createdAt: -1 });
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

// Get Category by ID
const getCategoryById = async (req, res) => {
  try {
    const { id } = req.params;
    const category = await Category.findById(id);
    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }
    res.status(200).json(category);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

// Update Category by ID
const updateCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description } = req.body;

    const category = await Category.findById(id);
    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }

    // Check for duplicate category name
    if (name && name.trim() !== category.name) {
      const duplicate = await Category.findOne({ name: name.trim() });
      if (duplicate) {
        return res.status(400).json({ message: 'Category name already exists' });
      }
      category.name = name.trim();
    }

    if (description) category.description = description;

    await category.save();
    res.status(200).json({ message: 'Category updated successfully', category });
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

// Delete Category by ID
const deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;

    // Check if any subcategories are linked to this category
    const Subcategory = require('../Models/SubCategoryModel');
    const linkedSubcategories = await Subcategory.findOne({ category: id });
    if (linkedSubcategories) {
      return res.status(400).json({ message: 'Cannot delete category with linked subcategories' });
    }

    const category = await Category.findByIdAndDelete(id);
    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }

    res.status(200).json({ message: 'Category deleted successfully', category });
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};
module.exports = {
    createCategory,
    getAllCategories,
    getCategoryById,
    updateCategory,
    deleteCategory
};