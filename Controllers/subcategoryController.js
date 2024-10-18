const Subcategory = require('../Models/SubCategoryModel');
const Category = require('../Models/Category');

// Create Subcategory
const createSubcategory = async (req, res) => {
    try {
        const { name, description, categoryId } = req.body;

        // Check if the category exists
        const category = await Category.findById(categoryId);
        if (!category) {
            return res.status(400).json({ status: false, message: 'Invalid Category ID' });
        }

        // Create a new subcategory
        const subcategory = new Subcategory({
            name: name.trim(),
            description: description ? description.trim() : '', // Optional trimming of description
            categoryId
        });

        // Save subcategory to the database
        await subcategory.save();
        res.status(201).json({ status: true, message: 'Subcategory created successfully', data: subcategory });
    } catch (error) {
        res.status(500).json({ status: false, message: 'Server Error', error: error.message });
    }
};

// Get All Subcategories
const getAllSubcategories = async (req, res) => {
    try {
        const subcategories = await Subcategory.find().populate('categoryId').sort({ createdAt: -1 });
        res.status(200).json({ status: true, data: subcategories });
    } catch (error) {
        res.status(500).json({ status: false, message: 'Server Error', error: error.message });
    }
};

// Get Subcategory by ID
const getSubcategoryById = async (req, res) => {
    try {
        const { id } = req.params;
        const subcategory = await Subcategory.findById(id).populate('categoryId');
        if (!subcategory) {
            return res.status(404).json({ status: false, message: 'Subcategory not found' });
        }
        res.status(200).json({ status: true, data: subcategory });
    } catch (error) {
        res.status(500).json({ status: false, message: 'Server Error', error: error.message });
    }
};

// Get all subcategories by categoryId
const getSubcategoriesByCategorie = async (req, res) => {
    const { categoryId } = req.params;

    try {
        const subCategories = await Subcategory.find({ categoryId });
        
        if (subCategories.length === 0) {
            return res.status(404).json({ message: 'No subcategories found for this category.' });
        }

        res.status(200).json({ status : true,
            data :subCategories});
    } catch (error) {
        console.error(error);
        res.status(500).json({ status : false, message: error.message });
    }
};

// Update Subcategory by ID
const updateSubcategory = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, description, categoryId } = req.body;

        const subcategory = await Subcategory.findById(id);
        if (!subcategory) {
            return res.status(404).json({ status: false, message: 'Subcategory not found' });
        }

        if (categoryId) {
            const category = await Category.findById(categoryId);
            if (!category) {
                return res.status(400).json({ status: false, message: 'Invalid Category ID' });
            }
            subcategory.categoryId = categoryId; // Corrected field name
        }

        if (name) subcategory.name = name.trim();
        if (description) subcategory.description = description.trim(); // Optional trimming

        await subcategory.save();
        res.status(200).json({ status: true, message: 'Subcategory updated successfully', data: subcategory });
    } catch (error) {
        res.status(500).json({ status: false, message: 'Server Error', error: error.message });
    }
};

// Delete Subcategory by ID
const deleteSubcategory = async (req, res) => {
    try {
        const { id } = req.params;

        const subcategory = await Subcategory.findByIdAndDelete(id);
        if (!subcategory) {
            return res.status(404).json({ status: false, message: 'Subcategory not found' });
        }

        res.status(200).json({ status: true, message: 'Subcategory deleted successfully', data: subcategory });
    } catch (error) {
        res.status(500).json({ status: false, message: 'Server Error', error: error.message });
    }
};

module.exports = {
    createSubcategory,
    getAllSubcategories,
    getSubcategoryById,
    getSubcategoriesByCategorie,
    updateSubcategory,
    deleteSubcategory
};
