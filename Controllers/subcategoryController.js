const Subcategory = require('../Models/SubCategoryModel')
const Category = require('../Models/Category');

// Create SubCategory
const createSubcategory = async (req, res) => {
    try {
      const { name, description, categoryId } = req.body;
  
      // Check if the category exists
      const category = await Category.findById(categoryId);
      if (!category) {
        return res.status(400).json({ message: 'Invalid Category ID' });
      }
  
      // Create a new subcategory
      const subcategory = new Subcategory({
        name: name.trim(),
        description: description ? description.trim() : '', // Optional trimming of description
        categoryId // Use the correct field name here
      });
  
      // Save subcategory to the database
      await subcategory.save();
      res.status(201).json({ message: 'Subcategory created successfully', subcategory });
    } catch (error) {
      res.status(500).json({ message: 'Server Error', error: error.message });
    }
  };

// Get All Subcategories
const getAllSubcategories = async (req, res) => {
  try {
    const subcategories = await Subcategory.find().populate('categoryId').sort({ createdAt: -1 });
    res.status(200).json(subcategories);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

// Get Subcategory by ID
const getSubcategoryById = async (req, res) => {
  try {
    const { id } = req.params;
    const subcategory = await Subcategory.findById(id).populate('categoryId');
    if (!subcategory) {
      return res.status(404).json({ message: 'Subcategory not found' });
    }
    res.status(200).json(subcategory);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

// Update Subcategory by ID
const updateSubcategory = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, categoryId } = req.body;

    const subcategory = await Subcategory.findById(id);
    if (!subcategory) {
      return res.status(404).json({ message: 'Subcategory not found' });
    }

    if (categoryId) {
      const category = await Category.findById(categoryId);
      if (!category) {
        return res.status(400).json({ message: 'Invalid Category ID' });
      }
      subcategory.category = categoryId;
    }

    if (name) subcategory.name = name.trim();
    if (description) subcategory.description = description;

    await subcategory.save();
    res.status(200).json({ message: 'Subcategory updated successfully', subcategory });
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

// Delete Subcategory by ID
const deleteSubcategory = async (req, res) => {
  try {
    const { id } = req.params;

    const subcategory = await Subcategory.findByIdAndDelete(id);
    if (!subcategory) {
      return res.status(404).json({ message: 'Subcategory not found' });
    }

    res.status(200).json({ message: 'Subcategory deleted successfully', subcategory });
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

module.exports = {
    createSubcategory,
    getAllSubcategories,
    getSubcategoryById,
    updateSubcategory,
    deleteSubcategory
};