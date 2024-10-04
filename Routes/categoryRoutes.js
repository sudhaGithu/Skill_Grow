const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categoryController');
const subcategoryController = require ('../controllers/subcategoryController');
const contactusController = require('../controllers/contactusController');


// Category routes
router.post('/categories/createCategory', categoryController.createCategory);
router.get('/categories/getAllCategories', categoryController.getAllCategories);
router.get('/categories/getCategoryById/:id', categoryController.getCategoryById);
router.put('/categories/updateCategory/:id', categoryController.updateCategory);
router.delete('/categories/deleteCategory/:id', categoryController.deleteCategory);

// Subcategory routes
router.post('/subcategories/createSubcategory', subcategoryController.createSubcategory);
router.get('/subcategories/getAllSubcategories', subcategoryController.getAllSubcategories);
router.get('/subcategories/getSubcategoryById/:id', subcategoryController.getSubcategoryById);
router.put('/subcategories/updateSubcategory/:id', subcategoryController.updateSubcategory);
router.delete('/subcategories/deleteSubcategory/:id', subcategoryController.deleteSubcategory);


//contactUs routes
router.post('/contact', contactusController.createContact);


module.exports = router;