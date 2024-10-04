// routes/course.js
const express = require('express');
const Course = require('../Models/courseModel');
const router = express.Router();

// Create a new course
const createCourse = async (req, res) => {
    try {
        const course = await Course.create(req.body);
        res.status(201).json(course);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Get all courses
const getCourses = async (req, res) => {
    try {
        const courses = await Course.find({ deleted: false })
            .populate('categoryId')          // Populate the category
            .populate('subcategoryId')       // Populate the subcategory
            .populate('price')       
            .populate('instructorId')        // Populate instructors
            .populate('languageId')          // Populate the language
            .populate('skillLevelId');       // Populate the skill level

        res.status(200).json(courses);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Read a course by ID
const getCourse = async (req, res) => {
    try {
        const course = await Course.findOne({ _id: req.params.id, deleted: false })
            .populate('categoryId')          // Populate the category
            .populate('subcategoryId')       // Populate the subcategory
            .populate('price')
            .populate('instructorId')        // Populate instructors
            .populate('languageId')          // Populate the language
            .populate('skillLevelId');       // Populate the skill level

        if (!course) return res.status(404).json({ message: 'Course not found' });
        res.status(200).json(course);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


// Get courses by category
const getCoursesByCategory = async (req, res) => {
    const { categoryId } = req.params; // Assuming categoryId is passed as a URL parameter

    try {
        const courses = await Course.find({ categoryId, deleted: false })
            .populate('categoryId')
            .populate('subcategoryId')
            .populate('instructorId')
            .populate('languageId')
            .populate('skillLevelId');

        res.json(courses);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


// Get courses by category and subcategory
const getCoursesByCategoryAndSubcategory = async (req, res) => {
    const { categoryId, subcategoryId } = req.params; // Assuming both IDs are passed as URL parameters

    try {
        const courses = await Course.find({ 
                categoryId, 
                subcategoryId, 
                deleted: false 
            })
            .populate('categoryId')
            .populate('subcategoryId')
            .populate('instructorId')
            .populate('languageId')
            .populate('skillLevelId');

        res.json(courses);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get courses by skill level
const getCoursesBySkillLevel = async (req, res) => {
    const { skillLevelId } = req.params; // Assuming skillLevelId is passed as a URL parameter

    try {
        const courses = await Course.find({ skillLevelId, deleted: false })
            .populate('categoryId')
            .populate('subcategoryId')
            .populate('instructorId')
            .populate('languageId')
            .populate('skillLevelId');

        res.json(courses);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


// Get courses by language
const getCoursesByLanguage = async (req, res) => {
    const { languageId } = req.params; // Assuming languageId is passed as a URL parameter

    try {
        const courses = await Course.find({ languageId, deleted: false })
            .populate('categoryId')
            .populate('subcategoryId')
            .populate('instructorId')
            .populate('languageId')
            .populate('skillLevelId');

        res.json(courses);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};



// Update a course
const updateCourse = async (req, res) => {
    try {
        const course = await Course.findOneAndUpdate(
            { _id: req.params.id, deleted: false },
            req.body,
            { new: true } // This option returns the updated document
        );

        if (!course) return res.status(404).json({ message: 'Course not found' });

        res.status(200).json({message : "updated successfully",
            UpdatedData : course}); // This will now return the updated document
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};


// Soft delete a course
const deleteCourse = async (req, res) => {
    try {
        const course = await Course.findById(req.params.id);
        if (!course) return res.status(404).json({ message: 'Course not found' });

        course.deleted = true;
        await course.save();
        res.status(200).send({message : "deleted successfully"});
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    createCourse,
    getCourses,
    getCourse,
    getCoursesByCategory,
    getCoursesByCategoryAndSubcategory,
    getCoursesByLanguage,
    getCoursesBySkillLevel,
    updateCourse,
    deleteCourse
};
